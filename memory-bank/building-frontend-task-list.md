# Building WYOS Frontend Task List

This task list aligns with the Building WYOS Frontend Step-by-Step Guide, providing a checklist to build the WYOS frontend from our current state. Each task matches a step or sub-step in the guide, ensuring nothing is missed.

Check off each task as completed to track the progress toward a fully functional frontend with components, routing, data, theming, and documentation, all centralized in src/app/(core)/design-system/page.tsx.

---

## Phase 1: Establish Core Infrastructure

### Step 1: Set Up Global State Management

- [ ] Create a src/stores/ folder if it doesn’t exist.
- [ ] Build AuthStore in src/stores/authStore.ts:
  - [ ] Add states: user, isAuthenticated, isSubscribed.
  - [ ] Add actions: login, logout.
- [ ] Build UIStore in src/stores/uiStore.ts:
  - [ ] Add states: theme (default "dark"), isMobileMenuOpen.
  - [ ] Add actions: toggleTheme, openMobileMenu, closeMobileMenu.
- [ ] Make both stores persist their state to localStorage.
- [ ] Plan to test stores in Navbar later.

### Step 2: Configure Routing for All Pages

- [ ] Organize src/app/ into route groups:
  - [ ] Keep src/app/page.tsx as the homepage (public).
  - [ ] Create src/app/(core)/ for protected pages: knowledge/page.tsx, resources/page.tsx, community/page.tsx, design-system/page.tsx.
  - [ ] Create src/app/(auth)/ for auth pages: login/page.tsx, signup/page.tsx.
- [ ] Add dynamic routes:
  - [ ] Create src/app/knowledge/[id]/page.tsx for knowledge items.
  - [ ] Create src/app/resources/[id]/page.tsx for resources.
- [ ] Add src/app/subscription/page.tsx route (public or protected).
- [ ] Add basic placeholders to each route (e.g., “Knowledge Page Coming Soon”).
- [ ] Plan route protection with middleware or redirects for (core) routes.
- [ ] Create src/app/not-found.tsx with a “Page Not Found” message.

### Step 3: Enhance the Design System Page as the Central Hub

- [ ] Open src/app/(core)/design-system/page.tsx and structure it:
  - [ ] Add a header (e.g., “WYOS Design System”) and intro text.
  - [ ] Create section placeholders: “Atoms”, “Molecules”, “Organisms”, “Pages”, “Styles”, “User Flows”.
- [ ] Add a navigation menu with links to each section (e.g., `<a href="#atoms">Atoms</a>`).
- [ ] Plan to fill sections with component demos as we build.
- [ ] Protect the page using AuthStore to redirect non-logged-in users to LoginPage.
- [ ] Use visual separators (e.g., headings or borders) between sections.

---

## Phase 2: Build Core Atomic Components

### Step 4: Create and Document Core Atoms

- [ ] Create a src/components/atoms/ folder if it doesn’t exist.
- [ ] Build and add each atom to the “Atoms” section of the design system:
  - [ ] **Button**: Add props (variant, size, disabled, loading, onClick), states (normal, hover, active, disabled, loading), Motion (scale on hover).
  - [ ] **TextInput**: Add props (type, value, placeholder, disabled, hasError, onChange), states (normal, focused, disabled, error), ref for focus.
  - [ ] **Textarea**: Add props (value, placeholder, rows, disabled, hasError, onChange), states (normal, focused, disabled, error), ref.
  - [ ] **Select**: Add props (options, value, placeholder, disabled, onChange), states (normal, open, disabled), ref.
  - [ ] **Label**: Add props (htmlFor, children, required), states (normal, required).
  - [ ] **Checkbox**: Add props (id, checked, label, disabled, onChange), states (checked, unchecked, disabled).
  - [ ] **ToggleSwitch**: Add props (checked, disabled, onChange), states (on, off, disabled), Motion (slide).
  - [ ] **Badge**: Add props (text, variant, icon), states (normal).
  - [ ] **Avatar**: Add props (src, alt, size, fallback), states (image, fallback).
  - [ ] **Spinner**: Add props (size, color), states (spinning).
  - [ ] **Card**: Add props (children, variant, onClick), states (normal, hovered), Motion (fade-in).
  - [ ] **Icon**: Add props (name, size, color), states (normal).
  - [ ] **Heading**: Add props (level, children), states (normal).
  - [ ] **Text**: Add props (children, variant), states (normal).
  - [ ] **ThemeToggle**: Add props (none, uses UIStore), states (light, dark), actions (toggle theme), Motion (icon rotate).
  - [ ] **StarRating**: Add props (rating, max, onRate), states (filled, empty), actions (onRate), Motion (star fill).
- [ ] For each atom in the design system:
  - [ ] Show all variants.
  - [ ] Demo all states.
  - [ ] Add a simple note (e.g., “Used for…”).
  - [ ] Include basic accessibility (e.g., aria-label for Button, role for Card).
  - [ ] Test all variants and states (e.g., click Button to see loading).

---

## Phase 3: Build Molecule Components

### Step 5: Create and Document Molecules

- [ ] Create a src/components/molecules/ folder if it doesn’t exist.
- [ ] Build and add each molecule to the “Molecules” section of the design system:
  - [ ] **FormField**: Add props (label, htmlFor, children), states (normal, error), forward ref; demo with TextInput.
  - [ ] **CategoryNav**: Add props (categories, selectedCategory, onSelect), states (selected, unselected), Motion (highlight); demo with categories.
  - [ ] **SearchBar**: Add props (value, onChange, placeholder), states (normal, focused), ref; demo with list.
  - [ ] **CommentItem**: Add props (username, text, timestamp, avatar), states (normal); demo with mock data.
  - [ ] **CommentForm**: Add props (onSubmit), states (normal, submitting), ref; demo with Textarea.
  - [ ] **FilterBar**: Add props (filters, sortBy, onFilterChange), states (active filters), Motion (toggles); demo with options.
  - [ ] **InputGroup**: Add props (children, icon), states (normal); demo with TextInput and Icon.
- [ ] In the design system:
  - [ ] Show how atoms combine.
  - [ ] Demo states and interactions.
  - [ ] Add a usage note.
  - [ ] Include basic accessibility (e.g., aria-label for SearchBar).

---

## Phase 4: Build Organism Components

### Step 6: Create and Document Organisms

- [ ] Create a src/components/organisms/ folder if it doesn’t exist.
- [ ] Build and add each organism to the “Organisms” section of the design system:
  - [ ] **Navbar**: Use AuthStore/UIStore for states (logged in, logged out, mobile menu, error), actions (toggle menu, theme, login/logout), Motion (slide-in); demo all states.
  - [ ] **Footer**: Add static content; demo as footer.
  - [ ] **KnowledgeCard**: Add props (title, summary, category, href, onClick), states (normal, hovered), Motion (lift); demo with data.
  - [ ] **KnowledgeGrid**: Add props (items), states (populated, empty, loading), Motion (stagger); demo with cards.
  - [ ] **ResourceCard**: Add props (title, description, type, imageUrl, href, onClick), states (normal, hovered), Motion (hover); demo with types.
  - [ ] **ResourceGrid**: Add props (items), states (populated, empty, loading), Motion (stagger); demo with resources.
  - [ ] **CommunityPostPreview**: Add props (title, excerpt, author, avatarUrl, repliesCount, postedAt, href), states (normal, hovered); demo with posts.
  - [ ] **PricingCard**: Add props (title, price, features, onSubscribe), states (normal, hovered), Motion (hover); demo with plan.
  - [ ] **CommentList**: Add props (comments), states (populated, empty); demo with CommentItems.
- [ ] In the design system:
  - [ ] Show full demos.
  - [ ] Highlight states.
  - [ ] Note usage.
  - [ ] Include basic accessibility (e.g., role="navigation" for Navbar).

---

## Phase 5: Set Up Data and State Management

### Step 7: Create Mock Data for Content

- [ ] Create a src/data/ folder if it doesn’t exist.
- [ ] Define mock data in mockData.ts:
  - [ ] Add knowledgeItems with id, title, summary, category.
  - [ ] Add resourceItems with id, title, description, type, imageUrl.
  - [ ] Add communityPosts with title, excerpt, author, avatarUrl, repliesCount, postedAt.
- [ ] Match data to KnowledgeCard, ResourceCard, CommunityPostPreview props.
- [ ] Ensure data fields align with component props (e.g., id for routes).

### Step 8: Plan Data Fetching Placeholders

- [ ] Add loading states with Spinner to KnowledgeGrid, ResourceGrid, CommunityPage.
- [ ] Simulate fetching in these components with delayed mock data.
- [ ] Note where Appwrite will replace mocks (e.g., KnowledgePage).
- [ ] Plan error states for failed fetches (e.g., “Failed to load”).

### Step 9: Manage App-Wide State for Filters and Search

- [ ] Update UIStore:
  - [ ] Add states: knowledgeFilters, resourcesFilters, searchQuery.
  - [ ] Add actions: setKnowledgeFilters, setResourcesFilters, setSearchQuery, resetFilters, resetSearchQuery.
- [ ] Plan to connect CategoryNav, FilterBar, SearchBar to these states/actions.

---

## Phase 6: Build Pages and Connect User Flows

### Step 10: Create and Document All Pages

- [ ] Build and add each page to the “Pages” section of the design system:
  - [ ] **HomePage** (src/app/page.tsx): Add static content, Button; demo as landing.
  - [ ] **LoginPage** (src/app/(auth)/login/page.tsx): Use FormField, Button, states (normal, submitting, error), actions (submit); demo mock login.
  - [ ] **SignupPage** (src/app/(auth)/signup/page.tsx): Use FormField, Button, states (normal, submitting, error), actions (submit); demo mock signup.
  - [ ] **KnowledgePage** (src/app/(core)/knowledge/page.tsx): Use CategoryNav, SearchBar, KnowledgeGrid, states (filtered, unfiltered, empty, loading), actions (filter, search); demo with data.
  - [ ] **ResourcesPage** (src/app/(core)/resources/page.tsx): Use FilterBar, SearchBar, ResourceGrid, states (filtered, unfiltered, empty, loading), actions (filter, search); demo with data.
  - [ ] **SubscriptionPage** (src/app/subscription/page.tsx): Use PricingCard, states (normal, subscribed), actions (subscribe); demo with plan.
  - [ ] **CommunityPage** (src/app/(core)/community/page.tsx): Use CommunityPostPreview, states (logged in, logged out, loading), actions (navigate); demo with posts.
  - [ ] **KnowledgeDetailPage** (src/app/knowledge/[id]/page.tsx): Use Heading, Text, mock data, states (loaded, loading, error); demo with item.
  - [ ] **ResourceDetailPage** (src/app/resources/[id]/page.tsx): Use Heading, Text, mock data, states (loaded, loading, error); demo with resource.
- [ ] In the design system:
  - [ ] Show each page’s layout and states.
  - [ ] Note its purpose.
- [ ] Add accessibility: use role="main", aria-label for sections.
- [ ] Add Motion entry animations (e.g., fade-in) for pages.

### Step 11: Connect Pages with Routing and Navigation

- [ ] Update Navbar with links to HomePage, KnowledgePage, ResourcesPage, CommunityPage, SubscriptionPage, LoginPage, SignupPage.
- [ ] Add navigation logic:
  - [ ] Show protected routes and logout for logged-in users.
  - [ ] Show login/signup links and redirect from (core) for logged-out users.
- [ ] Connect cards to detail pages:
  - [ ] Link KnowledgeCard to KnowledgeDetailPage.
  - [ ] Link ResourceCard to ResourceDetailPage.
  - [ ] Link CommunityPostPreview to forum or placeholder.
- [ ] Test basic navigation via Navbar and cards.
- [ ] Optional: Add breadcrumb links in detail pages (e.g., “Back to Knowledge”).
- [ ] Set up middleware.ts or redirect logic for (core) routes using AuthStore.

### Step 12: Simulate User Flows in the Design System

- [ ] In the “User Flows” section, create a demo:
  - [ ] Start at HomePage with “Sign Up” button.
  - [ ] Move to SignupPage, advance to KnowledgePage on submit.
  - [ ] Show KnowledgeCard to KnowledgeDetailPage.
  - [ ] Offer SubscriptionPage link from KnowledgePage.
  - [ ] Include login flow: HomePage to LoginPage to KnowledgePage.
- [ ] Use state switch (e.g., next/previous buttons) to move between steps.
- [ ] Add a note explaining each flow.

---

## Phase 7: Implement Theming and Responsiveness

### Step 13: Set Up Dark/Light Mode Theming

- [ ] Update Tailwind config for darkMode: 'class'.
- [ ] Use UIStore’s theme to toggle dark class on `<html>` (e.g., via Navbar).
- [ ] Add dark/light variants to all components:
  - [ ] Update Button, Card, etc., with dark styles.
  - [ ] Ensure ThemeToggle switches theme instantly.
- [ ] Test dark mode default and light mode toggle.
- [ ] Optional: Support system theme with prefers-color-scheme.

### Step 14: Ensure Responsive Design Across Devices

- [ ] Review components (e.g., Navbar, KnowledgeGrid) for responsive layouts:
  - [ ] Stack elements on mobile.
  - [ ] Adjust sizes/spacing for desktop.
- [ ] Update pages to reflow (e.g., KnowledgePage sidebar to top bar on mobile).
- [ ] Test on different screen sizes for subtle Motion animations.
- [ ] Test responsiveness with browser dev tools.

---

## Phase 8: Documentation and Testing

### Step 15: Document Components in the Design System

- [ ] For each component in its section:
  - [ ] Write purpose (e.g., “Button: Triggers actions”).
  - [ ] List props.
  - [ ] Demo states and variants.
  - [ ] Add usage note.
- [ ] Add “Styles” section:
  - [ ] List Tailwind colors.
  - [ ] Describe Motion guidelines (e.g., “Subtle scale, 200ms”).

### Step 16: Test Component Variants and User Flows

- [ ] In the design system:
  - [ ] Test atom variants (e.g., Button sizes).
  - [ ] Check molecule states (e.g., SearchBar focused).
  - [ ] Verify organism interactions (e.g., Navbar toggle).
- [ ] Walk through user flows:
  - [ ] Test Home → Signup → Knowledge → Subscription.
  - [ ] Test KnowledgeCard to KnowledgeDetailPage.
- [ ] Ensure Motion animations are subtle.
- [ ] Test accessibility: tab through components, check screen reader labels.

---

## Phase 9: Finalize the Frontend

### Step 17: Add Error Handling and User Feedback

- [ ] Add error states to components/pages:
  - [ ] LoginPage, SignupPage (e.g., “Invalid credentials”).
  - [ ] KnowledgePage, ResourcesPage (e.g., “No items found”).
- [ ] Use Spinner for loading in grids and detail pages.
- [ ] Plan simple feedback (e.g., “Submitting…”).
- [ ] Plan success feedback (e.g., “Logged in!”) for actions.

### Step 18: Audit the Entire Frontend

- [ ] Check design system: all components present with demos/docs.
- [ ] Test routing via Navbar and card links.
- [ ] Verify mock data loads in grids and detail pages.
- [ ] Confirm theming: dark mode default, light mode works.
- [ ] Ensure responsiveness: test mobile and desktop.
- [ ] Act like a user: sign up, browse, subscribe.
- [ ] Check performance: ensure Motion animations are smooth.

### Step 19: Prepare for Next Steps and Celebrate

- [ ] Update/create README.md:
  - [ ] Explain how to run the app.
  - [ ] Summarize the frontend.
  - [ ] List todos (e.g., “Connect to Appwrite”).
- [ ] Celebrate completing the frontend!
