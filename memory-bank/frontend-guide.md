# WYOS Frontend Step-by-Step Guide

Writing Your Own Story (WYOS) is a premium, dark-mode web app that combines **curated knowledge, vetted resources, and an authentic community**. We will rebuild the entire WYOS frontend from scratch using **atomic design principles** – starting with basic UI atoms, composing them into molecules and organisms, and finally assembling full pages. Throughout, we’ll ensure the design reflects WYOS’s modern aesthetic (inspired by Resend’s clean dark theme) with glassmorphic panels and smooth, Apple-like animations for an immersive feel. Every component will be documented in Storybook for easy testing and development.

## 1. Atomic Components (Foundational UI Elements)

Atomic components are the **basic building blocks** of the interface. We’ll create a library of reusable atoms – e.g. buttons, inputs, cards – each styled for dark mode and built with Tailwind CSS utility classes. These atoms will be accessible and versatile, accepting props for different variations and states. We will also integrate subtle animations using **Motion** (motion/react) and ensure global state (e.g. theme or loading flags) can hook in via **Zustand** where appropriate.

### 1.1 Setting Up the Design System

- **Tailwind Dark Mode:** Configure Tailwind for dark mode by default (e.g. using `dark:` classes or a `.dark` class on `<html>`). Use a near-black background (#121212 as recommended by Google) rather than pure black for better contrast and eye comfort. Define a palette of grays and accent colors (leveraging Radix UI Colors for consistency, as Resend did) to ensure sufficient contrast and an attractive, **low-eye-strain** color scheme. For example, use `slate-900` or `zinc-950` for backgrounds and lighter grays for surfaces, with a vibrant accent (e.g. shade of blue) for highlights. [wedoflow.com](https://www.wedoflow.com/post/dark-mode-web-design-enhancing-ux-and-aesthetics#:~:text=including%20both%20for%20light%20mode,and%20dark%20mode%20design) | [resend.com](https://resend.com/blog/introducing-light-mode#:~:text=in%20various%20conditions%2C%20we%20believe,and%20inclusive%20experience%20for%20everyone) | [resend.com](https://resend.com/blog/introducing-light-mode#:~:text=Powered%20by%20Radix%20Colors%20and,light%20mode%20into%20our%20product)
- **Glassmorphism Effects:** Implement a global CSS utility or Tailwind class for the “frosted glass” look. This typically means a semi-transparent background and a backdrop blur. For instance, define a class like `.glass` = `bg-white/5 backdrop-blur-md border border-white/10 rounded-lg`. This creates a translucent panel where background elements are visible but blurred, adding depth to the UI. We’ll apply this class to cards, modals, and nav bars to achieve the **premium glassmorphic** feel that Apple’s design language exemplifies. Keep the effect subtle to avoid reducing readability (ensure text on glass has good contrast, e.g. by slightly increasing opacity of the background in very dark sections). [nngroup.com](https://www.nngroup.com/articles/glassmorphism/#:~:text=elements%2C%20mimicking%20frosted%20glass) | [nngroup.com](https://www.nngroup.com/articles/glassmorphism/#:~:text=Glassmorphism%20is%20a%20visual,significant%20accessibility%20and%20usability%20challenges) | [nngroup.com](https://www.nngroup.com/articles/glassmorphism/#:~:text=%3E%20Glassmorphism%20is%20a%20visual,background%20elements%2C%20mimicking%20frosted%20glass)
- **Motion Setup:** Include the `motion` components from **Motion** (`motion/react` which is already in the tech stack). We’ll use `motion.div` or `motion.button` for atoms where we want animation. Define a standard **easing and duration** for WYOS (e.g. a spring transition or ease-out cubic for smoothness) to apply consistently. For example, a spring with damping for a gentle bounce on modals (mimicking Apple’s fluid animations) or an `whileHover={{ scale: 1.02 }}` effect on interactive cards.
- **Zustand Global State:** Set up a basic Zustand store for global UI state. For instance, a `useThemeStore` for theme mode (if a future light mode is planned) and a `useUIStore` for any global toggles (like a mobile menu open state). Zustand is already used for authentication state, and we can reuse it to share state if needed (e.g. whether a loading spinner overlay is shown, or the list of user’s bookmarked items). For atomic components, direct Zustand integration is minimal – they should mostly rely on props – but it’s good to have the store ready for when we connect user and app state later (e.g. the Button might read a global `loading` flag for form submissions). Ensure to configure Zustand with `persist` and `immer` middleware for reliable state management (as in WYOS’s setup).

### 1.2 Button Atom

The Button component will be used everywhere, from form submissions to interactive actions (like “Bookmark” or “Subscribe”). We design it to be highly configurable:

- **Props and Variants:** Define a `Button` component accepting props like `variant` (e.g. `"primary" | "secondary" | "ghost"`), `size` (`"sm" | "md" | "lg"`), `disabled`, and `loading`. This allows using the same component for a **primary call-to-action button**, a subtle secondary button, or icon-only ghost buttons (for minimal UI icons like a star). For example, a primary button might be a filled style with accent background, while a “ghost” variant could be a transparent background with an icon (useful for nav icons or the bookmark button). Use TypeScript to define these prop types for clarity and autocomplete.
- **Tailwind Styling:** Use Tailwind classes for a consistent look. Start with base styles: e.g. `px-4 py-2 font-medium rounded transition-all duration-200 focus:outline-none`. For dark mode, a primary button might use `bg-indigo-600 text-white hover:bg-indigo-500` (assuming indigo as an accent) or a gradient background (to add a premium touch). Secondary could be `bg-white/10 text-gray-100 hover:bg-white/20` for a subdued look on dark backgrounds. Ensure disabled state is distinct (e.g. `opacity-50 cursor-not-allowed`). **Motion**: wrap the button in a `motion.button` and apply `whileHover={{ scale: 1.03 }}` and `whileTap={{ scale: 0.97 }}` for a subtle tactile response. These micro-interactions make the UI feel responsive and high-quality.
- **Loading & Icons:** If `loading={true}`, show a spinner or loading indicator instead of the button label. You can create a small `Spinner` atom (using a CSS border animation or an SVG) to embed inside buttons or other components. Also allow an `icon` prop or the inclusion of icon children – e.g. using **Lucide React** icons (already in dependencies). For instance, a bookmark button might be `<Button variant="ghost"><StarIcon className="..."/></Button>`.
- **Storybook Docs:** Create `Button.stories.tsx` to document all states. Provide controls for the label text, variant, disabled toggle, and loading toggle. Include multiple stories: e.g. “Primary Button”, “Secondary Button”, “Ghost Icon Button” (with a star icon for bookmarking). Use Storybook’s **Interactions** or Actions to log clicks – for example, attach an `onClick` that uses Storybook’s `action()` to verify the button works. Also, use Storybook’s **pseudo-states** (addon or manually) to demonstrate hover and active styles if needed. This ensures we visually verify the button’s look in all scenarios (hover, focus, disabled, etc.).

### 1.3 Input Atom

The Input atom will handle text entry (used in forms like login, comments, search bars, etc.). We will create both a basic **TextInput** and perhaps variants for Textarea or Password input as needed, but focusing on a single Input component first:

- **Props:** Define props such as `type` (text, email, password, etc.), `placeholder`, `value` and `onChange` handler (to control it either as controlled or uncontrolled). Optionally include a `label` and `error` message prop to display validation state (or these can be separate Label/Error atoms combined in a molecule form group – see below). Keep it flexible to work with React Hook Form or any form library – the component itself can just forward ref if needed.
- **Tailwind Styles:** Since WYOS is dark-themed, style inputs with a dark form aesthetic. For example: `bg-white/5 text-gray-100 placeholder-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`. This gives a slight translucent dark field with a glowing indigo ring on focus (accenting the field, in line with the overall color scheme). Ensure the text is easily readable on the dark background (use a light gray or white text). Add `disabled:opacity-50` and styles for error state (e.g. if `error` prop is passed, apply `border border-red-500` or a red ring). Also consider an **icon inside input** (like a search icon or show/hide password eye) by allowing an `icon` element via props or composing an InputGroup molecule.
- **Motion Enhancements:** For inputs, we keep animations minimal to avoid distracting the typing experience. However, we can animate the label (floating label effect) or error message fade in. If using floating labels, a small `motion.label` can slide up or shrink when the field is focused or not empty. Alternatively, simply fade in error text with `motion.div` when an error appears.
- **Storybook Docs:** Create `Input.stories.tsx` to showcase the input in different modes. Use Storybook controls to toggle `error` text (display a sample error like “Required field”), change the `type` (to show password vs text styling), and show with/without an icon (if we implement icons). Include stories such as “Default (empty)”, “Filled (with text)”, “Error state”, and possibly a “Password Input” variant. This ensures the visual design is correct for all states (focus, error, disabled, etc.). You might simulate typing by controlling the `value` prop via Storybook controls.

### 1.4 Card Atom

The Card is a versatile container for grouping content. In WYOS, many sections use card-like layouts (knowledge summary cards, resource items, forum post previews, etc., are essentially specialized cards). We create a generic Card atom as a styled `<div>` or section:

- **Style:** Leverage the **glassmorphism** class defined earlier. For instance, `className="glass p-4 shadow-md"` could be a base – giving a translucent dark background, a slight border, padding, and maybe a soft drop-shadow to lift it from the background. The card should have a **rounded** shape (e.g. `rounded-xl` for smooth corners, aligning with a modern, friendly feel). Since this is dark mode, a subtle shadow (e.g. `shadow-black/50`) can add depth without looking out of place. We might add a mild **hover effect** for interactive cards: e.g. `hover:bg-white/10` to make it a bit brighter when hovered or `hover:shadow-lg`.
- **Content Flexibility:** The Card should accept children elements to display inside. It can also accept a `className` prop to allow custom sizing or additional styling (we’ll merge it with tailwind-merge since ShadcN uses that for safe class overrides). If some cards are interactive (clickable as a whole), we might allow a prop `as="button/link"` or simply handle that at molecule level by wrapping a Card in a link.
- **Motion:** Animate cards on mount and hover. For example, when a card first appears (like when new knowledge items load in infinite scroll), use `motion.div` with an initial fade-in + slight upward movement, giving a pleasing entrance animation. On hover, we could slightly raise it (`whileHover={{ y: -2 }}`) or increase shadow, indicating it’s interactable. Keep it subtle to maintain a professional feel.
- **Storybook Docs:** `Card.stories.tsx` can show a blank card vs. card with content. For demonstration, create a story with a Card containing some dummy text and one containing other atoms (like a heading and paragraph) to mimic real usage. Show how it looks in isolation with and without the glass effect. You can also toggle a prop for “interactive” to demonstrate the hover styles. This ensures our Card design works as a foundation for more complex components.

### 1.5 Other Atoms and Utilities

In addition to Button, Input, and Card, consider a few more atomic pieces that will be useful:

- **Typography Atoms:** Define standard text styles via Tailwind or component wrappers, e.g. a `<Heading>` atom (for consistent `<h1>..<h6>` styling) and a `<Text>` atom for body text. This ensures all text in WYOS has a cohesive style hierarchy (large, bold headings and legible body text). For example, a Heading might use `text-2xl font-bold text-white` for an `h2` level, and we can adjust sizes per level. This makes it easy to maintain consistent spacing and appearance in our pages.
- **Icon Component:** Although we can directly use Lucide icons, we might create an `Icon` atom that wraps Lucide for consistency in size/color. For instance, an Icon component that automatically sets the icon to a default size (e.g. `24px`) and color (`currentColor`, which will inherit parent text color). This way, whenever we place icons (like stars, user avatars, menu icons), they fit the design without extra styling each time.
- **Avatar Atom:** In community features, we may display user avatars. Implement a simple Avatar component: a circular image that falls back to an initials icon if no image. Tailwind: e.g. `w-8 h-8 rounded-full object-cover`. If no image, use a background color with the first letter of username. This atom will be used in forum post previews and perhaps in the navbar for user profile.
- **Star Rating Atom:** For the resources rating system, a small atomic component for stars can be useful. For example, a `StarRating` atom that takes a rating value (0-5) and renders that many filled stars (and maybe outlines for the rest out of 5). It could use Lucide’s Star icon, filled vs outlined. This might be more of a molecule if interactive, but a static star display can be an atom. We can later wrap it to handle user input for rating.

Each of these atoms should have its own Storybook story as well (to verify styling and variants). For instance, `Avatar.stories.tsx` showing an image avatar and a fallback with initials, `StarRating.stories.tsx` showing 0–5 star examples.

By building these atomic components with **robust props and styling**, we establish a consistent design language. They encapsulate the dark theme and motion effects at a low level, so we can reuse them to craft more complex UI with confidence.

## 2. Feature Components (Molecules & Organisms)

Feature components are **mid-level combinations** of atoms that form distinct UI elements with specific functionality. In WYOS, these correspond to things like the Knowledge cards, Resource list items, and Community post previews. We will create these as either **molecules** (small combinations of a few atoms) or **organisms** (complex components composed of multiple parts) depending on complexity. Each will handle user interactions such as commenting, rating, or bookmarking, updating state fluidly with animations.

### 2.1 Knowledge Card (Molecule/Organism)

The Knowledge Card is a component that presents a single piece of curated content from the Knowledge section. According to WYOS’s concept, the Knowledge section provides **summarized insights from the best articles/videos** on a topic, with no fluff. We need to display these summaries in an engaging, easy-to-scan card.

**Structure:** The KnowledgeCard will likely be an **organism** because it contains multiple elements: title, summary, source link, metadata, and interactive actions. We’ll build it using our atoms:

- Use a **Card atom** as the container (for styling). Inside, include:
  - **Title:** Use a Heading atom (e.g. an `<h3>` style). This should be concise and indicative of the content (e.g. “5 Ways to Build Discipline”). Make it clickable if it leads to more detail or the original source.
  - **Summary:** A Text atom showing the curated summary of the content. Keep it brief (a few lines) so the user gets the gist. This matches WYOS’s approach of summarizing the best content to save users time.
  - **Source/Link:** Indicate the original source of the content. We can include a small link icon or the domain name (e.g. “Source: lifehack.org”) that opens the original article in a new tab. This reinforces transparency (WYOS always links to the original creator).
  - **Category Tag:** If the knowledge entries are categorized (productivity, mindset, etc.), show a tag or badge for the category. For example, a small badge atom with the category name (“Mindset”) to help users filter by topic. Style the badge with a subtle color or outline (maybe using different accent colors per category for visual distinction).
  - **Actions:** Provide interactive icons for user engagement: **Comment** and **Bookmark**.
    - _Comment:_ Knowledge entries allow members to comment. We can show a comment count and an icon. If clicked, it could navigate to a detailed view or open a comments section. The UI for comments might be an expanding panel below the card or a separate page – for now, include the icon and number of comments.
    - _Bookmark:_ Allow users to save knowledge items for later. Since WYOS is about useful content, a bookmark (or “save”) feature is logical (though not explicitly mentioned in docs, it adds value for users to collect useful articles). Implement this as a toggle-able icon (e.g. a bookmark or star icon that fills when saved). On click, use Zustand or context to add/remove the item in the user’s saved list and update the UI (with a nice animation: e.g. a little bounce or color change on the icon). If the user is not logged in or not a member, clicking could prompt login or subscription (we’ll handle that logic at the page level later).

**State & Animations:** The KnowledgeCard should update smoothly:

- If a user bookmarks an item, animate the icon filling (e.g. scale up briefly). Use Motion’s animate prop to interpolate the icon fill color.
- If we implement showing comments inline, animate the expansion of the comments section (a vertical slide/fade). For example, a `motion.div` for the comment list that toggles height or opacity.
- On hover, consider a slight lift or glow for the card to indicate it’s interactive (we already added hover effects in Card atom).

**Storybook:** `KnowledgeCard.stories.tsx` will display this component. We will feed it **sample data** inspired by actual WYOS content:

- e.g. title: “Atomic Habits Summary”, summary: “Key takeaways from _Atomic Habits_ – covering how tiny changes lead to remarkable results.”, category: “Habits”, source: “jamesclear.com”.
- Set controls for props like: number of comments, a boolean for “bookmarked” state, and perhaps a prop to simulate “expanded to show full content or comments”. We can have a Storybook action for clicking bookmark that toggles the state (using Storybook’s state or a custom hook in the story).
- Also show multiple instances to illustrate an infinite list (though Storybook usually shows one component per story, we can in one story render a list of 2-3 KnowledgeCards to mimic the feed).

By documenting it in Storybook, we verify that the KnowledgeCard layout cleanly presents **curated content (title + summary)** and the UI elements (tags, icons) are all aligned and styled properly.

### 2.2 Resource Item (Molecule/Organism)

The ResourceItem represents an entry in the Resources section – which is a **curated library of tools (apps, books, podcasts, etc.)** that have been vetted for effectiveness. Unlike knowledge items, resources have a **user rating system (1–5 stars)** and also support comments. The ResourceItem component will encapsulate this information and interactivity.

**Structure:** We can design the ResourceItem as either a card or a list row. Given we likely want to display many resources with details, a card style similar to KnowledgeCard works, or a slightly different layout:

- Use a Card atom or a simpler container (depending on if we want glass effect around each resource). For consistency, we could use a Card with some variant style if needed (e.g. all resource cards might have a uniform height or grid layout).
- Inside include:
  - **Title + Type:** The resource name and type. For example, “Notion (App)” or “Atomic Habits (Book)”. We can make the title prominent (maybe use a Heading atom but smaller than Knowledge heading). Also show an icon or badge for the type/category – e.g. a small icon of a book, headphones (podcast), play button (YouTube), etc., or simply text like “[Book]”.
  - **Description:** A one-line or short description of why this resource is valuable. This might be curated by WYOS (like a short note “A popular habit-building book with practical tips.”). Keep it succinct to avoid clutter.
  - **Rating Stars:** Display the average rating as stars. Use the StarRating atom to show, say, 4.5 out of 5 stars (with half-star or just 4 full, 1 half). Also show the number of ratings in parentheses perhaps. This gives social proof as mentioned (members’ ratings provide authenticity).
  - **Your Rating Interaction:** If the user is a member, allow them to rate the resource. An interactive approach: show 5 star icons that highlight on hover and can be clicked to set your rating. If the user hasn’t rated yet, stars could be outlined until hovered. Once they click (say 4 stars), fill those stars and maybe slightly highlight to confirm selection. Use Zustand or a local state to store the user’s rating and update the average (in real app, call backend). For immediate UI feedback, optimistic update the average or at least mark their rating. Animations: on hover, as user moves the cursor, dynamically highlight stars (this can be done with simple CSS hover on child or with a tiny bit of JS to set a hoverRating state). On click, perhaps a short burst animation (could use a confetti effect or just a pop on the stars) to make rating feel rewarding.
  - **Comments Link:** Similar to KnowledgeCard, show an icon or button to view comments (“💬 5” if 5 comments). Clicking could open a detail view or expand comments.
  - **Bookmark:** Users might also want to save resources. We can reuse the bookmark icon here so they can mark a resource they intend to try later.
- **Filtering UI (for resources page):** While not part of the ResourceItem component itself, the item should work in conjunction with filtering controls. Each ResourceItem should include data attributes or classes we can leverage for filtering (e.g. a data-category="book", data-rating="5" attributes, if we do client-side filter with JS). However, a simpler approach is to manage filtering at a parent list level (in React, filter the list of items by state). We will handle the filter logic on the page, but ensure ResourceItem displays the relevant info that the filter toggles (like category and current rating).

**Storybook:** `ResourceItem.stories.tsx` will illustrate various resource entries:

- Show examples from different categories (to ensure our type badges/icons work). E.g. one story for a Book, one for an App.
- Use controls for average rating (e.g. set 3 vs 5 stars), and a boolean if the user has rated it. If interactive rating is complex, we can simulate it: e.g. have a storybook control “myRating” that highlights the stars accordingly.
- We can also include a story that displays a list of ResourceItems with a filtering control above it (though that starts veering into page territory). Alternatively, show how a “Top 5 Resources” list might look by listing five ResourceItems in a condensed view.

When building ResourceItem, refer to the WYOS specification: it specifically requires a **1–5 star rating system and filtering options**. Our component covers the rating UI; we will address filtering when constructing the page. By having ResourceItem self-contained (taking props for its data and maybe callbacks for rating), we ensure it’s **reusable** and testable in isolation.

### 2.3 Community Post Preview (Molecule)

The Community section is powered by Discourse forums integrated via SSO. Instead of building a full forum UI from scratch, WYOS likely embeds or links to Discourse for full threads. However, we want to **preview forum content** within our app to make it feel integrated. The CommunityPostPreview is a component that represents a summary of a forum thread or post, which we can display in a feed or list.

**Structure:** A CommunityPostPreview will contain:

- **Post Title:** The title of the forum thread (if the forum is organized by threads). This should be a link or clickable element, as clicking it will take the user to the full discussion (either opening the Discourse page or an embedded view).
- **Snippet or Excerpt:** A short excerpt from the first post (or last post) to give context. Perhaps one or two lines of text. We might strip any markdown/HTML since forum posts can have formatting.
- **Meta Information:** Include details like the author’s name and avatar, the date or time since posted, and the number of replies. For example: “**JohnDoe** · 2 hours ago · 3 replies”. Use the Avatar atom for the author’s image (Discourse provides user avatars we can fetch, or use a placeholder if not).
- **Category/Tag:** If the forum has categories or tags, optionally show a badge (e.g. “# Introductions” or “Mindset Forum”) to indicate where this thread is posted.
- **Call-to-Action:** Possibly a “View Thread” button or simply making the card clickable. We could also include a small arrow icon indicating it leads to more.

**Design & Interaction:**

- Use the Card atom (or a simplified version without heavy glass if already a dark background) for each preview to keep consistency. The card can be a bit lighter since it’s text-heavy (maybe use a slight lighter background to distinguish from page background).
- Ensure that multiple post previews stack nicely (maybe use a vertical list with some spacing).
- The preview is mostly static content with a link, but we can animate hover (highlight the card or underline the title). Also, if we want, animate the appearance of each item (like fade in sequentially for a nice entrance of a list of latest posts).
- Since the forum data comes from Discourse, in a real app we’d fetch recent topics via Discourse API. For now, we’ll simulate data. We could integrate a Zustand store or TanStack Query hook to retrieve posts, but that’s beyond UI guide scope – we’ll assume the data is passed in as props. The component should accept something like `title`, `author`, `avatarUrl`, `repliesCount`, `postedAt`, etc.

**Storybook:** `CommunityPostPreview.stories.tsx`:

- Create a story with a realistic example: e.g. title: “How do you stay consistent with new habits?”, author: JaneDoe, time: “1 day ago”, replies: 5. Show an avatar (we can use a placeholder image URL or Storybook’s static asset).
- Possibly show a list of two or three previews in one story (“Multiple Previews”) to illustrate a community feed section.
- Controls can allow tweaking the title text length (to see wrapping behavior), or number of replies. We could also simulate different time frames (just as text).

This component will give the **Community page** content without requiring the whole forum. It provides a teaser of the community activity to the user, which is critical for integration (so the community feels part of the same platform). Users clicking it will transition to the forum – that transition could be a simple link (with perhaps a loading state or a notice if SSO is redirecting).

### 2.4 Other Feature Components

A few other mid-level components will help round out the functionality:

- **Comment List and Comment Form:** Since both Knowledge and Resources allow comments, we should have reusable components for displaying comments and adding a new comment. A CommentItem molecule could show an avatar, username, comment text, and timestamp (and perhaps likes). A CommentForm can be a small form with a textarea (using our Input/Textarea atom) and a submit button. We can integrate this with Zustand or TanStack Query to actually post the comment to Appwrite. For now, design-wise, ensure the comment form is clearly separated (maybe inside the KnowledgeCard when expanded or on a detail page). Use Motion to smoothly slide comments into view or to clear the form on submit. **Storybook**: We can demonstrate a CommentItem with sample text, and a CommentForm with controlled input (not actually posting anywhere in Storybook, but we can log the submission action).
- **Filter/Category Menu:** Particularly for the Knowledge and Resources pages, an interactive filter component will enhance UX. We can create a FilterBar molecule that contains category filters, search input, and maybe a sort dropdown:
  - For Knowledge: a horizontal list of category tabs (e.g. “All, Habits, Mindset, Productivity…”). This could be a scrollable segment control. Implement as a list of buttons styled as toggles (Tailwind: maybe use `bg-white/10 rounded-full px-3 py-1 mx-1` for an unselected tab, and `bg-indigo-600 text-white` for selected). This component would take the current category and an `onSelectCategory` callback to inform the parent page.
  - For Resources: possibly a sidebar or top bar with multiple filters. We can have checkboxes for resource types (App/Book/Podcast…), and maybe a rating filter (like “4 stars & up”). A slider or dropdown for rating might be used. To keep it simple, a set of checkboxes or toggle buttons for “Show only 5⭐” etc. The filter component should manage its own state and call a prop like `onFilterChange(filters)` whenever something toggles. We might use Zustand to hold the filter state globally for the resources list, so that any component can read it – or just keep it local in the Resources page.
    Style the filter UI to match dark mode: use our Input and Button atoms where applicable (e.g. the search bar is an Input atom with a search icon, filter checkboxes can be custom styled checkboxes or small Buttons toggling active state). Add interactivity: for example, animate the appearance of the filter panel (slide down) if on mobile or toggling advanced filters.
    **Storybook**: You could create a `FilterBar.stories.tsx` to show the Knowledge category bar and Resource filter panel in isolation, but it might be more meaningful to demonstrate them on the pages. It’s okay to test them in the context of pages instead, as we will in the next section.

By assembling these feature components, we cover all key interactive pieces: **KnowledgeCard** (curated content display), **ResourceItem** (with ratings), **CommunityPostPreview** (forum integration), plus supporting components for comments and filtering. Each is designed to handle its own interactions (commenting, rating, bookmarking) with a smooth UX. For instance, rating stars update immediately and animate, comment forms clear and display the new comment without a full page reload (assuming we integrate our state/query logic properly), etc. These pieces will now be used to build the actual pages.

## 3. Full Page Construction (Organizing Organisms into Pages)

With atoms and molecules in place, we can construct the full pages of the WYOS application: Authentication flows, main sections (Knowledge, Resources, Community), the Subscription page, and public Marketing pages. We’ll progressively build out each page, ensuring that common layout elements (headers, navigation, footers) are consistent and that the overall UX is intuitive (minimal clutter, clear navigation).

We will also consider the **membership gating**: WYOS is a paid membership platform, so pages should conditionally render content or prompts based on the user’s auth/subscription status. Zustand’s auth store will help determine that (e.g. `authStore.isLoggedIn` and `authStore.isSubscriber`).

### 3.1 Authentication Pages (Login, Signup, Reset Password)

These pages allow users to register and log in, integrated with Appwrite authentication via Zustand. They will likely be publicly accessible (route group `(auth)` as noted in system patterns). Design them to be simple and focused, yet in keeping with the WYOS style.

**Layout:** Typically, authentication pages use a special layout: centered form, perhaps with a nice background or branding. We can utilize an **AuthLayout** (as mentioned in docs) that wraps these pages, handling redirects if user is already logged in. The layout might include a WYOS logo or name at top and maybe a brief tagline like “Welcome back to WYOS” to reinforce brand.

Use a Card (or just a div with slightly transparent background) to contain the form, giving it that glassy feel. Surrounding the form, the background can be a full-screen dark gradient or a blurred abstract image to give a premium vibe.

**Login Form:** This form asks for email and password:

- Use our Input atoms for the email and password fields. Mark them required and integrate with **React Hook Form + Zod** for validation (as per tech stack). For instance, on submit, if fields are empty or email invalid, show inline error messages (our Input atom with `error` prop, or a small Text component in red).
- Include a submit Button atom (“Log In”) which shows `loading` state when the form is being submitted.
- Also include an “OAuth Login” if available (docs mention Google OAuth). This could be a Button variant with Google icon saying “Continue with Google”.
- Link to Signup page (e.g. a small text: “No account? Sign up”) and to Reset Password.
- When the user submits, we call `authStore.login(email, password)` (Zustand store method which in turn calls Appwrite). Since we have Zustand and likely TanStack Query for mutation, ensure to catch errors (e.g. wrong credentials) and display them (perhaps use the store state for error or handle in form by try/catch). The Auth store in WYOS manages session and will redirect on success. We might not implement the redirect logic in the component (AuthLayout can handle effect of logged-in state and push to the main app).

**Signup Form:** Similar to login, but with extra fields if needed (username or just email & password, maybe confirm password). Possibly also ask for name. Validation with Zod (password strength etc.). Use the same design: Input fields, a Button (“Create Account”), and maybe a note about terms. After successful registration via Appwrite, you might require email verification – if so, show a notice (“Check your email to verify”).

**Reset Password:** Likely two screens – Request reset (enter email) and actually reset (new password) if coming from email link. For UI, focus on request form: just an email Input and a Button (“Send reset link”). On submit, call Appwrite’s password reset email function; show a confirmation message if success.

**Styling:** Keep the forms clean: lots of whitespace/padding inside the Card, labels aligned above inputs or as placeholders. Use our dark theme input styles for a consistent look. The Button should span full width or be clearly prominent to encourage action. Also include any branding like the WYOS logo at the top of the form if available (could just be a text logo “WYOS” in a nice font, bright color).

**Motion:** We can animate the card mounting (e.g. fade up from opacity 0 to 100 on page load). Also perhaps animate the switch between login & register forms if they are on same page (but they are likely separate routes). Small touches: when user clicks “Login”, disable the form and maybe swap the button text to a spinner (we already handle via `loading` prop).

**Storybook:** We can create Storybook stories for these forms as well, though they are full pages:

- `LoginForm.stories.tsx`: Render the login form component. Use controls to simulate an “error message” state (like set a prop `errorMessage="Invalid credentials"` to see how it looks). We can’t fully simulate Appwrite, but we can ensure the UI reacts to a fake loading state (maybe have a boolean knob to toggle `loading` which the component uses to show spinner).
- Similar for `SignupForm` and `ResetPasswordForm` if those are separate components.
- Possibly an `AuthLayout.stories.tsx` to show the entire page layout (with background and card).

These stories let us verify that the auth UI is **user-friendly** and matches the rest of the design (dark, modern). It’s important these forms are polished since they’re the first thing new users see.

### 3.2 Knowledge Page

The Knowledge page is the heart of WYOS’s content. It should present the curated knowledge entries in an organized, discoverable way. Key features: **category-based navigation, infinite scrolling, and commenting on entries**.

**Layout & Navigation:** At the top of the Knowledge page, include a header with the section title and possibly a brief description (“Browse the best ideas and insights without the noise”). Right below, implement the **category filter bar** (as discussed in 2.4). This could be a horizontal list of categories (atoms or small buttons). Users can click a category to filter the list to that topic. When a category is selected, highlight it and show only relevant knowledge cards. Implement filtering either by:

- Fetching only that category’s items from the backend (with TanStack Query and filter param),
- Or filtering an already fetched list in state. In our guide context, we can simulate by storing all items in state and filtering client-side via a Zustand store or React useState. For smooth UX, filter without full page reload. Possibly animate the transition (e.g. fade out old cards and fade in filtered cards).

**Content List:** Display the KnowledgeCard components in a scrollable list. An **infinite scroll** means as the user scrolls near bottom, load more items. We can achieve this with an Intersection Observer triggering a fetch for next page of results. For now, focus on the UI mechanism:

- We might show 10 cards, then a loading spinner at the bottom when loading more. Storybook can’t simulate scroll, but we can have a “Load More” button in the story for demonstration.
- Ensure the list is responsive: on desktop, maybe a two-column grid if cards are short? But since the summaries could be somewhat long, a single column feed might be more readable (like a blog feed). Perhaps use one column with each card full width (with max width ~xl for readability).
- Keep consistent spacing between cards (Tailwind margin or gap in a flex/column layout).

**Interactions:**

- Clicking a KnowledgeCard’s title or a “Read more” link should navigate to a detail view or external link. WYOS might allow reading the summary on-site and linking out to original. If we have a detail page, that would be a separate route (e.g. `/knowledge/[slug]`). For our purposes, we might not fully design the detail page, but we should acknowledge it: The detail could simply reuse the KnowledgeCard content in a page plus a full comments section.
- If a user clicks the comment icon on a card, we could either jump to the detail anchor where comments are, or dynamically expand the card to show comments inline. A simple approach: link to a route `/knowledge/[id]#comments`. A more advanced: toggle an embedded CommentList right under the card. For now, perhaps assume a separate detail page (easier for implementation).
- Bookmark icon on each card toggles saved state as discussed. If user is not logged in and tries to bookmark or comment, redirect them to login (we can use auth store to detect and a `router.push('/login')`).
- The infinite loading indicator should show an animated spinner (we can reuse the Spinner atom). Also handle the edge case of “no more content” by maybe not showing spinner when done or show a subtle “End of results” message at bottom.

**Polish with Motion:** Use Motion to animate category change (maybe slide highlight under the selected category tab), animate new cards on scroll load. For example, as new cards come in, stagger their appearance with a slight delay each – this creates a delightful experience as the user scrolls (common in modern apps to gently animate list append).

**Storybook:** `KnowledgePage.stories.tsx`:

- We simulate the Knowledge page with some sample categories and items. Prepare an array of sample knowledge items (maybe 3 categories like “Habits, Productivity, Mindset”, each with a couple entries).
- In the story, have state to toggle category (Storybook control or a dummy Category menu that we can click if we wire it).
- Render the filter bar and a subset of KnowledgeCards. To simulate infinite scroll, perhaps just show a “Load More” button at the bottom in the story that, when clicked (action logged), would theoretically load more.
- Alternatively, we can just show initial state with a certain category. The key is to illustrate layout: category menu on top, cards below.

By building the Knowledge page this way, we ensure the **curated content presentation is clear and accessible** and users can easily navigate by topic. The page should feel like a high-quality library – no clutter, just valuable content previews and easy ways to dive deeper or interact.

### 3.3 Resources Page

The Resources page lists all the recommended tools with the ability to filter and sort. Core features: **ratings system, comments on resources, focused lists to reduce overwhelm**.

**Layout:** Similar to Knowledge, start with a header (“Resource Library” and maybe a subtitle like “The best tools and books to help you progress”). Below that, provide filtering controls:

- Possibly a combination of a category filter and a rating filter. We have many resource types (apps, books, courses, podcasts, software, YouTube). A UI approach: a multi-select filter panel. On desktop, this could be a sidebar on the left with checkboxes for each type and maybe star filters. On mobile, it might be a collapsible panel or a popover.
- For simplicity, we can implement a horizontal filter toolbar with dropdowns:
  - A dropdown or pills for resource type (e.g. “All, Apps, Books, Courses, …” similar to categories earlier).
  - A dropdown for “Sort by” (Latest, Top Rated, A–Z).
  - Perhaps a toggle or dropdown for “Minimum Rating” (All vs 4+ stars).
  - A search box to search by name/keyword.

This is a bit complex, but we can start with type filters and rating filter. The filtering logic is handled in state: e.g. `selectedTypes: Set<string>` and `minRating: number`. When these change, filter the displayed list accordingly. Use Zustand or local state to manage these filters so that ResourceList can respond.

**Resource List Display:** Show the ResourceItem components in a grid or list. Because these might contain images (like book covers or app icons) and more metadata, a grid could work nicely to utilize space. For example, a 3-column grid on desktop for compact cards, falling to 1-column on mobile. However, if each ResourceItem is somewhat detailed (with description and comments count), a full-width list similar to Knowledge might also make sense for readability. We can choose a moderate approach: 2 columns on large screens, 1 column on small, to balance space.

Group resources by category if it helps reduce overwhelm. One idea from WYOS is “focused lists (Top 5)” – we can interpret that as possibly showing a “Top 5 in each category” rather than an endless list. For our UI:

- We might present a small highlight section for each category: e.g. “Top 5 Books” with five ResourceItems, then “Top 5 Apps”, etc. This could be an alternative view or an addition at page top.
- Another interpretation is a user could toggle to only see a curated “Top 5 overall” if they feel overwhelmed by choices. Perhaps we provide a quick filter button "Only show Top Picks".
- Given time, we’ll implement at least one “Top N” showcase. For instance, at the very top, show a horizontal carousel of the absolute top 5 resources (across all types). This carousel is an organism combining ResourceItems in a slide (we could use a simple scrollable div with snap or a carousel library). Each item in that is a simplified ResourceItem (maybe just title and image). This draws attention to the best of the best, aligning with WYOS’s goal of reducing overwhelm by highlighting the most effective tools.

**Interactions:**

- Rating: Users can rate a resource directly from the ResourceItem if we allowed that. Alternatively, require clicking into a resource detail to rate/comment. A smoother UX is inline rating: as described, the star component on ResourceItem is interactive. On click, we call a rate action (which updates backend and state). If not logged in or not a member, intercept and route to login/subscribe, since only members can rate.
- Comment: likely handled on a detail page for the resource (similar to knowledge detail). We can allow clicking the ResourceItem to go to a Resource detail page where more info and comments are shown.
- Filter: When a filter changes, update the list instantly. If multiple filters are active, ensure the UI indicates it (e.g. show the active type pills highlighted, or list active filters above the results). Provide a “Clear Filters” button if multiple filters.
- Sort: If implementing sort control, ensure the state updates accordingly (like sort by rating would reorder the displayed ResourceItems list).

**Motion & Feedback:**

- Animate filtering changes: e.g. fade out the list and fade in filtered results, or use a nice stagger to rearrange. This prevents jarring instant changes and makes the UI feel slick.
- If no resources match the filter (like if you filter category "Podcasts" and none are rated 5 stars and you set min 5), show a friendly message “No resources match those filters.” Possibly accompanied by a suggestion to broaden filters.
- For rating interactions, as mentioned earlier, animate the stars on hover and selection.
- Possibly animate the top picks carousel (auto-slide or gentle scroll on mount).

**Storybook:** `ResourcesPage.stories.tsx`:

- Simulate the page with a set of sample data. Create sample resources e.g.:
  1. “Notion” (App, 5★, “All-in-one productivity tool.”),
  2. “Atomic Habits” (Book, 5★, “Best-selling habit formation book.”),
  3. “Deep Work” (Book, 4★, “Improving focus by Cal Newport.”),
  4. “Calm” (App, 4★, “Meditation and sleep app.”),
  5. etc, covering at least 3 categories.
- Show the filter bar with controls. Perhaps allow switching a knob “filter = Books” to illustrate only books showing.
- Show both the normal list and maybe a top-5 section. For example, include a subheading “Top 5 Resources” and show 5 items horizontally (this can just be static in the story).
- Because Storybook controls can’t easily re-run a filter function without custom wiring, we might just use a static story for demonstration: one story “All Resources” (no filter), one story “Filtered: Books only” to show how it narrows down.

The Resources page should convey a sense of **trusted recommendations**. By providing ratings and community comments, users get social proof that these tools are worthwhile. Our UI should make it easy to find what they need via filtering (e.g. quickly narrow to “Apps for Productivity” with a couple clicks) and encourage them to contribute (rate/comment) if logged in.

### 3.4 Community Page

The Community page is the gateway to the WYOS forums. Since the actual forums are in Discourse, our aim is to integrate it visually and navigation-wise. The key here is to make the user aware of active discussions and prompt them to join in, all while feeling like a seamless part of WYOS (thanks to SSO integration).

**Layout:**

- Start with a header (“Community”) and a short welcome message. For example: “Join the conversation with like-minded members. Our forums are where we keep it real and support each other.” This sets the tone and invites participation, aligning with WYOS’s authentic community vibe.
- If the user is not logged in or not a member, we might show a prominent call-to-action to subscribe or log in to access the community (since forums are members-only). In that case, instead of previews, maybe a lock icon illustration with text “The community is for members only. **Log in** or **Subscribe** to see what people are discussing.” The subscribe link would go to the Subscription page (section 3.5).
- If the user is a member (or for storybook/demo purposes), show the **Forum Previews**:
  - Perhaps divide by forum categories: If Discourse has categories like “General”, “Accountability”, etc., you could show the latest thread from each. However, simpler: just show recent active threads regardless of category.
  - List 5-10 CommunityPostPreview components (as built in 2.3) in a nice list. Possibly group them by date (“Today’s Posts”, “This Week”) if that makes sense, or just a single feed sorted by last activity.
  - Provide a button “Go to Forums” at bottom or top that opens the full forum index (e.g. clicking it navigates to discourse site or possibly an embedded version).
  - Additionally, a “Start a New Discussion” button could be included to encourage contributions. That could link to the new topic URL of the forum. Because of SSO, if the user is logged in to WYOS, that link should take them straight to the forum posting interface with their account. This button can be a primary CTA on the page (“+ New Post”).

**Integration details (for implementation context, though mostly backend):**

- The app likely has a route that handles Discourse SSO login. When a user clicks “Go to Forums,” ensure they have gone through SSO handshake (maybe already did on login). Possibly the first time, redirect to a special route that signs them into Discourse then forward to the forum.
- For preview data, if we wanted to fetch it: Discourse has an API that could give latest topics. We might do that server-side or via Next.js API route. But for our guide, we assume we have that data in state or can call an API on page load. Use TanStack Query to fetch from `NEXT_PUBLIC_DISCOURSE_URL` (provided in env) if needed.

**Design elements:**

- Each post preview card (from 2.3) should stretch full width of the container with maybe a slight separator or margin between. Because content is text heavy, ensure adequate padding.
- Use subtle styling to differentiate read vs unread (if we even track that; probably not needed for MVP).
- Possibly incorporate the Discourse color scheme? But better to keep WYOS styling to maintain integration feel. Discourse often has user-specific colors for categories; we can either include those in the preview (maybe a small colored dot for category).
- The Community page background and overall theme remains dark and consistent.

**Motion:**

- Could animate the list of posts appearing (staggered slide-up) when the page loads.
- If we had a refresh action to load new posts, we could animate that with a spinner or pull-to-refresh on mobile.

**Storybook:** `CommunityPage.stories.tsx`:

- Show two versions:
  1. Logged-out/locked view: Display the message telling user to subscribe/login. We can simulate by a boolean prop like `loggedIn=false`.
  2. Logged-in view: A list of 3-5 CommunityPostPreview items with sample data. E.g. “Anyone else struggling with focus?” by userA (2 replies), “Weekly Challenge: No Sugar Week” by userB (10 replies), etc.
- We will hardcode the sample data for story. The story should illustrate the layout with a header, the posts list, and perhaps the “New Discussion” button.

This page completes the core user experience loop: after absorbing knowledge and trying resources, users can engage with community for support and accountability. The UI should be welcoming and straightforward – essentially showing what’s happening and offering clear entry points (“View topic” or “Post your own”).

### 3.5 Subscription Page

Since WYOS is a paid platform, the Subscription page is critical for converting free users to members. We’ll design a **pricing page** that outlines the membership benefits and prompts the user to subscribe (without implementing Stripe logic here, just the UI/flow).

**Content:** Use the info from the membership model to populate this page. Key points to convey:

- WYOS is subscription-based via Stripe.
- Benefits of membership: full access to Knowledge, Resources, Community, ability to comment and rate, and being part of shaping the platform.
- Possibly any tiers or pricing options available.

**Layout:** Typically, a pricing page might have one or more pricing cards:

- If WYOS has a single membership tier, just present it clearly. For example, “WYOS Membership – $10/month” (just an assumed price) with a list of features.
- If multiple tiers (not indicated in docs, likely just one), or monthly vs annual, we can show toggles. E.g. a toggle switch for Monthly vs Yearly (with a discount).
- The **Subscribe** CTA should be very prominent (a big Button).
- Also mention any trial period if offered, or money-back guarantee if any – anything to reduce friction. Not explicitly mentioned, but if we want, a line like “7-day free trial available” if applicable.

**Design details:**

- Use a Card or panel for the pricing info. Could use a bit more pop of color here to highlight the value proposition. For instance, a slightly brighter gradient background on the pricing card to draw the eye.
- List out benefits with checkmarks. Possibly reuse content from “Benefits of membership” list:
  - Full access to Knowledge Hub (all curated content)
  - Full access to Resource Library (and ability to rate/comment)
  - Participation in Community forums (post and message)
  - Influence the platform’s future (this was hinted: “Members are the ones shaping the future”).
- Show pricing clearly. If monthly and yearly, show both (e.g. Monthly $X, or Yearly $Y (save N%)).
- The Subscribe button when clicked would normally initiate Stripe Checkout (which was planned but not done). Since we aren’t implementing logic, we can either:
  - If user is logged out, clicking Subscribe could redirect to signup first (since need account to attach subscription).
  - If logged in but not subscriber, clicking could open a modal “Proceed to payment” (which in real app would call stripe). We might just simulate by showing a placeholder “Stripe checkout would go here.”
  - Or simply disabled button with note “Stripe integration coming soon” if this is a WIP.
- If the user already has a subscription (auth store might track that, e.g. `user.isSubscribed`), this page should reflect that: e.g. display “You are already a WYOS member! Thank you for supporting.” and perhaps a link to manage their subscription (which would open Stripe customer portal). So our UI should handle both cases. Likely by checking a prop or global state:
  - If subscribed: show a confirmation and maybe some celebratory icon (🎉).
  - If not: show the pricing and subscribe form.

**Additional UI:** Possibly include testimonials or quotes to further convince the user, though none provided in docs. We might keep it minimal since the benefits are clearly listed.

**Storybook:** `SubscriptionPage.stories.tsx`:

- Show the default state (user not subscribed): pricing info + subscribe button. Use placeholder price or leave it generic (“Subscription – $$ per month”).
- Provide a control or separate story for the “already subscribed” state: see that it shows the thank-you message instead of the pricing form.
- Maybe also a variant if not logged in: could mention “Please log in or create an account to subscribe” above the pricing, then still show pricing. (This might be handled by redirecting to login then back, but we can show a note in UI).
- Since no actual Stripe call, the story just needs to present the static UI. Ensure the benefits list is present and visually clear (maybe using a list with checkmark icons for each benefit).

By focusing on clarity and persuasion in this page, we aim to convert interested users by demonstrating the value of WYOS membership. The UI should be straightforward: highlight value, price, and provide a **no-hassle call-to-action** (the Subscribe button). Even without Stripe integration implemented yet, having this page in place completes the user journey in the app.

### 3.6 Marketing Pages (Public Pages like Home/About)

Lastly, WYOS may have some public-facing pages accessible without login – for example, a landing homepage, an “About WYOS” or FAQ page, maybe a contact page. These fall under the `(marketing)` routes as per the route structure. They should encapsulate the **WYOS mission and value proposition**

for new visitors.

**Home Page (Landing):** This is where we introduce WYOS to someone who just found it:

- **Hero section:** A bold headline that cuts through the noise, reflecting the WYOS ethos. For example, use content from the overview: “Tired of the fake BS online? WYOS is a place to find the truth, tools, and people that actually help you move forward.”. This could be a large heading on a dark hero background. Possibly include a background image or illustration – maybe a subtle abstract pattern or a silhouette of someone writing their story (but keep it subtle to maintain the modern feel).
- **Call to Action:** Right under the hero text, a prominent button “Join WYOS Now” or “Start Your Journey” leading to signup. Also possibly a secondary link “Learn More” scrolling down or to an About page.
- **Key Sections Overview:** Feature three columns or sections summarizing Knowledge, Resources, Community – since these are the core pillars. Each with an icon and a sentence:
  - Knowledge: “Curated insights without the fluff.”
  - Resources: “Vetted tools that actually work.”
  - Community: “Real conversations and accountability.”
- **How it Works/Why WYOS:** A section elaborating why WYOS exists, perhaps quoting the founder (from the overview: “I built WYOS because I needed it myself...”). Use that authentic tone to connect with the audience. Could be a short paragraph with a picture or just stylized text.
- **Maybe a Testimonials or Success Stories:** If we had any user quotes or stories, we’d put them here for social proof. (Not provided, so we might skip or put placeholder).
- **Footer:** Basic links, copyright, maybe contact info.

**About Page:** Could expand on the story behind WYOS, target audience, etc. A lot of this content is in the productContext doc, which we can summarize:

- The problems WYOS solves (information overload, misinformation, lack of support).
- How it solves them (curation, authenticity, community).
- Perhaps an introduction to the team or the founder’s story (the founder’s quote above serves well).
- This would be mostly text, so ensure to format it nicely with our typography styles. Could use some images or icons for visual break.

**Design for Marketing pages:** Even though they are public, maintain the dark theme since that’s the brand identity (Resend’s marketing pages also stayed dark [resend.com](https://resend.com/blog/introducing-light-mode#:~:text=communication%20assets,mode%2C%20primarily%20for%20accessibility%20purposes)). Use more visually engaging elements like background gradients, larger imagery, and maybe subtle scrolling animations:

- Example: as you scroll to the section overview of Knowledge/Resources/Community, each column could fade/slide in (with Motion).
- The hero text could have a slight animation (text appears with a delay or a typewriter effect – careful not to overdo gimmicks, but something simple can add polish).

**Storybook:** We might not fully simulate the marketing site in Storybook due to complexity, but we can create a high-level story:

- `HomePage.stories.tsx`: Shows the hero and sections with placeholder content. We can use actual lines from the overview for authenticity.
- We could embed the Knowledge/Resources/Community icon sections as separate components (small FeatureCard molecules for marketing).
- Ensure the CTA button is present and uses our Button atom styling (maybe larger size).

With the marketing pages in place, the app has a consistent funnel: new users land on the site, learn about the platform, sign up via the auth pages, explore Knowledge/Resources, and join the Community – all within a unified UI experience.

### 3.7 Common Layout Components

To avoid repetition, define common layout components used across pages:

- **Navbar (Header):** A top navigation bar that appears on authenticated pages (and maybe a simpler version on marketing pages). For logged-in users, this header can show the WYOS logo/title on the left, and section links (Knowledge, Resources, Community) across the top. On the right, show the user’s name or avatar with a dropdown menu (Profile, Logout). For mobile, include a burger menu to toggle a drawer with these links. We can create this Navbar as an organism, utilizing Button/Avatar atoms for the items. It should be responsive and sticky at top on scroll. Storybook can document Navbar separately too.
  - On public pages (home/about), we might show just the logo and a “Login” / “Sign Up” button on the right instead of section links.
- **Footer:** A footer for marketing pages with links (if needed). Keep it minimal: maybe just © WYOS Year, and possibly social media or contact.
- **Page Container:** A centered container to wrap page content (for consistent max width). E.g. max-w-4xl with mx-auto and some padding on the sides for large screens, full width on mobile.
- **Section Header component:** Could be a small component for consistent styling of section titles (like the title on Knowledge page or Community page). Not strictly necessary, but for consistency you might create a component that takes a title and optional subtitle and renders them with the correct typography and spacing.

We incorporate these into each page. For example, the Knowledge page code would use `<Navbar/>` at top (if not using a Next.js root layout that already includes it), then maybe a `<PageHeader title="Knowledge" />`, then filters and list. The Subscription page likely doesn’t require the main app navbar if we treat it like a marketing page (or maybe accessible only when logged in? Actually likely accessible if not a member and logged in, and also from marketing).
We must ensure navigation flow:

- Non-authenticated user: can see marketing pages, login, sign up. After login, they go to the core app (Knowledge as a default homepage perhaps).
- If logged in but not subscribed: possibly allowed to see limited content or teased content with prompts to subscribe. This wasn’t explicitly described, but since membership is required for full access, the app might need to enforce access control (progress doc mentions “Access Control: subscription-based feature access”). We can implement a simple check: if user is logged in but has no subscription, maybe Knowledge/Resources list still show but maybe blur or limit number of items with a prompt “Subscribe to unlock full content”. Or simply always allow reading but not interacting. This is a product decision; for our UI, we at least show subscribe prompts where appropriate (like on Community page as we did, maybe on Knowledge/Resources if needed).
- For simplicity, maybe assume an MVP where any logged-in user can see content, but only subscribers can comment/rate. But membership model suggests content itself might be members-only. If so, unauthenticated users maybe can’t even access Knowledge/Resources pages (they would be redirected to marketing or shown a sign-up prompt). The route groups hint that Knowledge/Resources are under `(core)` protected routes, meaning you must be logged in (and possibly subscribed) to view. So the marketing site and maybe a general “Membership info” (subscription page) is outside.

**Storybook Combined Pages:** We will now consider how to simulate flows.

## 4. Storybook Integration and Simulation of User Flows

Every component and page we built is accompanied by Storybook stories to verify UI and interactions. Now we’ll create a **comprehensive Storybook setup** that ties everything together and even simulates typical user flows with sample data. This serves as both a visual test and a demonstration of the app in action.

### 4.1 Setting up Storybook with Next.js and Tailwind

Ensure Storybook is configured to work with Next.js 15 (using `@storybook/nextjs` for instance) and TailwindCSS. Include any required decorators:

- Add a decorator to wrap stories in our global styles (Tailwind’s styles and a dark background). Possibly add a decorator to provide Zustand stores with default values (for example, an AuthStore provider that we can manipulate in stories).
- If using Next Image or Next Link in components, configure Storybook to handle those (use the proper Storybook addon or a mock).

We also set the Storybook background to dark by default in preview.js (so that our dark mode components appear against the intended background). Optionally, include a toggle for light mode if we want to test it (though WYOS is dark-first, we might not have designed a light theme fully).

### 4.2 Stories for Each Component

As described in sections above, we will have individual story files for each atom, molecule, and organism. This yields a robust Storybook catalog:

- **Atoms**: Button, Input, Card, Avatar, Spinner, Typography, etc. – each with controls and multiple examples.
- **Molecules/Organisms**: KnowledgeCard, ResourceItem, Comment components, FilterBar, Navbar, etc. – showing typical data.
- Ensure each story has a descriptive name and grouping in Storybook’s sidebar (we can categorize them like “Atoms / Button”, “Organisms / KnowledgeCard”, etc., for clarity).

Use **Storybook Controls** extensively:

- For Button: controls for `variant`, `loading`, `disabled`, and label text.
- For Input: controls for `error`, `placeholder`, etc.
- For KnowledgeCard: controls for things like category, bookmarked (boolean), commentCount, etc.
- For ResourceItem: controls for rating value (maybe as number), type (so we can dynamically change an icon or label).
- For CommunityPostPreview: controls for title text, replies count, etc.
- This allows designers or developers to play with props live and ensure the component behaves and looks correct in all cases.

Use **Storybook Actions** for interactive feedback:

- E.g. on the rating stars click, we can link it to a Storybook action to log “Rated X stars” in the actions panel.
- On comment form submission, log the submitted message.
- On bookmark toggle, log that it was toggled (and optionally update a local state in the story to reflect the icon change).

This way, even though Storybook isn't a full app, we mimic the interactions enough to verify transitions (for example, we can simulate the bookmark icon toggling by using a Story with internal component state or a controlled prop via controls).

### 4.3 Assembling Pages in Storybook

We will create stories for full pages as well. Each page story will import the page component (which itself uses many child components) and provide it with mocked data or context as needed:

- **Auth Pages**: For example, `LoginPage.stories.tsx` might just render `<LoginPage />` (which includes the form and AuthLayout). We might need to wrap it in a Router context if the page uses Next navigation. In Storybook, we can add a decorator for Next Router to simulate `useRouter`. Alternatively, simplify the page component to not depend on Next navigation for the story.
- **KnowledgePage**: Render the KnowledgePage with a static list of knowledge items (we can embed the sample data directly in the page component for the story or override any fetch hooks to return the sample). If the page expects to call an API, use Storybook's parameters/mocks (there is a Storybook addon for MSW – Mock Service Worker – to simulate API calls). But simpler: structure the page component so that if `process.env.STORYBOOK` is set, it uses a predefined list instead of fetching.
- **ResourcesPage**: Similarly, provide sample data and maybe pre-set filter state for story variations.
- **CommunityPage**: Provide sample posts or a flag for logged in/out as needed.
- **SubscriptionPage**: Control for subscribed vs not.

These page stories will let us review the **layout and integration** of all components together. For example, the KnowledgePage story will show the Navbar at top, filter bar, and a list of KnowledgeCards in situ, ensuring spacing and alignment are good.

### 4.4 Simulating User Flows (Top-Level Story)

To simulate real user flows, we can create a special Storybook story or a set of stories that step through a sequence:

- One approach is to create a story for each step of a flow. For instance:
  - “Flow – New User Journey” could be a story sequence: HomePage (marketing) → Signup → Knowledge page (empty because no content until subscribed maybe) → SubscriptionPage → Knowledge page (full after subscribing) → Community page. Each “step” might be a sub-story, or we can instruct the reader to switch stories in order.
- However, the prompt suggests a single top-level story combining pages and simulating flows with sample data. Storybook doesn’t natively allow multi-scene flows in one story, but we can improvise:
  - Create a React component that maintains an internal state for `currentStep` and renders different page components based on it. Include buttons in the story to move between steps (or simulate actions).
  - For example, a story component that initially renders `<HomePage onSignupClick={() => setStep('signup')}/>`; then if state is 'signup', it renders `<SignupPage onSuccess={() => setStep('knowledge')}/>`. We won't actually wait for a real signup; instead, we simulate the outcome (onSuccess).
  - This component can use the actual page components, and for things like KnowledgePage, we might assume the user is not yet subscribed, so maybe we show a limited view or prompt (depending on how we decide access).
  - After subscription, set some global context (like authStore.isSubscriber = true) and then render KnowledgePage again with full data, then allow clicking community etc.
  - This is somewhat complex to implement, but it would effectively show a clickable demo of the user’s path.
- If the above is too complex, an alternative is to simply showcase an **“App” story** where we display the main logged-in state: e.g. Navbar + KnowledgePage as default content, and perhaps knobs to switch the displayed page (like a radio control for “currentPage: knowledge/resources/community”). This would simulate navigation by manually switching via Storybook controls:
  - We can create a component `AppSimulator` that takes a prop `page` and renders the corresponding page component. In Storybook controls, define options for page: 'knowledge' | 'resources' | 'community'. Then the viewer can toggle pages from the controls dropdown. The state (like selected category or filter) could persist if we keep the component mounted and just switch children. We might need to ensure the Zustand store is not reset between toggles (persisting store across story re-renders could be tricky unless it’s at module scope).
  - Additionally, include a control for “isSubscribed” and “isLoggedIn” in that story to see how UI changes (e.g. if isSubscribed = false, maybe the community page story element shows the upgrade prompt).
  - This would fulfill the idea of simulating different user states in one place.

Given the scope, the simpler approach might be the latter: a single story where you can toggle between pages and user states. It won't literally show an animated flow, but it allows exploring the app's various screens as a user would.

**Implementing the App story:**

- In `App.stories.tsx`, compose something like:

  ```tsx
  const Template = ({ page, loggedIn, subscribed }) => {
    // set up auth store values based on controls
    useAuthStore.setState({
      isLoggedIn: loggedIn,
      user: loggedIn ? { name: 'Demo User', subscribed } : null,
    });
    // maybe subscribed info is part of user or separate store
    return (
      <>
        {loggedIn && <Navbar />}
        {page === 'knowledge' && <KnowledgePage />}
        {page === 'resources' && <ResourcesPage />}
        {page === 'community' && <CommunityPage />}
        {!loggedIn && <HomePage />}
      </>
    );
  };
  ```

  Where controls for page = ['home','knowledge','resources','community'], loggedIn (bool), subscribed (bool). This is pseudo-code; adjusting for actual store usage may differ.

- This story, with some documentation, effectively lets someone replicate logging in/out and switching sections, confirming that all components integrate well (no weird layout shifts between pages, etc.).

Remember to also test responsiveness if possible. Storybook has viewport options – we should check that pages like Knowledge and Resources adapt to mobile (e.g. category filter might become a dropdown on small width, the grid becomes single column, Navbar turns into hamburger menu, etc.). We can mention using Storybook’s viewport toolbar to verify mobile layouts as part of the guide.

Finally, **document the storybook usage**: in the guide we should mention that Storybook serves as a living style guide and interactive demo for the team, making sure that the design system approach (atoms→pages) holds up and that everything appears WYOS-tailored and professional.

---

By following this structured approach, we have:

- Built atomic components (buttons, inputs, etc.) with a consistent dark theme and interactive states.
- Combined them into feature-rich molecules/organisms like KnowledgeCard, ResourceItem, and CommunityPostPreview that align with WYOS’s unique content and interactions (curation, 5-star ratings, forum previews with real talk).
- Assembled complete pages for all main flows (Auth, Knowledge, Resources, Community, Subscription, Marketing), ensuring cohesive layouts and navigation. The aesthetic is modern and premium, using **dark mode + glassmorphism** as per the design philosophy, and adding smooth motion for a polished UX.
- Integrated global state via Zustand for authentication (login, session) and used it (plus context/props) to control UI element states (e.g. showing/hiding certain elements based on login/subscription status).
- Provided an extensive Storybook documentation, with stories from the smallest atom to composite pages. This not only tests each piece in isolation but also simulates real usage scenarios with sample data from WYOS content.

Following this guide, a developer can incrementally build and verify each part of the WYOS frontend. The end result will be a **fully functional, design-consistent application** that truly reflects WYOS’s vision of an honest, no-BS platform – from the smooth dark UI to the intuitive interactions that encourage users to explore, engage, and ultimately _write their own story_.
