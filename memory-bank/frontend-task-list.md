# Frontend Task List

## 1. Set Up Storybook for Component Development

    - [ ]  Install Storybook: run `pnpm storybook@latest init` and choose **React**, **TypeScript**, and **Tailwind** integration if prompted (or manually configure).
    - [ ]  Configure Storybook to work with Next.js and Tailwind:
        - In `.storybook/main.js`, ensure webpack uses an appropriate builder for Next (Storybook 7+ should handle Next 13, but if needed add `framework: { name: "@storybook/nextjs" }`).
        - In `.storybook/preview.js` or `preview.tsx`, import the Tailwind CSS file:

            ```tsx
            import "../src/app/globals.css";
            ```

            Also set `parameters: { layout: "fullscreen" }` if you want to use full page width by default.

    - [ ]  Verify Storybook runs: `npm run storybook` should launch the Storybook UI.
    - [ ]  Remove or disable sample stories (like the default Button stories from Storybook) to start clean.
    - [ ]  Organize Storybook structure: under `.storybook`, set up addon for controls and actions (usually added by default). Optionally add **Storybook A11y** addon to check accessibility later.
    - [ ]  Ensure Storybook uses strict TypeScript: enable `typescript.check = true` in Storybook config to catch any TS errors in stories.

## 2. Initialize Global State Stores (Zustand with Immer and Persist)

    - [ ]  **Install Dependencies via pnpm**
        - Run the following commands to install Zustand along with Immer (for immutable updates) and the persist middleware:

        ```bash
        pnpm add zustand immer
        pnpm add -D @types/zustand
        ```

    - [ ]  **Create Auth Store** (`src/stores/authStore.ts`):
    - Define the user interface and state shape using TypeScript:

        ```tsx
        interface User {
          id: string;
          name: string;
          email: string;
        }

        interface AuthState {
          user: User | null;
          isAuthenticated: boolean;
          login: (userData: User) => void;
          logout: () => void;
        }
        ```

    - Implement the Auth Store using Zustand with both Immer and Persist middleware

        ```tsx
        import create from 'zustand';
        import { persist } from 'zustand/middleware';
        import produce from 'immer';

        export const useAuthStore = create<AuthState>()(
          persist(
            (set) => ({
              user: null,
              isAuthenticated: false,
              login: (userData: User) =>
                set(
                  produce((state: AuthState) => {
                    state.user = userData;
                    state.isAuthenticated = true;
                  })
                ),
              logout: () =>
                set(
                  produce((state: AuthState) => {
                    state.user = null;
                    state.isAuthenticated = false;
                  })
                ),
            }),
            { name: 'auth-store' }  // Key for localStorage persistence
          )
        );
        ```

    - Ensure no usage of `any` is present and that all types are defined clearly.
    - [ ]  **Create UI Store** (`src/stores/uiStore.ts`):
    - Define the state interface for global UI preferences

        ```tsx
        interface UIState {
          theme: 'light' | 'dark';
          isMobileMenuOpen: boolean;
          toggleTheme: () => void;
          openMobileMenu: () => void;
          closeMobileMenu: () => void;
        }
        ```

    - Implement the UI Store using Zustand with Immer and Persist

        ```tsx
        import create from 'zustand';
        import { persist } from 'zustand/middleware';
        import produce from 'immer';

        export const useUIStore = create<UIState>()(
          persist(
            (set) => ({
              theme: 'light',
              isMobileMenuOpen: false,
              toggleTheme: () =>
                set(
                  produce((state: UIState) => {
                    state.theme = state.theme === 'light' ? 'dark' : 'light';
                  })
                ),
              openMobileMenu: () =>
                set(
                  produce((state: UIState) => {
                    state.isMobileMenuOpen = true;
                  })
                ),
              closeMobileMenu: () =>
                set(
                  produce((state: UIState) => {
                    state.isMobileMenuOpen = false;
                  })
                ),
            }),
            { name: 'ui-store' }
          )
        );
        ```

    - Verify that the store initializes with `theme: 'light'` and `isMobileMenuOpen: false`.
    - [ ]  **Testing the Stores**:
    - In Storybook or a sample component, simulate state changes:
        - Call `useAuthStore.getState().login({ id: '1', name: 'Alice', email: 'alice@example.com' })` and verify that `isAuthenticated` becomes `true` and `user` is set correctly.
        - Toggle the theme by calling `useUIStore.getState().toggleTheme()` and verify that the `theme` state updates accordingly (from `'light'` to `'dark'` and vice versa).
    - Ensure that persistence works by checking that the stores save their state to localStorage under the keys `'auth-store'` and `'ui-store'`.

## 3. Build Button Atom (`src/components/atoms/Button.tsx`)

    - [ ]  **Component Setup**: Create `Button.tsx` in atoms folder. Use a functional component with `React.FC<ButtonProps>`. Add `'use client'` at top (since it handles events).
    - [ ]  **Props Interface** `ButtonProps`:
        - `children: React.ReactNode` (button label or contents).
        - `variant?: 'primary' | 'secondary' | 'outline' | 'ghost'` (style variations per WYOS design).
        - `size?: 'sm' | 'md' | 'lg'` (small, medium, large).
        - `disabled?: boolean`.
        - `loading?: boolean` (if true, show a loading state).
        - `onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void`.
    - [ ]  **Implementation**:
        - Render a `<button>` element.
        - Apply Tailwind classes for base styles: e.g., `inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2`.
        - **Variants**: Use conditional classNames:
            - primary: e.g. `bg-blue-600 text-white hover:bg-blue-700`.
            - secondary: e.g. `bg-gray-100 text-gray-800 hover:bg-gray-200`.
            - outline: `border border-gray-300 text-gray-800 hover:bg-gray-50`.
            - ghost: `bg-transparent text-gray-800 hover:bg-gray-100`.*(Use actual WYOS color palette values if provided, e.g., primary color.)*
        - **Sizes**:
            - sm: `px-3 py-1 text-sm`.
            - md: `px-4 py-2 text-base`.
            - lg: `px-6 py-3 text-lg`.
        - If `disabled`: add `opacity-50 cursor-not-allowed` classes and set `disabled` attribute.
        - If `loading`:
            - Show a Spinner atom or a simple inline spinner (small) in place of or alongside children. E.g., `{loading ? <Spinner size="sm" /> : children}`.
            - Also ensure button is disabled when loading to prevent clicks.
        - Spread any other props to button (like `type`, which defaults to "button").
        - **Accessibility**: If using an icon-only button in future, ensure `aria-label`. For now, assume text present.
    - [ ]  **Storybook** (`Button.stories.tsx` in `atoms/__stories__`):
        - Default story: `<Button variant="primary">Click Me</Button>`.
        - Additional stories for each variant: "Primary", "Secondary", "Outline", "Ghost" to showcase styles.
        - **States**: "Disabled" (e.g., primary disabled), "Loading" (primary loading).
        - Add controls: `variant` (select), `size` (select), `disabled` (boolean), `loading` (boolean), and `children` (text).
        - Use **actions**: `onClick` -> `action('button-click')` to log clicks.
        - In the story canvas, verify that toggling controls changes the appearance and clicking logs the action.
    - [ ]  **Testing**: Open Storybook for Button: ensure styles match design for each variant/size, disabled and loading states render appropriately (spinner visible), and no TS errors or console errors.

## 4. Build TextInput Atom (`src/components/atoms/TextInput.tsx`)

    - [ ]  **Component Setup**: Create `TextInput.tsx`. Use `'use client'` (it will handle user input).
    - [ ]  **Props Interface** `TextInputProps`:
        - `type?: string` (e.g., "text", "email", "password"; default "text").
        - `value?: string` (for controlled inputs).
        - `defaultValue?: string` (for uncontrolled usage).
        - `placeholder?: string`.
        - `disabled?: boolean`.
        - `hasError?: boolean` (to indicate invalid state).
        - `onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void`.
    - [ ]  **Implementation**:
        - Render an `<input>` with `type={type}` and proper binding of `value` or `defaultValue`:
            - If `value` is provided, use it and require `onChange` for controlled mode.
            - Otherwise, use `defaultValue` for uncontrolled.
        - Base Tailwind classes: e.g., `block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`. *(This yields a standard text field style.)*
        - If `disabled`: add `bg-gray-100 text-gray-500 cursor-not-allowed` and set `disabled`.
        - If `hasError`: add `border-red-500 focus:ring-red-500 focus:border-red-500` to highlight error. Also include `aria-invalid={true}`.
        - Make sure to forward `...props` (like name, id if given, etc.) to the input for flexibility.
        - No internal state (use props or default browser behavior).
    - [ ]  **Storybook** (`TextInput.stories.tsx`):
        - Default: `<TextInput placeholder="Enter text" />`.
        - Story: "With Value" – controlled example (e.g., `<TextInput value="Sample text" onChange={...} />`).
        - Story: "Disabled" – `<TextInput placeholder="Disabled input" disabled />`.
        - Story: "Error State" – `<TextInput placeholder="Error input" hasError />`.
        - Controls: `placeholder` (text), `hasError` (boolean), `disabled` (boolean), `value` (text).
            - If controlling `value` via story, also provide an `onChange` in the story that updates the arg to make it truly controlled in Storybook. Alternatively, demonstrate as uncontrolled to allow typing.
        - Actions: use `onChange` action to log input changes (you can log `e.target.value`).
        - Ensure the story notes mention how to use controlled vs uncontrolled modes.
    - [ ]  **Testing**: In Storybook, try typing in the Default story (should reflect typed text if uncontrolled). Toggle the Error and Disabled controls to see style updates. The `onChange` action should fire with each keystroke in controlled mode. Check that no characters can be typed when disabled.

## 5. Build Textarea Atom (`src/components/atoms/Textarea.tsx`)

    - [ ]  **Component Setup**: Create `Textarea.tsx` with `'use client'`.
    - [ ]  **Props Interface** `TextareaProps`:
        - `value?: string`, `defaultValue?: string` (controlled vs uncontrolled content).
        - `placeholder?: string`.
        - `rows?: number` (initial rows visible, default maybe 3).
        - `disabled?: boolean`.
        - `hasError?: boolean`.
        - `onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void`.
    - [ ]  **Implementation**:
        - Render `<textarea>` with similar approach to TextInput for controlled/uncontrolled behavior.
        - Base classes: `block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`.
        - Add `rows={rows}` prop. Also allow it to expand naturally if content grows (users can drag corner in most browsers by default).
        - If `disabled`: `bg-gray-100 text-gray-500 cursor-not-allowed`, set disabled attr.
        - If `hasError`: `border-red-500 focus:ring-red-500 focus:border-red-500`, and `aria-invalid`.
        - Possibly add `resize: vertical` via a Tailwind utility if we want to restrict horizontal resizing.
    - [ ]  **Storybook** (`Textarea.stories.tsx`):
        - Default: `<Textarea placeholder="Enter text..." />`.
        - "With Text": `<Textarea defaultValue="Sample multiline\ntext content." rows={4} />`.
        - "Disabled": `<Textarea placeholder="Disabled textarea" disabled />`.
        - "Error State": `<Textarea placeholder="Error textarea" hasError />`.
        - Controls: `placeholder` (text), `rows` (number slider), `hasError` (boolean), `disabled` (boolean), perhaps `value` (multiline text control).
        - Action: `onChange` logs changes (maybe log the current `e.target.value.length` or substring to avoid huge text in action).
    - [ ]  **Testing**: In Storybook, expand the textarea, type into it, see that onChange triggers. Check that additional lines appear if you hit Enter (respecting `rows` as minimum height). Verify disabled state disallows typing and error state shows red border.

## 6. Build Select Atom (`src/components/atoms/Select.tsx`)

    - [ ]  **Component Setup**: Create `Select.tsx` with `'use client'` (for onChange handling).
    - [ ]  **Props Interface** `SelectProps`:
        - `options: { value: string; label: string; }[]` (the dropdown options).
        - `value?: string` (selected value for controlled usage).
        - `defaultValue?: string` (for uncontrolled default selection).
        - `placeholder?: string` (a non-selectable placeholder option text).
        - `disabled?: boolean`.
        - `onChange?: (value: string) => void`.
    - [ ]  **Implementation**:
        - Render `<select>` element.
        - If `placeholder` is provided, include an `<option value="" disabled hidden>` at top with that text (and if no `value` is selected, this shows). Alternatively, always include an "All" or similar if needed.
        - Map `options` to `<option>` elements with `value={...}` and content as label.
        - If `value` prop is provided (controlled), set it on select; else, rely on defaultValue or uncontrolled.
        - On change (`onChange` event), call props.onChange with the new value (`e.target.value`).
        - Tailwind styling:
            - Use `block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`.
            - (Include some right padding for a native dropdown arrow space.)
            - If `disabled`: add `bg-gray-100 text-gray-500 cursor-not-allowed`.
        - No custom arrow icon (using default browser arrow). For more custom, could integrate Radix UI Select later, but this is fine for now.
    - [ ]  **Storybook** (`Select.stories.tsx`):
        - Default: e.g., `<Select placeholder="Choose one..." options={[{value:'opt1', label:'Option 1'},{value:'opt2', label:'Option 2'}]} />`.
        - "With Value": demonstrate controlled: `<Select options={[...]} value="opt2" onChange={...} />`.
        - "Disabled": `<Select options={[...]} disabled placeholder="Disabled select" />`.
        - Controls: perhaps `disabled` (boolean), and we can provide a control to simulate selection (though controlling `value` might need linking onChange to update arg). We might skip direct value control and rely on user interacting in canvas.
        - Actions: use `onChange` action to log selected value.
        - In documentation, note that for a larger list or better UX, a custom select may be used, but this is a simple implementation.
    - [ ]  **Testing**: In Storybook, ensure clicking the select shows the dropdown with given options and selecting one triggers the action. Check that placeholder appears when no value chosen. Confirm disabled select doesn’t open.

## 7. Build Label Atom (`src/components/atoms/Label.tsx`)

    - [ ]  **Component Setup**: Create `Label.tsx`. (No `'use client'` needed, purely presentational.)
    - [ ]  **Props Interface** `LabelProps`:
        - `htmlFor?: string` (to tie to an input ID).
        - `children: React.ReactNode` (label text or elements).
        - `required?: boolean` (if true, indicate required field).
        - *Optional:* `className?: string` to allow custom styling override.
    - [ ]  **Implementation**:
        - Render `<label>` element with `htmlFor={htmlFor}` if provided.
        - Apply base Tailwind classes: e.g., `block text-sm font-medium text-gray-700`.
        - If `required` is true, append an asterisk:
            - After {children}, add: `<span className="text-red-600 ml-1">*</span>` (or use `::after` via CSS, but simpler to explicitly add span).
        - Merge any custom `className` with default classes (to maintain flexibility).
        - Ensure it wraps children properly (children likely just a string normally).
    - [ ]  **Storybook** (`Label.stories.tsx`):
        - Default: `<Label htmlFor="username">Username</Label>` (simple text label).
        - "Required": `<Label htmlFor="email" required>Email</Label>` (shows "Email *").
        - If any special styling needed (not likely), demonstrate it.
        - Controls: text (for children content) and `required` (boolean).
        - No actions (non-interactive).
        - Add notes: Label should be paired with form elements via htmlFor and input id.
    - [ ]  **Testing**: In Storybook, check that the label text displays and the asterisk appears when required. Use devtools to ensure the `htmlFor` matches an input id in usage scenarios (in story it's standalone, but usage will pair it properly).

## 8. Build Checkbox Atom (`src/components/atoms/Checkbox.tsx`)

    - [ ]  **Component Setup**: Create `Checkbox.tsx` with `'use client'`.
    - [ ]  **Props Interface** `CheckboxProps`:
        - `id?: string` (to tie with a Label externally).
        - `checked?: boolean` (controlled state) and/or `defaultChecked?: boolean` (uncontrolled initial state).
        - `onChange?: (checked: boolean) => void`.
        - `label?: string` (optional text to display to the right of the checkbox).
        - `disabled?: boolean`.
    - [ ]  **Implementation**:
        - If `label` prop is provided, we can render a `<label>` wrapper containing the `<input>` and text, for easy clicking. Otherwise, just render input.
        - Use `<input type="checkbox">` with:
            - `id={id}` if provided (for external <Label> usage, or if wrapping in label, id still useful).
            - `checked={checked}` if controlled, else `defaultChecked`.
            - `disabled={disabled}` if disabled.
            - `onChange`: call props.onChange(e.target.checked) if provided.
        - Tailwind styling:
            - Basic: `h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500` (this uses default browser appearance + focus ring).
            - If customizing fully: hide the default (appearance-none) and draw a custom box with CSS. But using Tailwind + default input with slight style might be sufficient and accessible.
            - If `disabled`: `text-gray-400 bg-gray-100 cursor-not-allowed`.
        - If `label` is provided and wrapping:
            - `<label className="inline-flex items-center space-x-2"><input ... /><span className="text-sm text-gray-700">{label}</span></label>`
            - Ensure if external Label is used (no label prop), the external Label will target the input by id.
        - *Accessibility*: The label text next to checkbox should be clickable either via wrapping or htmlFor.
    - [ ]  **Storybook** (`Checkbox.stories.tsx`):
        - Default: `<Checkbox label="Remember me" />` (uncontrolled).
        - "Checked Controlled": `<Checkbox checked={true} />` (with no onChange for static display or with onChange to allow toggling via control).
        - "Disabled": one story with `<Checkbox disabled label="Disabled option" />` (unchecked disabled), and maybe another with checked disabled.
        - Controls: `checked` (boolean), `disabled` (boolean), and `label` (text).
            - We can set `checked` control, but if we allow interaction in canvas, careful: if controlled by arg, user clicking won't toggle unless we handle updating the arg in onChange.
            - For simplicity, make the default story uncontrolled (so user can check it freely), and use the controlled story for demonstrating external control.
        - Actions: onChange -> action('checkbox-change') logging the new checked value.
        - In docs, clarify how to use with external Label vs internal label prop.
    - [ ]  **Testing**: In Storybook, click the checkbox in the default story to ensure it toggles and logs action. In controlled story, use the control knob to change its state (and confirm it doesn't toggle by itself when clicked if truly controlled without onChange updating it). Check disabled story has no toggle on click and looks visually muted.

## 9. Build ToggleSwitch Atom (`src/components/atoms/ToggleSwitch.tsx`)

    - [ ]  **Component Setup**: Create `ToggleSwitch.tsx` with `'use client'`.
    - [ ]  **Props Interface** `ToggleSwitchProps`:
        - `checked?: boolean`, `defaultChecked?: boolean`.
        - `onChange?: (checked: boolean) => void`.
        - `disabled?: boolean`.
        - (If needed, `label?: string` could be added, but often toggles are standalone or have external label on side.)
    - [ ]  **Implementation**:
        - Implement as a stylized checkbox internally:
            - Use an `<input type="checkbox" className="sr-only">` for actual input (screen-reader only).
            - Use a `<div>` as the visual slider: e.g., `relative inline-block w-10 h-6 transition duration-200 ease-linear` (container).
            - Inside it, a `<span>` for track and a `<span>` for thumb:
                - Track span: `absolute inset-0 rounded-full transition bg-gray-300` (when unchecked) and `bg-blue-600` (when checked).
                - Thumb span: `absolute left-0 top-0 h-6 w-6 bg-white rounded-full border border-gray-300 transition transform` (when checked, translate-x-full or left = w-4 etc).
            - Use `peer` technique: add `peer` class to input and style siblings based on `peer-checked:` state. For example:
                - `<input type="checkbox" className="peer sr-only" ...>`
                - Track: `peer-checked:bg-blue-600`.
                - Thumb: `peer-checked:translate-x-full peer-checked:border-blue-600`.
            - This avoids JS for toggling style.
        - Bind input `checked` and `onChange` similarly to Checkbox.
        - If `disabled`: maybe add `opacity-50 cursor-not-allowed` to track/thumb container and disable input.
        - Ensure to wrap in a label or allow external label if needed (for now assume just the toggle by itself).
        - **Accessibility**: input has role switch by default? Not needed if it's checkbox with label. Maybe add `role="switch"` and `aria-checked` for completeness, but `input type=checkbox` with screen reader text label is fine.
    - [ ]  **Storybook** (`ToggleSwitch.stories.tsx`):
        - Default: `<ToggleSwitch />` (uncontrolled).
        - "Checked": `<ToggleSwitch defaultChecked />`.
        - "Disabled Off": `<ToggleSwitch disabled />`, "Disabled On": `<ToggleSwitch defaultChecked disabled />`.
        - Controls: `checked` (boolean) and `disabled` (boolean) for a controlled story.
        - Actions: onChange -> action('toggled') logging true/false.
        - If labeling needed, mention usage: (e.g., wrap in `<Label>` in a form or provide adjacent text).
    - [ ]  **Testing**: In Storybook, the toggle should slide the knob when clicked. Verify the peer classes cause the background to change color and knob to move. Ensure onChange fires. Check disabled toggle does nothing on click and appears muted.

## 10. Build Badge Atom (`src/components/atoms/Badge.tsx`)

    - [ ]  **Component Setup**: Create `Badge.tsx`.
    - [ ]  **Props Interface** `BadgeProps`:
        - `text: string`.
        - `variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'neutral'` (color style, based on WYOS design for tags).
        - `icon?: React.ReactNode` (optional leading or trailing icon).
        - `className?: string` (for custom overrides).
    - [ ]  **Implementation**:
        - Render a `<span>` (or `<div` if block, but span is fine for inline badge).
        - Base classes: `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold` (small pill shape).
        - Color variants (set background and text color):
            - primary: e.g., `bg-blue-100 text-blue-800`.
            - secondary: `bg-gray-100 text-gray-800`.
            - success: `bg-green-100 text-green-800`.
            - warning: `bg-yellow-100 text-yellow-800`.
            - info: `bg-teal-100 text-teal-800`.
            - neutral: `bg-gray-200 text-gray-800`.*(These are just examples; match WYOS palette if defined.)*
        - If `icon` provided, render it inside span, either before text (with `mr-1`) or after text (with `ml-1`), depending on context. Likely before text for category icons if any.
        - Merge additional `className` if provided.
        - Ensure no interactive behavior (just a display element).
    - [ ]  **Storybook** (`Badge.stories.tsx`):
        - Showcase one story for each variant:
            - "Primary": `<Badge text="Mindset" variant="primary" />`.
            - "Secondary": `<Badge text="Draft" variant="secondary" />`, etc.
            - Also "With Icon": e.g., `<Badge text="New" variant="success" icon={<CheckIcon />} />` (using a checkmark icon component).
        - Controls: `text` (text), `variant` (select of variants). Possibly a boolean to toggle an example icon.
        - No actions.
        - Explain that badges can represent categories, statuses, etc., and should use consistent colors from the design system.
    - [ ]  **Testing**: Check that each badge variant has appropriate background and text contrast. If using an icon (choose a small icon from an icon lib, e.g., import { Check } from "lucide-react" if integrated), ensure it renders at a good size (maybe set `className="w-3 h-3"` on the icon). Verify the CSS classes are correct and no overflow of text.

## 11. Build Avatar Atom (`src/components/atoms/Avatar.tsx`)

    - [ ]  **Component Setup**: Create `Avatar.tsx`.
    - [ ]  **Props Interface** `AvatarProps`:
        - `src?: string` (image URL).
        - `alt?: string` (alt text for image).
        - `size?: 'sm' | 'md' | 'lg' | 'xl'` (e.g., 24px, 40px, 64px, 96px diameters).
        - `fallback?: string` (text or initials to display if no image).
        - `className?: string`.
    - [ ]  **Implementation**:
        - If `src` is provided and valid:
            - Use Next.js `<Image>` if within Next environment, or `<img>` in Storybook context for simplicity.
            - Set width/height based on `size`: define pixel values for each size (sm ~24px, md ~40px, lg ~64px, xl ~96px). Use Tailwind classes or style attribute for that size.
            - Add `className="rounded-full object-cover"` to make it a circle crop.
        - If no `src`:
            - Render a `<div>` with `rounded-full bg-gray-500 flex items-center justify-center` and the fallback text (initials).
            - Make the text uppercase and white for contrast.
            - Size the div according to `size` (same dims as above).
        - If `src` fails to load, ideally show fallback too (this would require onError handling to set `src` to undefined, which might be out-of-scope; we assume either src or not given).
        - Alt text: if image, use provided alt or a generic "User Avatar". If just initials, include aria-label with the name those initials represent if known (not in props here).
        - Consider connecting to Auth store: If in actual use, might take user from store and show user.name initials, etc. But keep this component independent of store (pass data in).
    - [ ]  **Storybook** (`Avatar.stories.tsx`):
        - "Image Avatar": provide a sample `src` (use a placeholder image link, e.g., via https://i.pravatar.cc or similar), and `alt="User photo"`.
        - "Fallback Initials": `<Avatar fallback="JD" />` without src to show initials.
        - "Different Sizes": maybe multiple stories or one story with controls for size: e.g., one for sm, one for xl to see scale.
        - Controls: `size` (select), and perhaps a text control for `fallback` to simulate different initials, plus a boolean "withImage" that toggles using a src or not.
        - No actions.
        - Note: In real scenario, the src would come from user profile picture URL; fallback could be user's initials from name.
    - [ ]  **Testing**: In Storybook, verify the image avatar displays (the image loads). Check the fallback one shows a circle with letters. Switch size control to see the component resize appropriately. If an image URL is broken, the fallback won't show by current implementation, which is acceptable for now. No TS issues.

## 12. Build Spinner Atom (`src/components/atoms/Spinner.tsx`)

    - [ ]  **Component Setup**: Create `Spinner.tsx`.
    - [ ]  **Props Interface** `SpinnerProps`:
        - `size?: 'sm' | 'md' | 'lg'` (small ~16px, md ~24px, lg ~32px diameter).
        - `color?: string` (Tailwind color class or hex code; default to current text color).
        - `className?: string`.
    - [ ]  **Implementation**:
        - Option 1: CSS border spinner:
            - Render a `<div>` with classes to create a spinner: e.g.,`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent`(This makes a quarter of the border transparent, giving the spinner look).
            - Size: use width/height classes:
                - sm: `w-4 h-4`, md: `w-6 h-6`, lg: `w-8 h-8`.
            - Color: by default it's `border-current` meaning it inherits parent text color. Allow override by className or style (if `color` prop given like `text-blue-600`).
        - Option 2: Use an SVG spinner (like an SVG circle with stroke animation). Option 1 is simpler with Tailwind.
        - Merge custom className if provided (for custom color or additional styling).
        - Ensure `role="status"` and `aria-label="Loading"` for accessibility if used alone. If used next to text "Loading...", mark it aria-hidden. Here we can include `aria-label`.
    - [ ]  **Storybook** (`Spinner.stories.tsx`):
        - "Small": `<Spinner size="sm" />`.
        - "Medium (Default)": `<Spinner />`.
        - "Large, Custom Color": `<Spinner size="lg" className="text-red-500" />` (makes spinner red).
        - Controls: `size` (select), `color` (text to allow entering a Tailwind class like `text-green-600` or a hex code via style).
        - No actions. Spinner is purely visual.
        - Document that Spinner is used inside buttons or sections to indicate loading state.
    - [ ]  **Testing**: Ensure the spinner is spinning in Storybook. Check sizes differ. If you set a different color via control (className or a custom style), does it update? e.g., adding a Tailwind class might not work via control unless it's in className prop. Instead, we might have a few preset colors to pick in controls or just demonstrate via stories.

## 13. Build FormField Molecule (`src/components/molecules/FormField.tsx`) – _combines Label and Input_

    - [ ]  **Component Setup**: Create `FormField.tsx`. (No internal state needed, can be server component unless we decide to use hooks for validation messaging; we'll treat as presentational, so no `'use client'`.)
    - [ ]  **Props Interface** `FormFieldProps`:
        - `label: string`.
        - `htmlFor: string` (the id of the input this label is for).
        - `children: React.ReactNode` (expect an input element, e.g., `<TextInput>`).
        - `error?: string` (error message text, if any).
        - `required?: boolean` (pass through to Label to show asterisk).
        - `description?: string` (optional help text below the input, above error).
    - [ ]  **Implementation**:
        - Render a container `<div className="mb-4">` (margin-bottom for spacing in a form layout).
        - Inside:
            - `<Label htmlFor={htmlFor} required={required}>{label}</Label>` (use the Label atom).
            - Render `children` (the input component). Ensure the child input has `id={htmlFor}` to tie to label (this is the responsibility of whoever uses FormField).
            - If `description` provided: `<p className="text-sm text-gray-500">{description}</p>` (some subtle helper text).
            - If `error` provided: `<p className="text-sm text-red-600 mt-1">` containing the error message. (Use `mt-1` for spacing above error). Also set `aria-live="polite"` on the error for SRs.
        - Possibly enforce some styling on children: e.g., add `mt-1` on the child if we want space between label and input. Or wrap child in a div to add classes. Alternatively, require that child components (TextInput, Select, etc.) have margin in their story usage. Better to handle spacing here: add `className="mt-1"` to the input via clone or wrapper. Simpler: wrap children with a fragment or a div with that margin if needed.
        - Propagate any necessary context (likely none; this is simple).
    - [ ]  **Storybook** (`FormField.stories.tsx`):
    - Use child components to demonstrate:
        - "Text Field":

            ```tsx
            <FormField label="Name" htmlFor="name" required>
              <TextInput id="name" placeholder="Your name" />
            </FormField>
            ```

        - "With Error”:

            ```tsx
            <FormField label="Email" htmlFor="email" error="Invalid email address">
              <TextInput id="email" placeholder="you@example.com" hasError />
            </FormField>
            ```

            (Pass `hasError` to child to get red border, and provide error text)

        - Perhaps "With Description”:

            ```tsx
            <FormField label="Password" htmlFor="pw" description="Must be at least 6 characters">
              <TextInput id="pw" type="password" placeholder="Enter password" />
            </FormField>
            ```

        - Also show usage with a Select or Textarea if desired.
    - Controls: The `children` can't be directly controlled easily. Instead, maybe control the `error` prop text to simulate toggling an error on/off.
    - No direct actions (the child's onChange action will fire if interacted with).
    - Explain that this component is a wrapper to keep label, input, and error together in a consistent layout.
    - [ ]  **Testing**: In Storybook, check that label is correctly associated (clicking label focuses input). See that error text appears and has the correct color. Ensure required asterisk shows when `required` true. If a child Select or Textarea is used, layout should still be fine. Confirm no accessibility issues (e.g., multiple labels? We use one label component outside and id linking, so it's correct).

## 14. Build SearchBar Molecule (`src/components/molecules/SearchBar.tsx`)

    - [ ]  **Component Setup**: Create `SearchBar.tsx` with `'use client'` (to manage input state and handle submission if any).
    - [ ]  **Props Interface** `SearchBarProps`:
        - `query?: string` (controlled search query).
        - `onQueryChange?: (query: string) => void`.
        - `onSubmit?: () => void` (triggered when user submits the search, e.g., presses Enter or clicks search icon).
        - `placeholder?: string` (placeholder text, default "Search...").
    - [ ]  **Implementation**:
        - Use the TextInput atom for the input field internally, or a native input with custom styling if more control needed.
        - Possibly simpler: incorporate an icon inside the input field. Two approaches:
            1. Absolutely position an icon over the input.
            2. Wrap input and icon in a parent.
        - Implementation plan:
            - Wrap in a `<div className="relative">` to position an icon.
            - Place a search icon (e.g., an SVG or Lucide icon) as absolutely positioned element in the left center:`<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />`.
            - Use a TextInput with padding-left to accommodate the icon (e.g., `pl-10`).
            - The TextInput can accept value/onChange from props (controlled if query prop given, else manage internal state via useState).
        - If making it fully controlled: just pass `value={query}` and `onChange={(e) => onQueryChange?.(e.target.value)}` to TextInput.
        - If `onSubmit` is provided:
            - Add an `<form>` around or handle key events:
            - Simplest: wrap input in a `<form onSubmit={...}>` and have a hidden submit button or detect Enter key.
            - Alternatively, capture `onKeyDown` on input: if key === 'Enter', call `onSubmit`.
            - Or include a clickable "search" icon button on the right inside the relative container. For example, a search icon on left for visual, and maybe reuse it or another on right as a button:Actually, a better approach: make the left icon just decorative (or omit it), and have a right-aligned button with a search icon that actually triggers submit. However, a form with single input also submits on Enter by default.
            - For now, implement form submission:
                - Wrap in `<form onSubmit={e => { e.preventDefault(); onSubmit?.(); }}>`.
                - Include `role="search"` on form for accessibility.
                - You can put the search icon either as a left static icon or as a `<button type="submit">` with icon on the right. Maybe do right to allow clickable submission:e.g., `<button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"><SearchIcon /></button>` on the right side.
                - If using right icon as button, remove left icon to avoid duplicate.
        - Style: make sure the input has `pl-10 pr-10` if icons on both sides, or `pl-10 pr-3` if only left icon.
        - Use placeholder prop.
        - *Interaction:* If not controlled, use `useState` for query and call onSubmit with the current query. But prefer controlled via props to keep stateless (the page using it can manage state or store). We can allow both: if `query` prop not provided, manage internal state. This adds complexity; for simplicity assume controlled usage by parent. In storybook, we'll simulate it with state.
    - [ ]  **Storybook** (`SearchBar.stories.tsx`):
        - Create a wrapper story component that manages state if needed to demo. Or simpler, use controlled via Storybook args:
            - Default: `<SearchBar placeholder="Search knowledge..." onSubmit={action('search-submit')} onQueryChange={action('query-change')} />`. (No query prop, so we might implement internal useState if query is undefined.)
            - If not implementing internal state, then do a controlled story: maintain a state in the Story to pass query and update it in onQueryChange. (This can be done via Storybook `args` and `onQueryChange: (val) => { args.query = val; ... }`, or use a Story decorators with React useState). For simplicity in plan, just demonstrate usage.
        - Show maybe an initial query: `<SearchBar query="habit" ... />` story to see filled input.
        - Controls: not straightforward due to needing to sync with internal state. Could allow control of `placeholder`. But query we can tie to a control if we have `onQueryChange` update the arg.
        - Actions: definitely log `onQueryChange` (with new query string) and `onSubmit`.
        - In docs: mention that Enter or clicking the icon triggers onSubmit.
    - [ ]  **Testing**: In Storybook, verify the input displays with the search icon visible. Type in the field: see `onQueryChange` action logging keystrokes. Press Enter or click the search button (if implemented) and see `onSubmit` action. Check layout on small width (should be fine, it's a single input). Ensure no unexpected form submissions (we preventDefault).

## 15. Build NavLink Molecule (`src/components/molecules/NavLink.tsx`) – _a navigation link with active state_

    - [ ]  **Component Setup**: Create `NavLink.tsx`.
    - [ ]  **Props Interface** `NavLinkProps`:
        - `href: string` (target route or URL).
        - `label: string`.
        - `isActive?: boolean` (if this link is the current page).
        - `icon?: JSX.Element` (optional icon to display with label).
        - `onClick?: (e: React.MouseEvent) => void` (optional, primarily for Storybook to intercept navigation).
    - [ ]  **Implementation**:
        - Use Next.js `<Link>` for internal navigation if `href` starts with "/" (for Storybook, we can just render an `<a>` because Next Link might not work in Storybook without additional config; we might conditionally use `<a>` when on external or story context). But we'll assume Next Link works by default with the proper Storybook framework config.
        - Inside the Link, render a `<span>` or `<a>` child (Next 13 allows `<Link>` to wrap any element, but typically you put an `<a>` inside for styling if needed). Actually, in Next 13, you can use `<Link className="...">` directly on the Link component (it forwards class).

            So:

            ```tsx
            <Link href={href} className={...}>
              {icon}{label}
            </Link>
            ```

        - Determine classes:
            - Base: `text-sm font-medium px-3 py-2 rounded-md` (if we want some padding area like a tab, else if it's just text link, we can keep it simpler, but padding helps for active background highlight).
            - If `isActive`: add `text-blue-600 bg-blue-100` (for example) or underline. Alternatively, active style could be bold + underline. E.g., `font-semibold underline`.
        - If `icon` provided, render it before label with perhaps `className="mr-1 w-4 h-4 inline-block"`.
        - If `onClick` provided, attach it to the `<a>` or span inside to intercept (for Storybook to log action instead of actual navigation). Or we can rely on Storybook's `actions` addon by passing an onClick to the Link's child. (Next Link doesn't accept onClick directly if using child anchor, the anchor would have it).
        - Make sure to pass `aria-current="page"` if active (accessibility to indicate current page).
        - [ ]  **Storybook** (`NavLink.stories.tsx`):
            - Show a few examples:
                - "Default (Inactive)": `<NavLink href="/knowledge" label="Knowledge" />`.
                - "Active": `<NavLink href="/knowledge" label="Knowledge" isActive />`.
                - "With Icon": `<NavLink href="/community" label="Community" icon={<UsersIcon />} />` (using a community/users icon).
            - Controls: `label` (text), `isActive` (boolean). Possibly an icon toggle but dynamic icon via control is hard; we can omit that.
            - Actions: use `onClick` in stories to prevent actual navigation and log action: e.g., `<NavLink href="#" label="Test Link" onClick={action('navlink-click')} />` for demonstration (or in all stories, since we don't want Storybook to navigate). For safety, we might use `href="#"` or `href="/"` and onClick preventDefault in story context.
            - Ensure to mention that normally this uses Next Link for in-app routing.
        - [ ]  **Testing**: In Storybook, verify the styling: active vs inactive (active one should have the distinct style). Hover over link to see hover style. Click on it – if we set up onClick action, ensure it logs and doesn't reload the story. If using Next Link without onClick, Storybook might try to navigate in the iframe which we want to avoid; hence using onClick to intercept is good. Check icon displays properly when provided. Also test focus style (tab to link, should see focus ring due to Tailwind focus styles or default browser, ensure it's visible).

## 16. Build Navbar Organism (`src/components/organisms/Navbar.tsx`)

    - [ ]  **Component Setup**: Create `Navbar.tsx` with `'use client'` (will interact with state and possibly need dynamic behavior).
    - [ ]  **Props (for Storybook/testing)** `NavbarProps`:
        - In practice, Navbar might directly use Zustand stores, but for Storybook, allow overriding:
        - `isAuthenticated?: boolean` (if provided, override auth store state for stories).
        - `userName?: string` (name to display if logged in, e.g., for avatar initial or greeting).
        - `onLoginClick?: () => void` (story action for login button).
        - `onLogoutClick?: () => void` (story action for logout).
        - (In the actual app usage, we might not use these props; they're just to simulate states in Storybook without a real store backend.)
    - [ ]  **Implementation**:
        - Layout: a top `<header>` with a container `div` (flex items-center justify-between px-4 py-2 bg-white shadow` for example).
        - **Left (Logo)**:
            - Put site name "WYOS" or full "Writing Your Own Story" as a logo text or an actual logo image if available. E.g., `<Link href="/" className="text-xl font-bold">WYOS</Link>`.
            - Might style it distinctively (primary color or font).
        - **Center (Nav links)**:
            - Create an array of main navigation items: e.g., `[{ label: 'Knowledge', href: '/knowledge' }, { label: 'Resources', href: '/resources' }, { label: 'Community', href: '/community' }]`.
            - Render these using `<NavLink>` for each:

                ```tsx
                <nav className="hidden md:flex space-x-4">
                  {navItems.map(item => (
                    <NavLink key={item.href} href={item.href} label={item.label} isActive={/* determine via route or props */} />
                  ))}
                </nav>
                ```

            - On larger screens (md up) show them inline. Use `hidden md:flex` to hide on mobile.
            - Determine `isActive`: if we have Next's `usePathname()`, we could highlight current. Alternatively, if in story or static, accept an active prop or none (maybe mark one active manually in stories). For now, maybe not highlight in actual component unless we integrate router. We can come back to this with usePathname if needed.
        - **Right (Auth & UI controls)**:
            - If user is logged out: show **Login** and **Sign Up** buttons.
                - Use our `Button` atom for consistency: e.g., `<Button variant="secondary" size="sm" onClick={...}>Log in</Button>` and `<Button variant="primary" size="sm" onClick={...}>Sign up</Button>`.
                - Alternatively, just simple `<NavLink>` or anchor styled as button. But since we have Button, use it.
                - These likely link to `/login` and `/signup` pages. For now, onClick can trigger the callbacks or use Next Link around the button if we want actual navigation. Perhaps simpler:

                    ```tsx
                    <Link href="/login"><Button variant="secondary" size="sm">Log in</Button></Link>
                    <Link href="/signup"><Button variant="primary" size="sm">Sign up</Button></Link>
                    ```

                    This navigates properly. In Storybook, instead of actual Link, we might intercept via onLoginClick. So we can do conditional: if `onLoginClick` prop is provided (meaning we are in a non-real environment), call that instead of normal navigation. Possibly have a separate story variant that uses actions.

            - If user is logged in: show **User menu**.
                - Likely display the user's name or avatar:
                    - Use `Avatar` atom with either user's profile pic or initials. If no image, show initial from `userName`.
                    - Possibly also a small down-caret icon indicating dropdown.
                - Clicking avatar should toggle a dropdown menu (for Profile/Logout). We'll implement a simple dropdown:
                    - Manage an internal state `open`, or use a Zustand UI store property (but let's handle here for simplicity).
                    - On avatar (or a surrounding button) click: toggle `menuOpen`.
                    - Dropdown menu: absolutely positioned `<div>` (or use Popover from ShadCN to ensure positioning; but manual is fine):
                        - `<div className="absolute right-4 mt-2 w-40 bg-white border rounded shadow-md">` with a list of `<button>` or `<Link>` items inside (Profile, Logout).
                        - Each item style: `block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`.
                        - If "Profile" clicked: navigate to profile page (or stub). If "Logout" clicked: call logout (in actual app, call `useAuthStore.getState().logout()` then maybe redirect; in story, call `onLogoutClick`).
                        - Use `tabIndex={0}` and focus trap lightly by focusing first item when open or closing on blur outside (this can be complex; maybe skip detailed focus trap due to time, but mention to close on click outside or Esc ideally).
                    - Ensure to render the menu conditionally when open. Possibly use `onClickOutside` to close (could add a `useEffect` to listen for clicks outside if advanced, but not required for plan).
                - Also, as part of UI controls, we might include a **Dark Mode toggle** icon here in the navbar (like a moon/sun icon that triggers `toggleTheme` from UI store). This can be placed near the user menu or on the left side of right section.
                    - E.g., a button that calls `useUIStore.getState().toggleTheme()` on click. We can include that as an extra small icon.
            - On mobile (sm screens): we hide the nav links, so likely we show a **hamburger menu** icon on left or right to toggle a side drawer or dropdown with nav items:
                - Add a menu button (three bars icon) visible on `md:hidden` that toggles `useUIStore.getState().openMobileMenu()`.
                - If `isMobileMenuOpen` (from UI store), render a mobile menu:
                    - Possibly a full-screen overlay with the nav links and auth options vertically:
                    - `<div className="fixed inset-0 bg-white z-50 p-4 flex flex-col">` with each nav link as a big clickable item (use NavLink or just Buttons) and at bottom maybe the login/logout.
                    - Or a simpler drop-down: `<div className="absolute top-full right-0 bg-white w-40 ...">` listing same links. But since we have 3 main links plus maybe others, maybe full-screen overlay is more typical for mobile nav.
                - Ensure clicking a link in mobile menu or pressing the X/close (maybe reuse the hamburger button toggled to an X when open) closes the menu.
                - Use Framer Motion (later step) for a nice slide effect if possible.
        - [ ]  **Storybook** (`Navbar.stories.tsx`):
            - We need to simulate different auth states:
                - "Logged Out": Show Navbar with no user (i.e., default state). Use `onLoginClick` and `onLogoutClick` actions to capture clicks on those buttons instead of actual navigation (to avoid Storybook trying to route). For example, pass `onLoginClick={action('login-click')}` and in Navbar implementation, if that prop exists, use it on the Login button's onClick instead of Link.
                - "Logged In": Provide `isAuthenticated=true` and `userName="Alice"` props. Navbar will then render avatar and menu. Attach `onLogoutClick={action('logout-click')}` for the logout action. Perhaps also `onLoginClick` is unused in this state.
                - We might add a control or separate story to simulate mobile menu, but it's tricky to toggle in Storybook without the actual UI store. Possibly we don't open mobile menu by default in story; we rely on viewer resizing the canvas and clicking hamburger (which should work and display menu).
            - Add Storybook parameters to emulate responsive view (or just instruct testers to use the viewport addon to test mobile).
            - Ensure the Storybook uses a dummy provider or manual override rather than actual Zustand store to avoid conflicts. We might simplify by not hooking authStore in Navbar at all for story context and purely rely on props, which is fine.
            - Controls: Could allow toggling a boolean `loggedIn` to swap between states by controlling which story renders (or design separate stories as above).
        - [ ]  **Testing**:
            - In Storybook, view "Logged Out": should see brand, Knowledge/Resources/Community links (if medium+ viewport), and Login/Sign Up buttons. Click "Log in" should log an action (and not actually navigate).
            - "Logged In": should show brand, links, and an avatar (with maybe initial "A"). Clicking avatar should toggle the dropdown menu with "Profile" and "Logout". Click "Logout" logs action.
            - Use the viewport dropdown in Storybook to test "mobile": at small width, nav links should hide and a hamburger menu should appear. Click hamburger: menu should drop down or overlay with links and possibly login or user info. (Make sure the story can reflect `isMobileMenuOpen`; if using Zustand for that, we might actually use the UI store in Navbar; to test, we might in story manually set UI store open via a button, but ideally the hamburger click itself works.)
            - Also test the theme toggle if added: clicking it should switch theme in preview (if implemented to actually add/remove 'dark' class; might not reflect in Storybook iframe easily without additional configuration to toggle a class on body, skip verifying in Storybook beyond seeing the icon).
            - General: ensure no overflow or misalignment, and that all interactive elements are keyboard accessible (tab through links, buttons, menu items).
            - No TypeScript errors and follows SOLID: e.g., separated concerns (the dropdown menu could be its own small component, but fine inline).

## 17. Build Footer Organism (`src/components/organisms/Footer.tsx`)

    - [ ]  **Component Setup**: Create `Footer.tsx`. (This can be a server component – static content.)
    - [ ]  **Props**: Likely none (could take dynamic year or lists, but unnecessary). Possibly a prop for `copyrightText` if needed.
    - [ ]  **Implementation**:
        - Use `<footer className="bg-gray-100 text-gray-600 text-sm py-4">`.
        - Content:
            - A container (like `max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0`).
            - Left side: Site name or logo and maybe a tagline: e.g.,

                ```tsx
                <div>
                  <span className="font-semibold">Writing Your Own Story</span> – Empowering personal growth.
                </div>
                ```

                (This text from WYOS mission if available, or a short phrase.)

            - Right side: some navigation or info:
                - Could list quick links: "Knowledge", "Resources", "Community", "About", "Contact". As inline links with spacing.
                - Or just a copyright notice: e.g., `© 2025 WYOS. All rights reserved.`
            - If WYOS has social media, could include icons (not mentioned, skip).
        - Use semantic `<footer>` and inside possibly `<nav>` for the links to be semantically correct.
        - Ensure any links use Next `<Link>` or anchor if external. They likely go to pages within the app or external pages (like "Community" maybe external). For now, just stub with `href="#"` or actual if known.
        - Keep design minimal and consistent.
    - [ ]  **Storybook** (`Footer.stories.tsx`):
        - Single story "Default": just renders the footer. There's not much state to vary.
        - If any dynamic parts (like current year), ensure it always shows current year by code or mention to update manually.
        - Controls: possibly none needed, or maybe control to show/hide one part if we had that. Likely not needed.
    - [ ]  **Testing**: In Storybook, verify the footer text appears as expected. Check on small width: the layout might stack (we used flex with space-y for stacking on mobile). Ensure links (if any) are clickable (they will just reload story if #, but that's fine for visual). On the actual app, those should navigate.
        - Check contrast of text vs background for accessibility (gray on gray should still be readable; adjust to darker text if needed).
        - Confirm no console errors and types are fine.

## 18. Build KnowledgeCard Organism (`src/components/organisms/KnowledgeCard.tsx`) – _card to display a knowledge article summary_

    - [ ]  **Component Setup**: Create `KnowledgeCard.tsx`.
    - [ ]  **Props Interface** `KnowledgeCardProps`:
        - `title: string`.
        - `summary: string` (brief excerpt).
        - `category: string` (e.g., category name like "Mindset", "Productivity").
        - `imageUrl?: string` (optional cover image URL for the article).
        - `href?: string` (link to the full article page).
        - `onClick?: () => void` (optional click handler, e.g., for Storybook action or alternative usage).
        - *Optional:* `author?: string` and `publishedDate?: string` (if we want to show author/date info, not mentioned but might be relevant).
    - [ ]  **Implementation**:
        - Outer container:(Use `overflow-hidden` and rounded to clip the image corners.)

            ```jsx
            jsx
            Copy
            <div className="group rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">

            ```

        - If `imageUrl` provided:
            - Render an image at top: `<img src={imageUrl} alt={title} className="w-full h-32 object-cover" />` (h-32 or so for a consistent thumbnail height). Use Next `<Image>` with `fill` if possible for better optimization (but Storybook might not handle Next Image well; fine to use <img> for now).
            - If no image: maybe render a placeholder div or omit image element entirely. Possibly a fixed-height colored div or an icon indicating no image. A placeholder could be a gray background with an icon or first letter of title. But to keep simple, if no image, just don't render that top portion (the card will be shorter).
        - Content section (padding inside card): `<div className="p-4">`:
            - Category badge: Use `<Badge variant="primary" text={category} className="mb-2" />` or a small `<span>` if not wanting a pill. (Badge is nicer, using maybe secondary variant or color-coded by category if we had mapping).
            - Title: `<h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{title}</h3>` (line-clamp-2 if Tailwind typography plugin or custom class to truncate long titles to 2 lines).
            - Summary: `<p className="text-sm text-gray-600 line-clamp-3">{summary}</p>` (truncate to 3 lines).
            - (Optional: Author/Date: e.g., a smaller text line at bottom: `<p className="mt-2 text-xs text-gray-500">By {author} on {date}</p>` if we want that detail.)
        - Wrap the entire card in a clickable element:
            - If `href` given, wrap with `<Link href={href}>` so the whole card is a link. Alternatively, make the container a `<a href={href}>`.
            - If `onClick` provided, attach to container div (`onClick={onClick}`) and maybe prevent default if combined with Link. In Storybook, we'll likely use onClick to log.
        - Hover effect: already added hover:shadow-md on container. Could also do `group-hover:translate-y-[-2px]` minor lift if desired (with relative positioning). But shadow is fine.
        - Make sure height adjusts to content; for uniform grid, you might fix height, but better to allow variable and align items via CSS if needed. We'll keep flexible.
        - **Accessibility**: The whole card being a link should get `aria-label` perhaps including title for context if just an icon or such, but since we have text, it's fine. If using <div onClick>, then add `role="link"` and handle keyboard events (that's why using actual <a> or Link is better). We'll prefer `<a>` for semantics.
    - [ ]  **Storybook** (`KnowledgeCard.stories.tsx`):
        - Use sample content:
            - title: "Building Good Habits", category: "Habits", summary: "Learn how to form lasting habits that stick and transform your life." (short sentence or two). imageUrl: maybe a link to a placeholder image (Unsplash) relevant to habits.
            - Another story with a different category, maybe no image: e.g., title: "Mindset Matters", category: "Mindset", summary: "Understanding the impact of a growth mindset on personal development...", no imageUrl.
        - "With Image": `<KnowledgeCard title="..." category="Habits" summary="..." imageUrl="https://source.unsplash.com/400x300/?goal" />`.
        - "Without Image": `<KnowledgeCard title="..." category="Mindset" summary="..." />`.
        - Possibly "Long Title" to test truncation: create a story with title that's very long and summary long to ensure line-clamp works.
        - Controls: could allow toggling image on/off (via a boolean that chooses one of two props sets), but not necessary.
        - Actions: use `onClick` action to log when card is clicked in the story (so that clicking the card doesn't navigate in Storybook). In the stories, set `href="#"` or omit href, and use onClick for action logging.
        - Ensure to mention in docs that normally this links to the detailed article page.
    - [ ]  **Testing**: In Storybook, verify the card renders correctly: image fills top, content below. The badge shows category. The title should be bold and truncated if too long (hover to see if it has a `title` attribute if we want, not implemented but could add `title={title}` on the h3 for full tooltip). The summary truncates after a few lines. The entire card area should be clickable (in story clicking logs the action). Check responsiveness: at narrow widths, card just shrinks in width accordingly (depending on parent container in grid). Looks good with and without image. Also confirm multiple KnowledgeCards in a row have consistent height if content lengths differ significantly (line-clamp ensures they don't become drastically different, but some difference possible; in a grid, it's usually okay unless you want equal height cards - which we won't enforce strictly now).

## 19. Build KnowledgeGrid Organism (`src/components/organisms/KnowledgeGrid.tsx`) – _layout for multiple knowledge cards_

    - [ ]  **Component Setup**: Create `KnowledgeGrid.tsx`. (This can be a server component as it just lays out data passed in.)
    - [ ]  **Props Interface** `KnowledgeGridProps`:
        - `items: KnowledgeCardProps[]` (array of knowledge item data).
        - *Optional:* `columns?: number` (to override default columns) – but we'll likely just use responsive design.
    - [ ]  **Implementation**:
        - If items length is 0, render a **No Results** message:

            ```jsx
            if (!items || items.length === 0) {
              return <p className="text-center text-gray-500 py-8">No articles found.</p>;
            }
            ```

        - Otherwise, render a container:`<div className="grid gap-4" />` and apply responsive grid columns via Tailwind: e.g., `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`. (3 columns on xl, 2 on small desktops, 1 on mobile). If we want dynamic `columns` prop, we can do something like template columns style inline, but responsive is more typical. We can ignore `columns` prop or use it as default for xl if provided. For now, assume 3 columns at large.
        - Iterate `items.map((item, idx) => <KnowledgeCard key={idx} {...item} />)`.
        - Ensure each card is contained in a grid cell and they flow properly.
        - Maybe add `className` prop in KnowledgeCard for full height to make them equal height in each cell (like `h-full flex flex-col` for card container and flex-grow on summary? But not necessary if content lengths similar; skip equalizing height for simplicity).
    - [ ]  **Storybook** (`KnowledgeGrid.stories.tsx`):
        - Use 3-4 sample items (maybe reuse data from KnowledgeCard stories): create an array and pass it to KnowledgeGrid.
        - "Default": 3 items (to fill one row if 3 columns on large).
        - "Multiple Rows": maybe 5 items to show wrapping to a second row on large.
        - "Empty": items = [] to show the "No articles found" message.
        - Controls: possibly control number of items (could provide a range slider that slices a base array to that count, to demo dynamic lengths). E.g., `const Template: Story = ({ count }) => <KnowledgeGrid items={sampleItems.slice(0, count)} />;` with control for count. That might be advanced usage; optional.
        - Actions: clicking on a card will trigger that card's onClick if we set one in sample data. For story, we can attach onClick actions to each item in the array (like map sample data and add an onClick action to each). Or simpler, in sample data for Storybook, set `onClick: action('card-click')` for all. That will log which card was clicked in a generic way (they all log same action, but we can differentiate if needed by including title in action name using partial application). This is a bit advanced but can be done: e.g., in sample data creation: `items.map(item => ({ ...item, onClick: () => action('open-knowledge')(item.title) }))`.
        - Emphasize in docs the grid is responsive and uses the KnowledgeCard component.
    - [ ]  **Testing**: In Storybook, ensure the grid displays a nice layout: on large canvas you see multiple columns, on smaller it wraps appropriately. Use Storybook viewport to test mobile (should stack to 1 column). Check the "Empty" story shows the placeholder text. Click on a card and see the action (if configured). No layout shifts or errors.

## 20. Build CategoryNav Organism (`src/components/organisms/CategoryNav.tsx`) – _category filter navigation (e.g., sidebar)_

    - [ ]  **Component Setup**: Create `CategoryNav.tsx` with `'use client'` (since it handles selection clicks).
    - [ ]  **Props Interface** `CategoryNavProps`:
        - `categories: { id: string; name: string; }[]`. Include an "All" category if needed (perhaps id: 'all').
        - `selectedId: string` (the currently selected category id).
        - `onSelect: (id: string) => void`.
        - `orientation?: 'vertical' | 'horizontal'` (if we want to reuse horizontally on mobile, optional).
    - [ ]  **Implementation**:
        - Layout:
            - If `orientation === 'vertical'` (default for sidebar), use a container `<div className="space-y-2">`.
            - If horizontal, `<div className="flex space-x-2 overflow-x-auto">` (with maybe `pb-2` for bottom padding).
        - Iterate categories:
            - For each category, render a `<button>` or `<a>`: using a button is fine since it triggers filtering, not full navigation (though one could do navigation too). We'll assume client-side filtering.
            - Use Tailwind classes for category item:
                - Base: `block text-sm px-3 py-2 rounded-md text-left` (if vertical, or text-center if horizontal maybe).
                - If `id === selectedId`: highlight it: e.g., `bg-blue-600 text-white font-medium`.
                - Else: `bg-gray-100 text-gray-700 hover:bg-gray-200`. (For horizontal, similar styling).
            - Display category.name as button text.
            - Attach `onClick={() => onSelect(cat.id)}`.
        - If categories list is long, consider making the container scrollable if horizontal (we added overflow-x-auto for that). For vertical, maybe scroll if extremely long (not needed if only a handful).
        - If using vertical in a sidebar, optionally the first item is "All" to reset filter.
        - Could include an heading above (like "Categories") if needed, but likely self-explanatory. Skip heading for simplicity.
        - Accessibility: The list could be in a `<nav aria-label="Categories">` with the buttons. Each button could have `aria-current={selectedId === id ? 'page' : undefined}` if these behave like navigation. If it's purely filtering on same page, maybe `aria-pressed` on selected (since they act like toggle buttons). Actually, treat them as a toggle group: use `aria-pressed` true on the selected category's button to indicate active filter.
        - Ensure focus ring visible on selection (Tailwind focus style).
    - [ ]  **Storybook** (`CategoryNav.stories.tsx`):
        - Use sample categories: e.g., `[{id:'all', name:'All'}, {id:'habits', name:'Habits'}, {id:'mindset', name:'Mindset'}, {id:'productivity', name:'Productivity'}]`.
        - Default: vertical variant (simulating sidebar), selectedId = 'all'.
        - "With Selection": e.g., selectedId = 'mindset'.
        - "Horizontal": same categories but `orientation="horizontal"`, and maybe selectedId = 'all'.
        - Controls: allow dynamic selection of `selectedId` (dropdown of category ids) to see highlight change.
        - Actions: onSelect -> action('category-select') (should log the selected id).
        - Documentation: mention usage in Knowledge/Resources sections to filter lists.
    - [ ]  **Testing**: In Storybook, ensure the list of categories appears. The selected one has a different style (white text on blue background in our example). Try clicking different categories; see the action log with correct id and the visual highlight moving (if we use the control to set selectedId, we might also update it in onSelect via Storybook args to actually see it move; but even if not, at least on initial render one is highlighted). Check horizontal story: it should show categories in a row, possibly with scroll if viewport is narrow. Ensure no wrap if overflow-x-auto is present. Check keyboard accessibility: focus each button with Tab, press Enter to trigger onSelect (Storybook action should log). Everything should be strongly typed.

## 21. Build Knowledge Page (Knowledge section listing)

    - [ ]  **File**: Create Next.js page at `src/app/knowledge/page.tsx` (server component by default).
    - [ ]  **Data Source**: For development, prepare **sample data** for knowledge items. For example, in this file or a separate `data/knowledgeSamples.ts`, define an array of knowledge entries:

        ```tsx
        const knowledgeSamples = [
          { id: 'habits-101', title: 'Habits 101', category: 'Habits', summary: 'Introduction to building good habits...', imageUrl: 'https://source.unsplash.com/400x300/?habit' },
          { id: 'growth-mindset', title: 'Growth Mindset Explained', category: 'Mindset', summary: 'How a growth mindset can change your outlook...', imageUrl: 'https://source.unsplash.com/400x300/?mindset' },
          // ... more items
        ];
        ```

        - Ensure some variety in categories.
    - [ ]  **UI Composition**:
        - Consider overall layout: likely a sidebar on the left for categories, content on right for list. Use a **layout component or section** for this if needed.
        - In Next App Router, we can create a route group or layout for knowledge section. Simpler: embed layout in this page for now:

            ```jsx
            <div className="flex">
              {/* Sidebar for categories (desktop) */}
              <aside className="hidden lg:block lg:w-64 xl:w-72 p-4 border-r border-gray-200">
                <CategoryNav
                  categories={categoryList}
                  selectedId={selectedCategory}
                  onSelect={(id) => {/* handle selection (possibly via navigation or state) */}}
                />
              </aside>
              {/* Main content */}
              <div className="flex-1 p-4">
                <SearchBar placeholder="Search knowledge..." onSubmit={...} onQueryChange={...} /><div className="mt-4">
                  <KnowledgeGrid items={filteredItems} />
                </div>
              </div>
            </div>
            ```

        - **CategoryNav integration**:
            - Define `categoryList`: derive from sample data or have a static list (e.g., ["All", "Habits", "Mindset", etc.] with an "All" option). Could generate unique categories from samples for realism.
            - Manage selected category: We have two approaches – client state or route query param.
                - For simplicity, use client state (which means marking part of this page as `'use client'` or wrapping CategoryNav & KnowledgeGrid in a client component). Next best practice would be to use route segment (like /knowledge/[category]) for each category filter. But to keep scope limited, do it client-side.
            - We'll do quick client filtering: create a small client component in this file:

                ```jsx
                jsx
                Copy
                'use client';
                import { useState } from 'react';
                // ... within page component or outside
                const [selectedCategory, setSelectedCategory] = useState('all');
                const [searchQuery, setSearchQuery] = useState('');
                const filteredItems = knowledgeSamples.filter(item =>
                  (selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory) &&
                  (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.summary.toLowerCase().includes(searchQuery.toLowerCase()))
                );

                ```

                (Note: This means converting the page to a client component or wrapping content in a client child, which is fine since it’s mostly UI logic.)

            - Alternatively, use Zustand to store filter state: e.g., `useUIStore` for search query and category selection, but that global might not be necessary. Could also create a dedicated `useKnowledgeStore` with category and search state to share with Resources maybe, but user didn't explicitly request. We'll do local state for now.
        - **SearchBar integration**:
            - `<SearchBar placeholder="Search articles..." onQueryChange={val => setSearchQuery(val)} onSubmit={() => {/* maybe do nothing extra, filtering is live */}} />`.
            - Possibly we don't even need an explicit onSubmit since filtering happens as you type (onQueryChange). But we keep for interface completeness.
        - **KnowledgeGrid**: feed it `filteredItems`.
        - **Mobile behavior**:
            - On mobile (lg breakpoint down), CategoryNav is hidden. We might want a dropdown for categories or just rely on search. To address filtering on mobile in minimal way:
                - We could include a horizontal CategoryNav above the search bar if needed for small screens. E.g., `<CategoryNav orientation="horizontal" ... className="lg:hidden mb-4" />` to show a scrollable categories list on mobile.
                - Or a filter dropdown – but to not complicate, let's do horizontal CategoryNav visible on mobile.
            - So, add:

                ```jsx
                { /* Mobile categories filter */ }
                <div className="lg:hidden mb-3">
                  <CategoryNav
                    categories={categoryList}
                    selectedId={selectedCategory}
                    onSelect={id => setSelectedCategory(id)}
                    orientation="horizontal"
                  />
                </div>
                ```

                above the SearchBar in the main content for mobile.

        - Wrap entire content in a `<section aria-labelledby="knowledge-heading">` and maybe have a heading for accessibility: e.g., `<h1 id="knowledge-heading" className="sr-only">Knowledge Articles</h1>` if needed (since visible title might be the nav link user clicked).
        - Use actual Next Link in KnowledgeCard so clicking goes to detail page (we will implement that next). If `href` is something like `/knowledge/habits-101`.
            - So in constructing `knowledgeSamples`, include `href: '/knowledge/' + id` for each. Or compute on the fly: `<KnowledgeCard {...item} href={`/knowledge/${item.id}`} />`.
    - [ ]  **No Storybook for pages** (we'll rely on integration testing via browser). We typically don't create stories for full pages as they require Next router context, but we have components for all parts anyway.
    - [ ]  **Testing (Manual)**: Run `npm run dev` and visit http://localhost:3000/knowledge:
        - See if category sidebar appears with all categories and "All" selected by default.
        - KnowledgeGrid shows all sample articles initially.
        - Click a category (desktop): should filter the list to those items (selectedCategory state updates, grid updates).
        - Use search: type in a term known to match some titles or summaries; the grid should update in real-time to show only matching items. Test a term that yields no results to see "No articles found."
        - Combo: select a category then search within it to ensure both filters apply.
        - Mobile: open devtools mobile view or narrow window:
            - Sidebar should disappear, but horizontal CategoryNav should show above search.
            - Scroll the category list horizontally if overflow (simulate by small screen).
            - Ensure selecting from that updates state same as desktop.
        - Check that clicking a KnowledgeCard triggers navigation to [slug] page (if not, maybe it logged something in console if we didn't fully implement linking). We should ensure <KnowledgeCard> uses Link. If using our onClick for story, maybe we bypassed link. For actual usage, we might set `onClick` to navigate too. But simplest: give KnowledgeCard an href, it will wrap in <a>. That should navigate.
        - Check overall layout: padding, scroll behavior (should be scrollable vertically with full content height).
        - Confirm no console errors or TS issues.
        - Ensure all text is appropriately sized and contrast is good (the design is likely fine with Tailwind default shades).

## 22. Build Knowledge Detail Page (Knowledge entry content)

    - [ ]  **File**: Create `src/app/knowledge/[id]/page.tsx` (dynamic route page for knowledge entries).
    - [ ]  **Data Fetching**:
        - In a real app, we'd fetch by ID from backend. For dev, reuse `knowledgeSamples` from previous step or a shared module.
        - Use Next.js dynamic params: `export async function generateStaticParams() { return knowledgeSamples.map(item => ({ id: item.id })); }` to pre-render if static. (Optional advanced, can skip in plan, just know data is available.)
        - In the page component, find the item matching `params.id`. If not found, could throw 404.
    - [ ]  **Content Layout**:
        - Use `<article className="max-w-2xl mx-auto p-4">` or similar centered layout for reading.
        - Title: `<h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>`.
        - Perhaps category badge: `<Badge text={category} className="mb-4" />` to show category above or below title.
        - If author and date info available:
            - e.g., `<p className="text-sm text-gray-500 mb-6">By {author} on {date}</p>` (use static sample or skip if not known).
        - Content: For example, simulate with a few paragraphs:
            - If the original documentation has actual content, use that; otherwise, create placeholder text reminiscent of a guide or article (maybe two or three paragraphs describing the topic).
            - Use proper HTML tags: paragraphs `<p className="mb-4">...</p>`, maybe some subheadings `<h2 className="text-xl font-semibold mt-6 mb-2">Subtitle</h2>` if needed to simulate structure, and maybe a list `<ul className="list-disc ml-5 mb-4"><li>Point one...</li></ul>`.
            - Ensure text is readable (Tailwind's prose class from typography plugin could be used if configured; if not, manually style basics).
        - Related content: Optionally at bottom, show a "Related Articles" section:
            - Determine 2-3 related items (e.g., same category or random others) from knowledgeSamples.
            - Render smaller cards or just links for them. Could reuse KnowledgeCard in a mini form or just title links. For simplicity, add:

                ```jsx
                <div className="mt-8 pt-6 border-t">
                  <h2 className="text-xl font-semibold mb-4">Related Articles</h2><div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {relatedItems.map(item => (
                      <KnowledgeCard key={item.id} title={item.title} category={item.category} summary={item.summary} imageUrl={item.imageUrl} href={`/knowledge/${item.id}`} />
                    ))}
                  </div>
                </div>
                ```

                (If using KnowledgeCard, might want a smaller variant; but it's fine. Alternatively, just do links with titles for brevity.)

        - Navigation back: Provide a Back link or button to go back to Knowledge list:
            - At the top or bottom, a `<Link href="/knowledge" className="text-blue-600 hover:underline text-sm">&larr; Back to Knowledge</Link>` for easy navigation.
            - This is good UX to not strand user after reading.
    - [ ]  **No Storybook** needed for page.
    - [ ]  **Testing**:
        - Navigate to a knowledge detail URL, e.g., `/knowledge/habits-101`:
            - Check the title matches the sample clicked.
            - See the content paragraphs displayed.
            - Ensure the layout is centered nicely on larger screen and padded on mobile.
            - Click the back link, goes to listing page.
            - If images or subheadings exist, verify they render properly.
            - If "Related Articles" section is present, ensure it shows some cards/links. Click a related article card, it should navigate to that article.
            - Check that if an invalid ID is entered, Next likely shows default 404 (unless we implement notFound). Not necessary to implement custom 404 for this.
            - Confirm the page doesn't use any client components unnecessarily (should be pure render). The KnowledgeCard inside related might have been a client comp due to onClick usage; if so, ensure we didn't use onClick here, just href, so it can be treated as a link and be fine on server. If that is an issue, consider making KnowledgeCard a client comp always – but let's assume it's fine as server if onClick is undefined and we only use href with anchor. We might need to ensure KnowledgeCard does not have `'use client'` at top, since it can actually be a presentational component (only used onClick for story). We didn't explicitly mark it 'use client'; good, we can keep it server by not using useState or effect there. That should allow using it in server context. If any warnings, adjust accordingly.
            - Look over for any TS warnings (like possibly 'window is not defined' if we accidentally used something - likely not).
            - Check dark mode on this page too if implemented: toggling theme should invert colors if we applied classes (we might not have explicitly styled article for dark, but we could ensure background is automatically dark and text lighten if using tailwind's default `dark:` classes. Might not have done specifically, so content might remain dark text which on a dark bg would be bad. We should address theme toggling next.)

## 23. Build Resources Page (Resources section listing)

    - [ ]  **File**: Create `src/app/resources/page.tsx`.
    - [ ]  **Data**: Prepare sample resource items, similar structure to knowledge but focusing on different content:
        - e.g.,

            ```tsx
            const resourceSamples = [
              { id: 'atomic-habits', title: 'Atomic Habits', type: 'Book', description: 'Book by James Clear on building great habits.', imageUrl: 'https://...cover.jpg' },
              { id: 'notion', title: 'Notion', type: 'App', description: 'All-in-one productivity app for notes and tasks.', imageUrl: '/notion-logo.png' },
              { id: 'deep-work', title: 'Deep Work', type: 'Book', description: 'Book by Cal Newport about focused success.', imageUrl: 'https://...cover2.jpg' },
              // ...
            ];
            const resourceCategories = ['all', 'Book', 'App', 'Podcast']; // or derive from samples
            ```

    - [ ]  **Layout**: Likely mirror Knowledge page:
        - Sidebar with categories (types) if on desktop, horizontal CategoryNav on mobile. Use `CategoryNav` but with resourceCategories.
        - SearchBar to filter resources by name/description.
        - ResourceGrid to display items.
        - Manage state for selectedCategory (type) and search query similar to knowledge.
            - selectedCategory initial 'all'; searchQuery ''.
            - filteredItems = resourceSamples.filter by type and search text.
        - Use ResourceCard in the grid. We need to build ResourceCard next (did out of order; we'll do soon and come back). Alternatively, if ResourceCard and KnowledgeCard are similar, we might reuse one card component and just adjust content via props. But we made separate tasks, so implement ResourceCard similarly.
        - Possibly sort functionality: the prompt mentioned sorting for resources in Zustand in the summary, but not explicitly in this task scope. Could include a sort dropdown (like sort by name or date). If doing so:
            - Add a small Select or button group for sort above grid. But since not explicitly requested and to keep tasks manageable, we skip detailed sort implementation. We can mention it in notes or leave as a potential improvement.
        - Everything else similar: listing page showing multiple resource items.
    - [ ]  **Testing**:
        - Go to `/resources`: ensure categories (All/Book/App/Podcast etc.) appear in sidebar and mobile as intended.
        - Check filtering by category and search both work on the sample data.
        - Grid shows ResourceCard items with maybe images or icons.
        - If a resource is an external link, consider how to handle: Are we linking to detail page or directly out? Possibly both: maybe we have detail pages for writing a bit about why the resource is recommended, plus a link out.
        - But likely, treat similar to knowledge: detail page with more info. We'll implement one.
        - For now, ensure clicking a ResourceCard navigates to /resources/[id] (we will implement if needed). If not implementing detail, maybe set ResourceCard to open a new tab to actual resource link. But we’ll implement detail for consistency.

## 24. Build ResourceCard Organism (`src/components/organisms/ResourceCard.tsx`)

    - [ ]  **Component Setup**: Create `ResourceCard.tsx`.
    - [ ]  **Props Interface** `ResourceCardProps`:
        - `title: string`.
        - `description: string`.
        - `type: string` (e.g., "Book", "App", "Podcast", "Video", etc.).
        - `imageUrl?: string` (could be cover image or logo).
        - `href?: string` (link to detail page or external site).
        - `onClick?: () => void` (for storybook or if used as clickable).
    - [ ]  **Implementation**:
        - Similar structure to KnowledgeCard: container with border, shadow, etc.
        - Possibly differentiate style slightly by type: e.g., you might color-code by type or use an icon. But not required. We can use Badge for type as well (like "Book", "App").
        - Include image or logo if provided:
            - If type is "App" and image is a logo (likely square or icon), maybe define a fixed small image size or if we have an icon, use that. For simplicity, treat `imageUrl` generically: if present, display like KnowledgeCard.
            - If no image (maybe for a podcast if we don't have one), we could show a default icon based on type, but skip for now.
        - Content:
            - Type badge: `<Badge text={type} className="mb-2" />` (maybe variant based on type if we want different colors, or all same style).
            - Title: `<h3 className="text-base font-semibold mb-1">{title}</h3>` (maybe slightly smaller than knowledge if needed, but similar is fine).
            - Description: `<p className="text-sm text-gray-600 line-clamp-3">{description}</p>`.
        - Container, hover effect same as KnowledgeCard.
        - If `href` given (which for internal detail might be `/resources/[id]`, or external link), handle accordingly:
            - If external (e.g., maybe we pass `href` as a full URL starting with http), then use `<a href={href} target="_blank" rel="noopener noreferrer">` around content.
            - If internal (like detail page link), use Next `<Link href={href}>`. Possibly we can detect by href starting with "/" or add another prop like `external?: boolean` (not strictly needed).
            - Or always treat as internal for now, linking to detail page. On that detail page we can give actual external link.
        - onClick usage similar to KnowledgeCard for story.
    - [ ]  **Storybook** (`ResourceCard.stories.tsx`):
        - "Book Resource": e.g., `<ResourceCard title="Atomic Habits" type="Book" description="Bestselling book by James Clear about building habits." imageUrl="cover_url.jpg" />`.
        - "App Resource": `<ResourceCard title="Notion" type="App" description="All-in-one productivity tool." imageUrl="notion_logo.png" />`.
        - "Without Image": `<ResourceCard title="The Life Coach Podcast" type="Podcast" description="Podcast on personal development by Jane Doe." />`.
        - If possible, include one with an external link example (maybe not needed to show visual difference, since looks same).
        - Controls: none in particular beyond maybe toggling image on/off.
        - Actions: `onClick` to log.
        - Ensure to note that if linking externally, it opens new tab (maybe not demonstrable in story though).
    - [ ]  **Testing**: In Storybook, verify ResourceCard appears. Check that Book card shows an image (if we provided a real image URL; if not, maybe use a placeholder image of a book cover). App card's image (logo) might be smaller or have whitespace; ensure object-cover or containment appropriately. If needed, style differently: e.g., if logo is transparent PNG, maybe white background of card is fine.
        - Hover effect working.
        - Titles and descriptions truncated properly.
        - If we wanted to differentiate type by color, check badge shows type text. We didn't explicitly set variant by type (could do mapping: Book-success, App-info, etc.), but it's okay if all primary.
        - Click logs action instead of navigating.

## 25. Build ResourceGrid Organism (`src/components/organisms/ResourceGrid.tsx`)

    - [ ]  **Component Setup**: Create `ResourceGrid.tsx`.
    - [ ]  **Props**: `items: ResourceCardProps[]`.
    - [ ]  **Implementation**: Same pattern as KnowledgeGrid: grid container with responsive columns, mapping to `<ResourceCard ...>` for each item. Include empty state message if none. Use similar classes (`grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`).
    - [ ]  **Storybook** (`ResourceGrid.stories.tsx`):
        - Use the sample resource items array.
        - "Default": list of a few resources.
        - "Empty": no items.
        - Possibly a control to adjust number of items as with KnowledgeGrid.
        - Actions come from ResourceCard's onClick if set in sample.
    - [ ]  **Testing**: Check Storybook grid layout and empty state.

## 26. Build Resource Detail Page (Resource entry) – if applicable

    - [ ]  **File**: Create `src/app/resources/[id]/page.tsx`.
    - [ ]  **Data**: Use `resourceSamples` to find the item by id (similar approach as knowledge).
    - [ ]  **Layout**:
        - Use `<article>` with content about the resource:
            - Title as `<h1>` similar to knowledge.
            - Type badge or label: e.g., "Book" or "App".
            - Description (full). Possibly extend beyond the short description: if the sample had more info, use it. If not, just use description as main content.
            - If it's a book, could list author, publisher; if it's an app, maybe platform, etc. But we lack that detail. We can at least include an external link:
                - E.g., if we know the website or Amazon link for the resource, include a button or link "Learn more / Get this".
                - For "Atomic Habits", link to its Amazon or official page; for "Notion", link to notion.so. If we don't have actual links, just stub `href="#"` or text.
                - Something like: `<a href="https://example.com" target="_blank" className="mt-4 inline-block text-blue-600 hover:underline">Visit Official Page &rarr;</a>`.
            - If image is available (book cover), show a larger image at top or side. E.g., display a cover image on left and text on right for desktop. That would be more design: we can simply put an image at top:`<img src={imageUrl} alt={title} className="mb-4 max-h-64 object-contain" />`.
            - Possibly use a definition list for details: e.g.,

                ```jsx
                <dl className="mb-4">
                  <dt className="font-semibold">Type:</dt><dd className="ml-2 inline">{type}</dd><br/><dt className="font-semibold">Category:</dt><dd className="ml-2 inline">{category if we had or reuse type}</dd>
                </dl>
                ```

                But if type is basically category, skip. If we had additional fields like "Author" for books, list it. We can add a dummy "Author" field to our sample for book: e.g., resourceSamples for 'atomic-habits' include author. If we do, show that.

        - Provide a back link `<Link href="/resources">← Back to Resources</Link>` at top or bottom.
        - Possibly "Related Resources" similar to knowledge related section or leave it. If we have multiple books and apps, we can show related by type. For brevity, maybe skip or do one if easy (like recommend one other of same type).
    - [ ]  **Testing**:
        - Visit a resource detail page (like `/resources/atomic-habits`): see that title, description, and external link are present.
        - Click the external link, verify it opens a new tab (and not blocked by any issues).
        - Check design on mobile vs desktop.
        - Ensure Back to Resources works.
        - If an image is present, verify it loads.
        - If content is short (like just description), page might be sparse; maybe add some dummy extended text if needed to mimic a bit of commentary on the resource.
        - Confirm no errors.

## 37. Build Home Page (Landing page)

    - [ ]  **File**: `src/app/page.tsx` (root index page).
    - [ ]  **Design**: As a public marketing/intro page to WYOS.
        - Hero Section:
            - Big bold tagline, e.g.:

                ```jsx
                <section className="text-center py-16 px-4 bg-white">
                  <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Writing Your Own Story</h1><p className="text-lg text-gray-700 max-w-xl mx-auto mb-6">
                    A platform for personal growth, knowledge sharing, and community building.
                  </p><Link href="/knowledge">
                    <Button size="lg" variant="primary">Explore Knowledge Base</Button>
                  </Link>
                </section>
                ```

                (We use a Button atom for call-to-action. Alternatively, if user not logged, maybe "Get Started" -> /signup. If logged in, maybe "Go to Dashboard" or similar. We can just always show explore knowledge as a general CTA.)

            - Possibly add a hero image or illustration: e.g., an image on the right of text if design desired:
                - Could use a generic illustration (like an undraw.co SVG) or an Unsplash image behind the text with overlay. If none provided, skip heavy design.
        - Features/Sections Overview:
            - A section highlighting the three main sections: Knowledge, Resources, Community.
            - Layout as 3 columns or rows with icon + heading + description:

                ```jsx
                <section className="py-12 px-4">
                  <div className="max-w-5xl mx-auto text-center mb-8">
                    <h2 className="text-2xl font-bold">What is WYOS?</h2>
                    <p className="text-gray-600">Your one-stop platform to learn, find useful resources, and connect with others.</p>
                  </div><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="p-4 border rounded">
                      <BookOpenIcon className="w-8 h-8 text-blue-600 mb-2" />
                      <h3 className="font-semibold text-lg">Knowledge</h3>
                      <p className="text-sm text-gray-600">Browse articles and insights to help you grow.</p>
                    </div>
                    <div className="p-4 border rounded">
                      <LibraryIcon className="w-8 h-8 text-green-600 mb-2" />
                      <h3 className="font-semibold text-lg">Resources</h3>
                      <p className="text-sm text-gray-600">Discover books, apps, and tools recommended for you.</p>
                    </div>
                    <div className="p-4 border rounded">
                      <UsersIcon className="w-8 h-8 text-purple-600 mb-2" />
                      <h3 className="font-semibold text-lg">Community</h3>
                      <p className="text-sm text-gray-600">Join discussions and share your journey with others.</p>
                    </div>
                  </div>
                </section>
                ```

                (Using some heroicons or lucide icons for illustration. These icons need to be imported from an icon library we've set up, e.g., lucide-react's BookOpen, Library (for resources maybe use a stack of books icon), Users. Adjust icon names as needed if using a specific set.)

            - Each column could link to the section (wrap in Link to /knowledge etc., making the whole div clickable or add a button "Go to ..."). But can also rely on navbar. Could at least do `<Link href="/knowledge"><a className="text-blue-600 hover:underline text-sm">Explore Knowledge &rarr;</a></Link>` under each description.
        - (Optional) Testimonials or Motivational Quote: if WYOS had some, could add a section. But not mentioned, skip.
        - Final call-to-action: Maybe one more sign-up prompt if user not logged in. If we want dynamic: check `useAuthStore` for user, if not logged, show "Sign up now, it's free!" button. If logged, show "Go to Knowledge" or something. As this is static page and we can use 'use client' if needed, but might keep it simple (just one CTA as above).
    - [ ]  **Testing**:
        - Visit home `/`: verify hero text is there and properly styled.
        - Check responsive: on mobile, text should still be centered and button accessible. The features grid should stack to one per row on small screens (we used sm: and lg: classes to do 1,2,3 columns presumably).
        - Click the Explore Knowledge button: goes to /knowledge.
        - If sign-up prompt included (not explicitly, but if we did), clicking it goes to /signup.
        - Check icons load (if using external or ensure we have them from icon library). Possibly need to install heroicons or lucide? We mentioned lucide earlier but didn't explicitly install. We might want to quickly mention adding an icon library earlier: e.g., `npm install lucide-react` and then use `<IconName />`. We used some in code above. Let's adjust:*If not done, include as needed:*
            - At the top-level, we should have installed an icon library. Insert a subtask in environment steps (maybe after Tailwind):
                - "Install **Lucide icons** library: `npm install lucide-react`, and import icons as needed (e.g., `import { BookOpen, Library, Users } from 'lucide-react'`). These will be used for illustrative icons."We can assume that was done as part of ShadCN (they often use Lucide in their components too).
        - Check that Footer appears on home (we put it in layout, so yes should appear).
        - All looks consistent with design style.

## 28. Integrate Theme Toggle (Dark Mode Support)

    - [ ]  **Tailwind Dark Mode**: Ensure `darkMode: 'class'` is set in tailwind.config if using class strategy (ShadCN uses class by default). Confirm this from step 2 (if not, set it).
    - [ ]  **Applying Theme**: In `_app` or rather layout, we need to apply the stored theme from Zustand:
        - Create a small client component `ThemeProvider` or just handle in Navbar (since it's always present):
            - In Navbar, we added a toggle button that calls `toggleTheme`. But to actually apply the theme, add an effect:

                ```tsx
                useEffect(() => {
                  const theme = useUIStore.getState().theme;
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                  else document.documentElement.classList.remove('dark');
                }, [useUIStore((s) => s.theme)]);
                ```

                (But can't call store in useEffect dependency directly like that without separate variables due to hooks rules; better:`const theme = useUIStore(state => state.theme); useEffect(() => { ... }, [theme]);`)This will toggle the 'dark' class on <html>.

            - Alternatively, do this in a separate `ThemeWatcher` component included in layout (to decouple from Navbar). But Navbar is fine for now since it's on every page.
        - Ensure initial theme is respected: If we want to start in dark mode via user preference or something, possibly check localStorage in UI store initialization. Could skip.
    - [ ]  **Dark Styles**: Audit components for dark mode readiness:
        - With 'dark' class on html, any Tailwind class with `dark:` prefix will apply. We should add dark: variants where needed for good contrast:
            - E.g., background colors become darker, text becomes lighter.
            - Possibly update base styles:
                - `bg-white` on cards and modals should have `dark:bg-gray-800`.
                - `text-gray-900` -> `dark:text-gray-100`.
                - `border-gray-200` -> `dark:border-gray-700`.
                - For example, Navbar: currently white background, maybe add `dark:bg-gray-900 dark:text-gray-100`.
                - Buttons: ensure variants in dark mode: if primary is blue-600 text-white, that might still be fine on dark; if secondary is gray-100 text-gray-800, on dark that should switch to maybe gray-800 background and gray-100 text. We can add conditional dark classes in the variant logic. For brevity, maybe skip adding many explicitly and rely on base elements: but better to adjust some for contrast: e.g., add in Button classes: `dark:bg-gray-800 dark:text-gray-100` for secondary variant, etc.
                - Content text: might remain black by default, which on dark background (if we turned body bg dark) is bad. If we left body bg white always, then dark toggle might not currently flip main content background because we didn't set one. We should define background for dark: e.g., in global CSS or layout:`className={theme === 'dark' ? 'dark' : ''}` on body, and Tailwind default if `dark:` classes are used.Perhaps easiest: set `<body className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">` in layout.That ensures overall background and text color flips.
        - Add these classes to layout or global CSS:

            ```jsx
            <body className={`${interFont.variable} bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
            ```

            (assuming interFont from Next template or such; main point is bg and text).

        - Update critical components:
            - Navbar: add dark styles (like dark:bg-gray-800, dark:border-b if a border).
            - Footer: dark mode (maybe dark:bg-gray-800 dark:text-gray-400).
            - Cards: add `dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100`. Also adjust hover shadow color if necessary (shadows fine).
            - CategoryNav/Buttons: ensure the selected state colors are appropriate in dark (maybe use same but if using bright blue on dark background might be fine).
            - Inputs: they likely are white bg by default; on dark, we should add `dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:border-blue-500`. Tailwind forms plugin might automatically style some things, but let's assume we do manually.
            - Possibly easier: incorporate Tailwind's `dark:` variants where obvious. If not exhaustive due to time, at least main containers and text.
    - [ ]  **Storybook**: Test components in dark mode: Storybook has a "dark mode" addon or we can manually add `class="dark"` to preview body. E.g., add a global decorator that wraps stories in a `<div className="dark bg-gray-900 p-4">` to simulate. This might be advanced; manual check might suffice.
    - [ ]  **Testing**:
        - In the running app, click the theme toggle in Navbar:
            - Verify the `<html>` or `<body>` class changes to 'dark'.
            - The UI colors should all shift: background becomes dark, text light, etc. Check pages like Knowledge list: background likely dark (we set body dark), the cards had white background but we added dark:bg-gray-800 so they should become dark gray. Text on them should become light (we set dark:text on main body, which might cascade, but inside card we had explicit text-gray-900 which won't change unless we added dark variant). We should add in KnowledgeCard title class: `dark:text-gray-100`, summary `dark:text-gray-400`, etc. Or rely on body text-gray-200 global which would affect normal text not explicitly colored. But since we did text-gray-900 on title, that won't automatically invert. We should catch these: better remove fixed colors on text in components and rely on generic text color (so that body class can handle it). Or add corresponding dark classes. Suppose we add: title `text-gray-900 dark:text-gray-100`, summary `text-gray-600 dark:text-gray-400`. Do similarly in ResourceCard. Label text-gray-700 -> dark:text-gray-300. etc.
            - Adjust as needed (subtasks not enumerated individually, but implied by "audit components for dark mode").
        - After adjustments, test again: In dark mode, verify:
            - Navbar goes dark (maybe black/gray) and links possibly become lighter.
            - Pages backgrounds dark.
            - Text is readable (light text on dark backgrounds).
            - Buttons: primary (blue) on dark might look fine, secondary (gray bg) on dark might need inversion (if we didn't, it might be nearly same color as background, not visible). Possibly ensure secondary button has distinct styling in dark (like dark:bg-gray-700 with dark:text-gray-100).
            - Inputs: likely white by default; in dark, they should be dark gray background with light text. If not, add in TextInput: e.g., `dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400`.
            - Scrollbars, etc., not critical.
        - Once all main UI elements look okay in both light/dark, we consider theme toggle done.

## 29. Finalize Storybook Documentation

    - Go through each component’s story to ensure it captures all important **states**:
        - Buttons: did variants, loading, disabled.
        - Inputs: focus state perhaps not explicitly shown, but we can manually focus in canvas to see ring, which is fine.
        - Checkbox/Toggle: checked/unchecked, disabled states.
        - Complex components (Navbar, etc.): because they rely on global context, ensure the stories adequately simulate those contexts (we provided props for auth state).
        - Perhaps add **Storybook controls** more where useful to interact: e.g., for Navbar story, a control "Logged In" boolean that toggles between showing login vs user. (We can implement this by making Navbar story component use that boolean to pass either userName or not, etc.)
        - Ensure **Storybook actions** are attached to interactive props: We did for onClick, onChange etc. Verify they all log appropriately in Storybook.
    - [ ]  Add descriptions or comments in stories: using `/** Markdown description */` in default export or Storybook's `parameters: { docs: { description: { story: "..." }}}`. This can help users understand usage. For brevity, maybe ensure at least some notes.
        - e.g., in Button.stories.tsx default export:

            ```tsx
            export default {
              title: 'Atoms/Button',
              component: Button,
              parameters: { docs: { description: { component: 'A reusable button component following WYOS styling guidelines. Supports multiple variants and states.' } } }
            };
            ```

        - Not required but nice.
    - [ ]  Run Storybook and visually review each component: adjust any styling inconsistencies.
        - E.g., maybe we see that our label or error spacing is off, then tweak the FormField styles. Or card text cut off too much or not enough, adjust `line-clamp` values or container height if needed.
        - Also verify that all text in stories is visible on default (light theme in Storybook). If Storybook is in light by default, fine. If we want to document dark mode, we could create separate stories like "Dark" by adding a decorator that wraps component in a dark background. Possibly skip unless needed.
    - [ ]  **Consistency**: Ensure naming consistency in stories and components:
        - The story titles should have the same naming scheme (Atoms/.., Molecules/.., etc.).
        - The components themselves follow file name convention (we used PascalCase for component file and names which is fine).
        - Check that no story or component still uses any placeholder or TODO names from the Next.js starter (like if we forgot to remove default Home content in page, etc.).
    - [ ]  Remove any Storybook warnings (like keys in lists, deprecated props, etc.).
    - [ ]  Check that **sample data** used in stories are realistic and not referencing unknown content. If possible, use some actual WYOS content if known (the prompt said from documentation or best guess—our best guess content is fine).

## 30. Code Quality & Standards Audit

    - Run `npm run lint` (ESLint) and fix any issues flagged:
        - Ensure no unused variables/imports.
        - Ensure no `any` usage (search the codebase for `: any` or implicit any warnings). Replace with proper types or generics if found.
        - Check for proper **SOLID** adherence:
            - Single Responsibility: Are any components doing too much? (Navbar is complex but logically grouped; could be okay. If too complex, maybe we'd factor out sub-components like UserMenu, but we gave tasks that are manageable. It's okay at this stage.)
            - Open/Closed: Components accept props for variations rather than needing modification for new needs (we did that with variants, etc.).
            - Liskov: Not directly applicable, but our components should be replaceable by their interface (we don't have inheritance, so it's fine).
            - Interface Segregation: We didn't make mega interfaces; each component has its own. We segregated Auth vs UI state in separate stores. Good.
            - Dependency Inversion: We are injecting dependencies via props (like onSelect callback) instead of hardcoding logic in components (like CategoryNav doesn't know how filtering is done, just calls back). That is good.
    - [ ]  Format the code (if Prettier is set up, run it or ensure indentation is consistent).
    - [ ]  Check file naming consistency: all components and their story files named consistently (Button.tsx & Button.stories.tsx, etc.).
    - [ ]  **Naming conventions**:
        - Check if anything deviates from WYOS naming guidelines (if any were provided, apply them; since not explicit, ensure clarity and consistency):
        - E.g., function names for actions: in store we did `login` `logout` (which is fine). Perhaps WYOS might want specific prefix like `handleX` for handlers, but likely okay.
        - Ensure CSS classes or IDs if any follow any specific pattern (we didn't use BEM or such, mainly Tailwind, so fine).
        - Ensure no magical constants or unclear names.
    - [ ]  All components and pages should be clearly separated by concern: e.g., no direct data fetching in presentational components (we didn't do any real data fetch, only in pages we did sample data usage).
    - [ ]  Remove any debug code or comments that shouldn't go to production (like `console.log` we might have used in testing toggles etc., ensure they're gone).

## 31. Comprehensive UI Testing

    - Start the app and click through all user flows:
        - **Navigation**: Use the Navbar to go to Knowledge, Resources, Community:
            - Knowledge: verify listing, filtering, and that clicking an article leads to detail.
            - On detail, try related links or back.
            - Resources: similar testing.
            - Community: If we didn't create a custom community page, presumably the Navbar community link goes to an external forum or a placeholder. If it's external (e.g., community.writingyourownstory.com), ensure `target="_blank"` on that link in Navbar to not break SPA flow (if desired). If we did a /community page, check it.
        - **Auth**:
            - Click Login in navbar: see login form, try incorrect login (maybe we show an error if we coded any). Then correct (any non-empty perhaps) -> login, which in our code sets store and possibly could redirect. We didn't explicitly implement redirect after login; we could consider adding in login page after login success: `router.push('/')` or so. If not, test if Navbar now shows user avatar (because store updated and Navbar is a client comp reading it). That should happen instantly since same app session. Check that.
            - Try logout via avatar menu, ensure it clears store and Navbar goes back to Login/Sign Up.
            - Sign Up: test validation (mismatched passwords etc if implemented rudimentarily). On "successful" sign up, we either logged user in or not. If we did auto login, then Navbar should show user. If not, maybe we just `router.push('/login')` with a flash message (we didn't do flash message, skip).
        - **Dark Mode**: Toggle theme at various points: on home, on listing page, on detail page, etc. Ensure UI toggles seamlessly. Check form fields, cards, text in dark.
        - **Responsive**: Manually resize window or use device emulator:
            - Small mobile: Check that Navbar switches to hamburger, and that clicking it shows menu with links and login or user. Try using that menu to navigate.
            - CategoryNav on knowledge/resources should appear as horizontal on mobile and function.
            - Content like detail pages reflow to one column fine (the related cards grid will go 1 column on mobile due to tailwind classes).
            - The feature section on Home goes single column.
            - Ensure padding/margins are not excessive on small screens (maybe adjust if something like hero text is cut off).
        - **Accessibility**:
            - Use keyboard only: Tab through Navbar (should go to Skip to main content if we add (we didn't, small improvement could be skip link), then to nav links, then login button or avatar, etc.). Ensure focus ring visible (Tailwind default or our custom focus:ring on buttons should show).
            - Tab into Knowledge page: first element likely the category or search. Should be able to operate category filters via keyboard (arrow or tab to each button and space). Search typing works.
            - Screen reader check (if possible, or at least inspect for semantic correctness): Navbar uses <nav>, links have labels, we used appropriate roles (aria-current on active, etc.). The knowledge page uses an <aside> for categories (good), <main> implicitly for content (we didn't explicitly mark main region except maybe the flex container; we might wrap the main content div in `<main>` since it's main content of page, and sidebar outside main. Actually yes, modify page structure:

                ```jsx
                <div className="flex">
                  <aside>...</aside><main className="flex-1"> ... </main>
                </div>
                ```

                This way semantics are clear. Do similarly for resources.

            - Form labels: each input has a label with htmlFor matching id (we enforced via FormField usage). Check in dev tools on login form that label and input are linked, and any error message has appropriate aria (we set aria-invalid on input and could also use aria-describedby linking to error id for completeness, not done but acceptable).
            - Color contrast: verify using an online tool or eyeballing that e.g., gray text on gray backgrounds in dark mode isn't too low. We used decent contrast combos, should be okay (e.g., text-gray-400 on dark-gray-800 is borderline but hopefully >4.5:1, might be around that. If not, bump up to gray-300 for text or lighten background).
        - **Performance**: not a big concern for plan, but ensure no obvious slow operations in console.
    - [ ]  Fix any issues discovered in above testing (if any styling or logic issue popped up).

## 32. Project Handoff Preparation

    - Write or update the README.md to include:
        - How to run the project (Next.js dev, Storybook).
        - Outline of tech stack (Next.js, Tailwind, ShadCN, Zustand, Storybook, etc.).
        - A summary of the architecture (Atomic design structure, what each store does, etc.).
        - Any remaining TODOs (like "Integrate actual Appwrite API calls in Knowledge/Resources pages" or "Implement SSO for Community").
        - Ensure to mention coding standards followed and where to find component docs (Storybook).
    - [ ]  Ensure Storybook is listed as a dev dependency and perhaps add a npm script "storybook".
    - [ ]  Consider adding basic tests (not explicitly asked, skip due to scope).
    - [ ]  Clean commit history if needed (squash irrelevant commits if using version control, optional step).

## 33. Celebrate Completion 🎉

    – The WYOS frontend is now fully built as per specifications, with every component documented in Storybook and structured in small, clear tasks ready for an AI agent or any developer to implement step-by-step. Each task above represents a focused 1-point story, ensuring a smooth, maintainable development process.
