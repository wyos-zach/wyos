# Building WYOS Frontend Step by Step Guide

We’re in the middle of building Writing Your Own Story (WYOS), a premium web application that combines curated knowledge, vetted resources, and an authentic community. The project is already initialized with Next.js, TypeScript, and the App Router, and Tailwind CSS is set up with some colors defined but no dark/light mode theming yet. The folder structure already exists, and we’re ready to build the full frontend.

This guide goes step-by-step from our current state to a complete, working frontend, using atomic design principles to create components—from small atoms to full pages—and integrates subtle, Apple-inspired animations with Motion (motion/react) to enhance interactivity without distraction.

Everything will be centralized in our design system (src/app/(core)/design-system/page.tsx), providing a single hub for components, variants, and documentation. By the end, we’ll have a fully functional WYOS frontend with routing, data management, theming, and more, ready for future backend integration.

---

## Phase 1: Establish Core Infrastructure

Since the project is initialized, we’ll enhance the foundation to support the full frontend, starting with state, routing, and the design system hub.

### Step 1: Set Up Global State Management

- **What**: Establish Zustand stores to manage app-wide state for authentication and UI settings.
- **Why**: Provides a consistent way to track user login status, theming, and other global settings across components and pages, reducing confusion as we build.
- **Remember:** We’re using Appwrite for Authentication so make sure the store aligns with the way Appwrite handles Auth and the syntax Appwrite uses.
- **How to Do It**:
  - Create a folder src/stores/ if it doesn’t exist.
  - Build an Auth store (e.g., src/stores/Auth.ts):
    - Add states: user (to hold user data or null), isAuthenticated (true/false for login status), isSubscribed (true/false for membership status).
    - Add actions: login (to set user and authenticate), logout (to clear user and reset).
  - Build a UI store (e.g., src/stores/Ui.ts):
    - Add states: theme (default to "dark" since WYOS is dark-mode-first), isMobileMenuOpen (for mobile navigation).
    - Add actions: toggleTheme (switch between dark/light), openMobileMenu, closeMobileMenu.
  - Make sure both stores persist their state (e.g., to localStorage) so settings stick between refreshes.
  - Plan to test the stores later in Navbar to confirm login, subscription, and theme states work.
- **What’s Next**: Use these stores in navigation and theming steps later.

### Step 2: Configure Routing for All Pages

- **What**: Define the full routing structure using Next.js’s file-based routing system.
- **Why**: Sets up the backbone of our app, connecting all pages and ensuring navigation works, so we can see the app take shape.
- **How to Do It**:
  - Organize the src/app/ directory into route groups:
    - Public routes: Keep src/app/page.tsx as the homepage.
    - Protected routes: Create src/app/(core)/ for pages like knowledge/page.tsx, resources/page.tsx, community/page.tsx, design-system/page.tsx (already exists).
    - Auth routes: Create src/app/(auth)/ for login/page.tsx, signup/page.tsx.
  - Add dynamic routes for detail pages:
    - src/app/knowledge/[id]/page.tsx for individual knowledge items.
    - src/app/resources/[id]/page.tsx for individual resources.
  - Add a src/app/subscription/page.tsx route (public or protected, depending on the preference).
  - For each route, add a basic placeholder (e.g., “Knowledge Page Coming Soon”) to confirm routing works.
  - Plan route protection: set up middleware (e.g., middleware.ts) or redirect logic to guard (core) routes for logged-in users only.
  - Create src/app/not-found.tsx with a simple 'Page Not Found' message for invalid routes.
- **What’s Next**: Build navigation to link these routes.

### Step 3: Enhance the Design System Page as our Central Hub

- **What**: Expand src/app/(core)/design-system/page.tsx to be the one-stop place for all components, variants, and documentation.
- **Why**: Gives a Storybook-like experience without the setup hassle, keeping everything organized and testable in one spot as we build.
- **How to Do It**:
  - Open src/app/(core)/design-system/page.tsx and structure it with clear sections:
    - Add a header (e.g., “WYOS Design System”) and intro text.
    - Create section placeholders: “Atoms”, “Molecules”, “Organisms”, “Pages”, “Styles”, “User Flows”.
  - Add a navigation menu at the top with links to each section, making it easy to jump around.
  - Plan to fill each section as we build: atoms will show buttons, pages will demo full screens, etc.
  - Make it protected: add a check using AuthStore to redirect non-logged-in users to LoginPage (align with Step 2’s route protection).
  - Use visual separators (e.g., headings or borders) between sections to improve readability in the design system page.
- **What’s Next**: Start adding components to these sections as we create them.

---

## Phase 2: Build Core Atomic Components

Begin with the smallest building blocks (atoms) that we’ll use everywhere, adding them to the design system as we go.

### Step 4: Create and Document Core Atoms

- **What**: Build all the basic UI atoms our app needs and showcase them in the design system.
- **Why**: These are the reusable pieces that make up everything else, and documenting them now keeps us on track as a beginner.
- **How to Do It**:
  - Create a src/components/atoms/ folder if it doesn’t exist.
  - Build each atom below, then add it to the “Atoms” section of the design system page with its variants and states:
    - **Button**: Define props (variant like "primary"/"secondary", size, disabled, loading, onClick), states (normal, hover, active, disabled, loading), and add a subtle Motion animation (e.g., slight scale on hover).
    - **TextInput**: Define props (type, value, placeholder, disabled, hasError, onChange), states (normal, focused, disabled, error), and support a ref for focus.
    - **Textarea**: Define props (value, placeholder, rows, disabled, hasError, onChange), states (normal, focused, disabled, error), and a ref.
    - **Select**: Define props (options, value, placeholder, disabled, onChange), states (normal, open, disabled), and a ref.
    - **Label**: Define props (htmlFor, children, required), states (normal, required).
    - **Checkbox**: Define props (id, checked, label, disabled, onChange), states (checked, unchecked, disabled).
    - **ToggleSwitch**: Define props (checked, disabled, onChange), states (on, off, disabled), and a Motion slide animation.
    - **Badge**: Define props (text, variant, icon), states (normal by variant).
    - **Avatar**: Define props (src, alt, size, fallback), states (image loaded, fallback with initials).
    - **Spinner**: Define props (size, color), states (spinning).
    - **Card**: Define props (children, variant like "default"/"glass", onClick), states (normal, hovered), and a Motion entrance (e.g., fade-in).
    - **Icon**: Define props (name for icon type, size, color), states (normal).
    - **Heading**: Define props (level like "h1"/"h2", children), states (normal).
    - **Text**: Define props (children, variant like "default"/"subtle"), states (normal).
    - **ThemeToggle**: Define props (none, uses UIStore), states (light, dark), actions (toggle theme), and a Motion transition (e.g., icon rotate).
    - **StarRating**: Define props (rating, max, onRate), states (filled stars, empty stars), actions (onRate for interactivity), and a subtle Motion animation (e.g., star fill transition); demo in “Atoms” section.
  - For each atom in the design system:
    - Show all variants (e.g., Button primary, secondary).
    - Demo all states (e.g., TextInput focused, error).
    - Add a simple note (e.g., “Used for form submissions”).
    - Include basic accessibility: add attributes like aria-label (e.g., for Button if icon-only), role (e.g., switch for ToggleSwitch), and aria-checked where needed.
    - Test all variants and states in the design system (e.g., click Button to see loading, toggle Checkbox to see checked).
- **What’s Next**: Combine these into molecules.

---

## Phase 3: Build Molecule Components

Move up to molecules—combinations of atoms with specific purposes—and integrate them into the design system.

### Step 5: Create and Document Molecules

- **What**: Build molecules that add functionality by combining atoms, and add them to the design system.
- **Why**: These bridge the gap between basic atoms and complex organisms, making the app more interactive.
- **How to Do It**:
  - Create a src/components/molecules/ folder if it doesn’t exist.
  - Build each molecule below, then add it to the “Molecules” section of the design system:
    - **FormField**: Define props (label, htmlFor, children like TextInput), states (normal, error), and forward a ref to the child input; demo with TextInput and Checkbox.
    - **CategoryNav**: Define props (categories, selectedCategory, onSelect), states (selected, unselected), and add a Motion highlight for the active category; demo with sample categories (e.g., “Habits”, “Mindset”).
    - **SearchBar**: Define props (value, onChange, placeholder), states (normal, focused), and a ref; demo with a searchable list.
    - **CommentItem**: Define props (username, text, timestamp, avatar), states (normal); demo with mock comment data.
    - **CommentForm**: Define props (onSubmit), states (normal, submitting), and a ref for the textarea; demo with Textarea and Button.
    - **FilterBar**: Define props (filters for categories/ratings, sortBy for order like name/date, onFilterChange), states (active filters), and Motion transitions for toggles; demo with filter options (e.g., “Books”, “4+ stars”) and sorting.
    - **InputGroup**: Define props (children like TextInput, icon), states (normal); demo with TextInput and Icon in “Molecules” section.
  - In the design system:
    - Show how atoms combine (e.g., FormField with Label and TextInput).
    - Demo states and interactions (e.g., SearchBar typing).
    - Add a usage note (e.g., “For filtering resources”).
    - Include basic accessibility: add attributes like aria-label (e.g., for SearchBar), role (e.g., navigation for CategoryNav).
- **What’s Next**: Use these in organisms.

---

## Phase 4: Build Organism Components

Create larger, multi-part components (organisms) that form the main UI blocks.

### Step 6: Create and Document Organisms

- **What**: Build organisms that combine atoms and molecules into complex units, and add them to the design system.
- **Why**: These are the key pieces of the app’s interface, like cards and navigation bars.
- **How to Do It**:
  - Create a src/components/organisms/ folder if it doesn’t exist.
  - Build each organism below, then add it to the “Organisms” section of the design system:
    - **Navbar**: Use AuthStore and UIStore for states (logged in with avatar, logged out with login/signup, mobile menu open/closed, error for auth failure), actions (toggle menu, theme, login/logout), and Motion for menu slide-in; demo both logged-in, logged-out, and error states.
    - **Footer**: Add static content (e.g., copyright, links); demo as a simple footer.
    - **KnowledgeCard**: Define props (title, summary, category, href, onClick), states (normal, hovered), and a Motion hover lift; demo with mock data.
    - **KnowledgeGrid**: Define props (items), states (populated, empty, loading with Spinner), and Motion stagger for card entry; demo with multiple cards.
    - **ResourceCard**: Define props (title, description, type, imageUrl, href, onClick), states (normal, hovered), and Motion hover; demo with different types (e.g., Book, App).
    - **ResourceGrid**: Define props (items), states (populated, empty, loading), and Motion stagger; demo with multiple resources.
    - **CommunityPostPreview**: Define props (title, excerpt, author, avatarUrl, repliesCount, postedAt, href), states (normal, hovered); demo with mock posts.
    - **PricingCard**: Define props (title, price, features, onSubscribe), states (normal, hovered), and Motion hover; demo with a sample plan.
    - **CommentList**: Define props (comments as an array of CommentItem props), states (populated, empty); demo with multiple CommentItems in “Comments” section.
  - In the design system:
    - Show full demos (e.g., Navbar with mobile toggle).
    - Highlight states (e.g., KnowledgeGrid empty).
    - Note usage (e.g., “Displays resource recommendations”).
    - Include basic accessibility: add attributes like role=\"navigation\" for Navbar, aria-label for KnowledgeCard titles.
- **What’s Next**: Prepare data for dynamic content.

---

## Phase 5: Set Up Data and State Management

Add data and app-wide state to make the app functional and dynamic.

### Step 7: Create Mock Data for Content

- **What**: Define sample data to simulate Knowledge, Resources, and Community content.
- **Why**: Lets us build and test the app without a backend, keeping us moving forward until Appwrite integration.
- **How to Do It**:
  - Create a src/data/ folder if it doesn’t exist.
  - Define mock data files (e.g., mockData.ts):
    - knowledgeItems: Array with id, title, summary, category (e.g., “Habits”).
    - resourceItems: Array with id, title, description, type, imageUrl.
    - communityPosts: Array with title, excerpt, author, avatarUrl, repliesCount, postedAt.
  - Make sure each matches the props of KnowledgeCard, ResourceCard, and CommunityPostPreview.
  - Ensure data fields match component props (e.g., id aligns with route params for detail pages).
- **What’s Next**: Use this data in grids and pages.

### Step 8: Plan Data Fetching Placeholders

- **What**: Set up placeholders to simulate data fetching and prepare for real data later.
- **Why**: Ensures the app handles loading and errors now, making backend integration smoother later.
- **How to Do It**:
  - Add loading states with Spinner to KnowledgeGrid, ResourceGrid, and CommunityPage.
  - Simulate fetching in these components (e.g., delay mock data load to mimic a network request).
  - Plan for Appwrite: note where real data will replace mocks (e.g., KnowledgePage fetching articles).
  - Plan error states for failed fetches (e.g., show 'Failed to load' in grids and pages).
- **What’s Next**: Manage app state.

### Step 9: Manage App-Wide State for Filters and Search

- **What**: Extend UIStore to handle filtering and search across pages.
- **Why**: Keeps these features consistent and centralized, avoiding duplicate work.
- **How to Do It**:
  - Update UIStore:
    - Add states: knowledgeFilters (e.g., category), resourcesFilters (e.g., type, rating), searchQuery (string).
    - Add actions: setKnowledgeFilters, setResourcesFilters, setSearchQuery, resetFilters (to clear filters), resetSearchQuery (to clear search).
  - Plan to connect CategoryNav, FilterBar, and SearchBar to these states and actions.
- **What’s Next**: Build pages with this data.

---

## Phase 6: Build Pages and Connect User Flows

Assemble full pages and link them into a cohesive app with user flows.

### Step 10: Create and Document All Pages

- **What**: Build every page the app needs and add them to the design system.
- **Why**: These are the screens users interact with, bringing the app to life.
- **How to Do It**:
  - Build each page below, then add it to the “Pages” section of the design system:
    - **HomePage** (src/app/page.tsx): Add static content (e.g., hero text, call-to-action Button); demo as the landing page.
    - **LoginPage** (src/app/(auth)/login/page.tsx): Use FormField, Button, states (normal, submitting, error), actions (submit form); demo with mock login.
    - **SignupPage** (src/app/(auth)/signup/page.tsx): Similar to LoginPage, states (normal, submitting, error), actions (submit); demo with mock signup.
    - **KnowledgePage** (src/app/(core)/knowledge/page.tsx): Use CategoryNav, SearchBar, KnowledgeGrid, states (filtered, unfiltered, empty, loading), actions (filter, search); demo with mock data.
    - **ResourcesPage** (src/app/(core)/resources/page.tsx): Use FilterBar, SearchBar, ResourceGrid, states (filtered, unfiltered, empty, loading), actions (filter, search); demo with mock data.
    - **SubscriptionPage** (src/app/subscription/page.tsx): Use PricingCard, states (normal, subscribed), actions (subscribe); demo with a sample plan.
    - **CommunityPage** (src/app/(core)/community/page.tsx): Use CommunityPostPreview, states (logged in, logged out, loading), actions (navigate to forum); demo with mock posts.
    - **KnowledgeDetailPage** (src/app/knowledge/[id]/page.tsx): Use Heading, Text, mock data, states (loaded, loading, error); demo with a sample item.
    - **ResourceDetailPage** (src/app/resources/[id]/page.tsx): Similar to KnowledgeDetailPage, states (loaded, loading, error); demo with a sample resource.
  - In the design system:
    - Show each page’s layout and states (e.g., LoginPage submitting).
    - Note its purpose (e.g., “Displays curated knowledge”).
    - Add basic accessibility: use role=\"main\" for page content, aria-label for key sections (e.g., 'Knowledge list').
    - Add subtle Motion entry animations (e.g., fade-in for page content) to enhance UX.
- **What’s Next**: Link pages together.

### Step 11: Connect Pages with Routing and Navigation

- **What**: Link all pages using Navbar and internal navigation flows.
- **Why**: Turns the app into a navigable experience, ensuring users can move seamlessly.
- **How to Do It**:
  - Update Navbar to include links to HomePage, KnowledgePage, ResourcesPage, CommunityPage, SubscriptionPage, and auth pages (LoginPage, SignupPage).
  - Add navigation logic:
    - For logged-in users, show Navbar with protected routes and a logout action.
    - For logged-out users, show login/signup links and redirect from (core) routes to LoginPage.
  - Connect cards to detail pages:
    - KnowledgeCard links to KnowledgeDetailPage using its href.
    - ResourceCard links to ResourceDetailPage.
    - CommunityPostPreview links to an external forum (or placeholder).
  - Test basic navigation: click through Navbar and cards to ensure routing works.
  - Optional: Add breadcrumb links in detail pages (e.g., 'Back to Knowledge' in KnowledgeDetailPage).
  - Clarify route protection: set up middleware.ts at src/ or use redirect logic in (core) pages to check AuthStore and redirect to LoginPage if not authenticated.
- **What’s Next**: Simulate key user flows.

### Step 12: Simulate User Flows in the Design System

- **What**: Add a “User Flows” section to the design system page to test key journeys.
- **Why**: Ensures the app works as a whole, like Storybook’s scenario testing, without needing real data yet.
- **How to Do It**:
  - In the “User Flows” section, create a demo with these steps:
    - Start at HomePage with a “Sign Up” button.
    - Move to SignupPage, then auto-advance to KnowledgePage on submit.
    - Show KnowledgeCard navigation to KnowledgeDetailPage.
    - Offer a SubscriptionPage link from KnowledgePage.
    - Include a login flow: Start at HomePage, move to LoginPage, then to KnowledgePage on submit.
  - Use a simple state switch (e.g., next/previous buttons) to move between steps, showing relevant components.
  - Add a note explaining each flow (e.g., “New user signs up and explores knowledge”).
- **What’s Next**: Add theming.

---

## Phase 7: Implement Theming and Responsiveness

Polish the app with a consistent, premium look and feel across devices.

### Step 13: Set Up Dark/Light Mode Theming

- **What**: Enable full theming with Tailwind and UIStore, defaulting to dark mode.
- **Why**: WYOS is dark-mode-first, and theming ensures a professional, user-friendly experience.
- **How to Do It**:
  - Update the Tailwind config to enable darkMode: 'class'.
  - Use UIStore’s theme state to toggle the dark class on the `<html>` element (e.g., via Navbar or a layout wrapper).
  - Add dark/light variants to all components:
    - For Button, Card, etc., define dark styles (e.g., lighter text, darker backgrounds).
    - Ensure ThemeToggle switches the theme and updates the UI instantly.
  - Test the default dark mode and toggle to light mode to confirm it works across the app.
  - Optional: Support system theme by checking prefers-color-scheme and syncing with UIStore’s theme.
- **What’s Next**: Make it responsive.

### Step 14: Ensure Responsive Design Across Devices

- **What**: Make all components and pages work on mobile and desktop.
- **Why**: Matches Apple’s seamless UX, ensuring accessibility for all users.
- **How to Do It**:
  - Review each component (e.g., Navbar, KnowledgeGrid) and add responsive layouts:
    - Stack elements on mobile (e.g., grids to single column).
    - Adjust sizes and spacing for desktop (e.g., wider cards).
  - Update pages to reflow (e.g., KnowledgePage sidebar becomes top bar on mobile).
  - Test on different screen sizes to ensure Motion animations remain subtle and effective.
  - Test responsiveness using browser dev tools to simulate mobile, tablet, and desktop sizes.
- **What’s Next**: Document and test.

---

## Phase 8: Documentation and Testing

Finalize the design system and ensure everything works as expected.

### Step 15: Document Components in the Design System

- **What**: Fully document all components within the design system page.
- **Why**: Keeps everything in one place, like Storybook’s docs, so we can reference and reuse them easily.
- **How to Do It**:
  - For each component in its section (Atoms, Molecules, etc.):
    - Write a short purpose (e.g., “Button: Triggers actions like submitting forms”).
    - List all props (e.g., “variant: Sets style to primary, secondary”).
    - Demo all states and variants (e.g., Button loading, Card glass).
    - Add a usage note (e.g., “Use in forms or navigation”).
  - Add a “Styles” section:
    - List Tailwind colors from our config.
    - Describe Motion animation guidelines (e.g., “Subtle scale on hover, 200ms duration”).
- **What’s Next**: Test the app.

### Step 16: Test Component Variants and User Flows

- **What**: Test every component and flow to confirm they work as intended.
- **Why**: Prevents surprises later, ensuring our app is reliable from the start.
- **How to Do It**:
  - In the design system:
    - Test each atom’s variants (e.g., Button sizes, Badge colors).
    - Check molecule states (e.g., SearchBar focused).
    - Verify organism interactions (e.g., Navbar menu toggle).
  - Walk through user flows:
    - Home → Signup → Knowledge → Subscription.
    - Click KnowledgeCard to KnowledgeDetailPage.
    - Ensure Motion animations are subtle (e.g., no jerky or over-the-top effects).
    - Test accessibility: tab through components with the keyboard, check screen reader labels (e.g., use browser tools or a screen reader).
- **What’s Next**: Add final polish.

---

## Phase 9: Finalize the Frontend

Add the finishing touches to make our app complete and robust.

### Step 17: Add Error Handling and User Feedback

- **What**: Implement error handling and feedback mechanisms across the app.
- **Why**: Improves user experience by showing loading states and errors clearly, avoiding confusion.
- **How to Do It**:
  - Add error states to key components and pages:
    - LoginPage, SignupPage (e.g., “Invalid credentials”).
    - KnowledgePage, ResourcesPage (e.g., “No items found” beyond empty state).
  - Use Spinner for loading in grids and detail pages during mock data delays.
  - Plan simple feedback: add placeholder text (e.g., “Submitting…”) for now, noting we’ll add toasts later if needed.
  - Plan success feedback: add placeholder text (e.g., ‘Logged in!’ or ‘Subscribed!’) for successful actions like login or subscription.
- **What’s Next**: Audit everything.

### Step 18: Audit the Entire Frontend

- **What**: Review every part of the app to ensure it’s complete and works together.
- **Why**: Catches any missed pieces or issues before we move to the next phase (e.g., backend).
- **How to Do It**:
  - Check the design system: all components are present with demos and docs.
  - Test routing: navigate all routes via Navbar and card links.
  - Verify data: mock data loads in grids and detail pages.
  - Confirm theming: dark mode default, light mode toggle works everywhere.
  - Ensure responsiveness: test mobile and desktop views.
  - Act like a user: try signing up, browsing knowledge, subscribing—does it feel right?
  - Check performance: ensure Motion animations are smooth and don’t lag (e.g., test on slower devices if possible).
- **What’s Next**: Wrap up.

### Step 19: Prepare for Next Steps and Celebrate

- **What**: Finalize the frontend and set up for future work (e.g., backend integration).
- **Why**: Ensures we’re ready to move forward and acknowledges our progress.
- **How to Do It**:
  - Update or create a README.md:
    - Explain how to run the app (e.g., pnpm dev).
    - Summarize the frontend (e.g., “Dark-mode app with design system”).
    - List todos (e.g., “Connect to Appwrite”, “Add real forum data”).
- Take a moment to celebrate: we’ve built a full frontend from atoms to pages!
- **What’s Next**: we’re done—move to backend or polish as needed!
