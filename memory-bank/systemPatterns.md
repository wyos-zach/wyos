# System Patterns

## System Architecture

WYOS is built using a modern web application architecture with Next.js 15 and the App Router at its core. The system follows a clear separation of concerns with distinct layers for presentation, business logic, and data access.

### High-Level Architecture

```mermaid
flowchart TD
    Client[Client Browser] <--> NextJS[Next.js App]
    NextJS <--> AppWrite[Appwrite Backend]
    NextJS <--> Stripe[Stripe Payment]
    NextJS <--> Discourse[Discourse Forums]

    subgraph "Next.js Application"
        UI[UI Components] --> Pages[App Router Pages]
        Pages --> ServerComp[Server Components]
        Pages --> ClientComp[Client Components]
        ServerComp --> DataFetch[Data Fetching]
        ClientComp --> StateManagement[State Management]
        DataFetch --> Repositories[Data Repositories]
        StateManagement --> Stores[Zustand Stores]
        Repositories --> Models[Data Models]
    end

    subgraph "External Services"
        AppWrite --> Auth[Authentication]
        AppWrite --> Database[Database Collections]
        AppWrite --> Storage[File Storage]
        Stripe --> Subscriptions[Subscription Management]
        Discourse --> Community[Community Forums]
    end
```

### Route Structure

The application uses Next.js App Router with a well-organized route structure:

- `(auth)/` - Authentication-related routes (protected)
- `(core)/` - Main app features (protected)
- `(marketing)/` - Public pages (home, about, membership)
- `(subscription)/` - Subscription-related pages
- `api/` - Custom API routes
- `auth/` - OAuth callback routes

This structure clearly separates public and protected routes while grouping related functionality.

## Key Technical Decisions

### 1. Server-First Approach

WYOS prioritizes server components where possible to:

- Reduce client-side JavaScript
- Improve performance and SEO
- Enhance security by keeping sensitive operations server-side

The application uses the "use client" directive only when necessary, such as for:

- Event listeners
- Browser APIs
- State management
- Client-side-only libraries

### 2. Authentication System

The authentication system uses Appwrite as the backend provider with a Zustand store for state management. Key components include:

- **Auth Store**: Central state management for authentication
- **Auth Layout**: Handles session verification and redirects
- **Auth Forms**: UI components for authentication flows
- **Auth Hooks**: Custom hooks for form handling and validation

The authentication flow follows this pattern:

```mermaid
sequenceDiagram
    User->>+UI: Interacts with auth form
    UI->>+Auth Hooks: Validate input
    Auth Hooks->>+Auth Store: Call auth methods
    Auth Store->>+Appwrite: Make auth request
    Appwrite-->>-Auth Store: Return response
    Auth Store-->>-Auth Hooks: Update state
    Auth Hooks-->>-UI: Update UI
```

### 3. Data Management Strategy

WYOS implements a clear data management strategy:

- **Server State**: Managed by TanStack Query for data fetching, caching, and synchronization
- **Client State**: Managed by Zustand with Immer for immutable updates and Persist for persistence
- **Form State**: Managed by React Hook Form with Zod for validation

This separation ensures that each type of state is handled by the most appropriate tool.

### 4. External Integrations

The application integrates with several external services:

- **Appwrite**: Backend services including authentication, database collections, and storage
- **Stripe**: Subscription management and payment processing
- **Discourse**: Community forums with SSO integration

These integrations are abstracted through service layers to maintain separation of concerns.

## Design Patterns

### 1. Repository Pattern

WYOS uses the repository pattern to abstract data access logic:

```mermaid
flowchart TD
    Components[UI Components] --> Hooks[Custom Hooks]
    Hooks --> Repositories[Repositories]
    Repositories --> Models[Data Models]
    Repositories --> AppwriteClient[Appwrite Client]
```

Repositories are organized by domain (e.g., knowledge, resources) and provide a clean interface for data operations.

### 2. Custom Hooks Pattern

Custom hooks encapsulate and reuse stateful logic across components:

- **Data Hooks**: For fetching and managing data (e.g., `useKnowledgeRevalidation`)
- **UI Hooks**: For managing UI state and interactions
- **Auth Hooks**: For authentication-related operations

This pattern promotes code reuse and separation of concerns.

### 3. Component Composition

WYOS follows a component composition pattern with a clear hierarchy:

- **Page Components**: Top-level components that represent routes
- **Feature Components**: Domain-specific components (e.g., knowledge, resources)
- **Shared Components**: Reusable components used across features
- **UI Components**: Low-level, presentational components

This approach promotes reusability and maintainability.

### 4. State Management with Zustand

The application uses Zustand for state management with these patterns:

- **Store Slices**: Separate stores for different domains (Auth, Knowledge, Resources)
- **Immer Integration**: For immutable state updates
- **Persist Middleware**: For persisting state across sessions
- **TypeScript Integration**: For type-safe state and actions

### 5. Server Actions Pattern

For server-side operations, WYOS uses Next.js server actions to:

- Handle form submissions
- Process data mutations
- Perform server-side validations
- Revalidate cached data

## Component Relationships

### UI Component Hierarchy

```mermaid
flowchart TD
    Layout[Root Layout] --> AuthCheck[Auth Check]
    Layout --> Navigation[Navigation]
    Layout --> Main[Main Content]
    Layout --> Footer[Footer]

    Main --> PageLayout[Page Layout]
    PageLayout --> PageHeader[Page Header]
    PageLayout --> PageContent[Page Content]

    PageContent --> FeatureComponents[Feature Components]
    FeatureComponents --> SharedComponents[Shared Components]
    SharedComponents --> UIComponents[UI Components]
```

### Data Flow

```mermaid
flowchart TD
    ServerComponents[Server Components] --> ServerActions[Server Actions]
    ServerActions --> Repositories[Repositories]
    Repositories --> AppwriteAPI[Appwrite API]

    ClientComponents[Client Components] --> Hooks[Custom Hooks]
    Hooks --> ZustandStores[Zustand Stores]
    Hooks --> TanStackQueries[TanStack Queries]
    ZustandStores --> ClientState[Client State]
    TanStackQueries --> ServerState[Server State]
```

### Authentication Flow

```mermaid
flowchart TD
    LoginForm[Login Form] --> AuthStore[Auth Store]
    RegisterForm[Register Form] --> AuthStore
    SocialAuth[Social Auth] --> AuthStore

    AuthStore --> AppwriteAuth[Appwrite Auth]
    AppwriteAuth --> Session[Session]

    Session --> ProtectedRoutes[Protected Routes]
    Session --> UserProfile[User Profile]
```

## Coding Standards and Patterns

WYOS follows strict coding standards and patterns:

- **TypeScript**: Strong typing for all components, functions, and data structures
- **SOLID Principles**: Emphasis on single responsibility and dependency inversion
- **Functional Programming**: Preference for pure functions and immutability
- **Early Returns**: Using early returns for conditional logic
- **Error Handling**: Comprehensive error handling at all levels

These patterns ensure code quality, maintainability, and scalability as the application grows.
