# Technical Context

## Technology Stack

WYOS is built using a modern, robust technology stack designed for performance, maintainability, and scalability. The core technologies include:

### Frontend

- **Next.js 15**: The foundation of the application, using the App Router for routing and server components
- **React 19**: For building the user interface with functional components and hooks
- **TypeScript**: For type safety and improved developer experience
- **TailwindCSS**: For utility-first styling
- **ShadcN UI**: For accessible, customizable UI components
- **Motion (motion/react)**: For animations and transitions

### State Management

- **Zustand**: For client-side state management
  - With **Immer** for immutable state updates
  - With **Persist** for state persistence
- **TanStack Query**: For server state management, data fetching, and caching

### Backend Services

- **Appwrite**: For backend services including:
  - Authentication
  - Database collections
  - File storage
- **Stripe**: For subscription payments and billing
- **Discourse**: For community forums with SSO integration

### Form Handling and Validation

- **React Hook Form**: For form state management
- **Zod**: For schema validation

## Development Environment

### Required Tools

- **Node.js**: v18.x or higher
- **pnpm**: As the package manager
- **Git**: For version control
- **Appwrite CLI**: For managing Appwrite resources
- **Stripe CLI**: For testing Stripe webhooks locally

### Environment Setup

The application requires several environment variables for proper configuration:

```md
# Next.js

NEXT_PUBLIC_APP_URL=http://localhost:3000

# Appwrite

NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
APPWRITE_API_KEY=your-api-key

# Stripe

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-publishable-key
STRIPE_SECRET_KEY=your-secret-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# Discourse

NEXT_PUBLIC_DISCOURSE_URL=your-discourse-url
DISCOURSE_SSO_SECRET=your-sso-secret
```

These variables should be stored in a `.env.local` file for local development and configured in the deployment environment for production.

### Development Workflow

#### Version Control

- **Repository**: GitHub
- **Branching Strategy**:
  - `main`: Production-ready code
  - `develop`: Staging environment
  - `feature/*`: Branches for new features/experiments

#### Code Quality Tools

- **ESLint**: For code linting
- **Prettier**: For code formatting
- **DeepSource**: For code quality analysis

#### Testing

- **Jest**: For unit and integration testing
- **React Testing Library**: For component testing

## Project Structure

The project follows a well-organized structure:

```md
src/
├── **tests**/ # Jest Testing configuration
│
├── app/ # Next.js App Router routes
│ ├── (auth)/ # Authentication routes (protected)
│ ├── (core)/ # Main app features (protected)
│ ├── (marketing)/ # Public pages (home, about, membership)
│ ├── (subscription)/ # Subscription-related pages (Stripe integration)
│ ├── api/ # Custom API Routes
│ └── auth/ # OAuth callback routes (social logins)
│
├── components/ # React components
│ ├── auth/ # Authentication components (login,register, etc.)
│ ├── core/ # Feature components (Knowledge, Resources, Community)
│ ├── marketing/ # Marketing components
│ ├── shared/ # Common, reusable components
│ └── ui/ # Shadcn components and styled elements
│
├── lib/ # Utility functions and shared logic
│ ├── api/ # API call helpers and external integrations
│ ├── config/ # App configurations and environment setups
│ ├── hooks/ # Custom React hooks
│ ├── providers/ # React context providers
│ └── repositories/ # Data repositories interfacing with Appwrite
│
├── models/ # Appwrite models and config files
│ ├── client/ # Client side config
│ └── server/ # Server-side config
├── store/ # Zustand-based state management store
└── types/ # Global TypeScript type definitions
├── auth/
├── core/
├── marketing/
└── shared/
```

This structure promotes separation of concerns and makes it easy to locate and modify specific parts of the application.

## External Integrations

### Appwrite

Appwrite serves as the primary backend service for WYOS, providing:

- **Authentication**: Email/password and OAuth authentication
- **Database**: Collections for storing application data
  - Subscriptions
  - Knowledge
  - Resources
  - Categories
  - Tags
- **Storage**: For storing images and attachments

The integration is managed through:

- Client-side configuration in `src/models/client/config.ts`
- Server-side configuration in `src/models/server/config.ts`
- Data models in `src/models/server/` directory

### Stripe

Stripe is used for subscription management and payment processing:

- **Checkout**: For creating subscription checkout sessions
- **Customer Portal**: For managing subscriptions
- **Webhooks**: For handling subscription events

The integration is managed through:

- API routes in `src/app/api/` directory
- Appwrite functions in `functions/stripe-subscriptions/`

### Discourse

Discourse powers the community aspect of WYOS:

- **SSO Integration**: For seamless authentication between WYOS and Discourse
- **API Integration**: For fetching forum data and creating posts

The integration is managed through:

- API routes in `src/app/api/discourse/` directory

## Technical Constraints

### Performance

- **Bundle Size**: Must be optimized to ensure fast initial load times
- **Server Components**: Should be used where possible to reduce client-side JavaScript
- **Image Optimization**: Must use Next.js Image component for optimized images
- **Code Splitting**: Should implement dynamic imports for code splitting

### Security

- **Authentication**: Must implement proper authentication and authorization
- **Input Validation**: Must validate all user inputs
- **API Security**: Must implement proper API security measures
- **Environment Variables**: Must keep sensitive information in environment variables
- **Content Security Policy**: Should implement a proper Content Security Policy

### Accessibility

- **WCAG Compliance**: Must comply with WCAG 2.1 AA standards
- **Keyboard Navigation**: Must support keyboard navigation
- **Screen Reader Support**: Must support screen readers
- **Color Contrast**: Must maintain proper color contrast ratios

### SEO

- **Metadata**: Must implement proper metadata for all pages
- **Structured Data**: Should implement structured data where appropriate
- **Canonical URLs**: Must implement canonical URLs
- **Sitemap**: Should generate a sitemap

## Deployment

### Vercel

The application is deployed on Vercel with:

- **Automatic Deployments**: From the `main` branch
- **Preview Deployments**: For pull requests
- **Environment Variables**: Configured in the Vercel dashboard
- **Edge Functions**: For API routes that require low latency

### Appwrite Deployment

Appwrite resources are deployed using:

- **Appwrite CLI**: For deploying database collections and functions
- **appwrite.json**: For defining Appwrite resources

## Development Guidelines

### Coding Standards

- **TypeScript**: Use strict mode and proper typing
- **React**: Use functional components and hooks
- **Next.js**: Follow Next.js best practices
- **Testing**: Write tests for all components and functions
- **Documentation**: Document all code with JSDoc comments

### Performance Optimization

- **Memoization**: Use React.memo, useMemo, and useCallback where appropriate
- **Code Splitting**: Use dynamic imports for code splitting
- **Image Optimization**: Use Next.js Image component
- **Font Optimization**: Use Next.js Font component
- **Lazy Loading**: Implement lazy loading for components and data

### Error Handling

- **Error Boundaries**: Implement error boundaries for graceful error handling
- **Form Validation**: Implement proper form validation with Zod
- **API Error Handling**: Handle API errors gracefully
- **Logging**: Log errors for debugging and monitoring

## Dependencies

### Core Dependencies

- **next**: 15.1.4
- **node-appwrite**: ^14.1.0
- **react**: ^19.0.0
- **react-dom**: ^19.0.0
- **typescript**: ^5.0.0
- **tailwindcss**: ^3.4.17
- **appwrite**: ^16.1.0
- **stripe**: ^17.6.0
- **zustand**: ^5.0.3
- **immer**: ^10.1.1
- **@tanstack/react-query**: ^5.64.2
- **zod**: ^3.22.0
- **react-hook-form**: ^7.54.2
- **motion**: ^12.0.3

### UI Dependencies

- **@radix-ui/react-\***: Various Radix UI components
- **class-variance-authority**: For component variants
- **clsx**: For conditional class names
- **tailwind-merge**: For merging Tailwind classes
- **lucide-react**: For icons

### Development Dependencies

- **eslint**: ^9
- **prettier**: ^3.4.2
- **jest**: ^29.7.0
- **@testing-library/react**: ^16.2.0
- **@types/node**: ^20.17.13
- **@types/react**: ^18.2.21
- **@types/react-dom**: ^18.2.7
- **autoprefixer**: ^10.4.20
- **postcss**: ^8.5.1
