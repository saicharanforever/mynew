# replit.md

## Overview

This is a modern full-stack web application featuring a premium restaurant landing page called "Aurelius". The application demonstrates sophisticated web design principles with a focus on creating an elegant, high-conversion restaurant website that emphasizes culinary artistry and premium dining experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for premium theming
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state management
- **Animations**: Framer Motion for smooth, purposeful animations
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Development**: Hot module replacement via Vite integration
- **API Structure**: RESTful API design with `/api` prefix routing

### Design System
- **Typography**: Google Fonts integration (Playfair Display for headings, Montserrat for body text)
- **Color Scheme**: Premium restaurant palette with dark backgrounds, gold accents, and elegant typography
- **Component Library**: Comprehensive UI component system based on Shadcn/ui
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

## Key Components

### Core Application Components
- **Navigation**: Fixed navigation with smooth scrolling and mobile responsiveness
- **Hero Section**: Full-screen hero with parallax effects and kinetic typography
- **Menu Showcase**: Interactive menu display with alternating left/right animations
- **Story Section**: Brand narrative section with slide animations from opposite directions
- **Animation Showcase**: Comprehensive demonstration of all 14 animation types with reversible effects
- **Gallery Section**: Masonry-style image gallery with varied animation types (zoom, flip, rotate, bounce)
- **Contact Section**: Reservation form with slide-in animations from opposite directions
- **Footer**: Links and social media integration
- **Scroll Progress**: Visual progress indicator showing scroll completion
- **Animation Controls**: Floating controls to reset animations and toggle functionality

### UI Infrastructure
- **Custom Hooks**: 
  - `useScrollReveal`: Advanced scroll-based animation system with 14 animation types and full reversibility
  - `useParallax`: Parallax scrolling effects
  - `useMobile`: Responsive design utilities
- **Animation System**: 
  - Fully reversible scroll-triggered animations (fade, slide, zoom, flip, rotate, scale-bounce)
  - Customizable duration, delay, threshold, and root margin settings
  - Smooth cubic-bezier transitions with hardware acceleration
  - Interactive animation controls with reset and pause functionality
  - Scroll progress indicator
- **Form Handling**: React Hook Form integration with validation

### Backend Components
- **Storage Layer**: Abstract storage interface with in-memory implementation
- **Route Registration**: Modular route organization system
- **Development Tools**: Vite integration for seamless full-stack development

## Data Flow

### Frontend Data Management
- TanStack Query handles all server state with caching and synchronization
- Local component state for UI interactions and form data
- Custom hooks abstract common functionality like scroll detection and animations

### API Communication
- Fetch-based API client with error handling and credential management
- Centralized query client configuration with optimized defaults
- RESTful endpoint structure with consistent error handling

### User Interactions
- Smooth scrolling navigation between sections
- Form submissions with client-side validation
- Interactive animations triggered by scroll position
- Responsive mobile menu with gesture support

## External Dependencies

### Core Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI/UX**: Radix UI primitives, Framer Motion, Embla Carousel
- **Styling**: Tailwind CSS, Class Variance Authority, CLSX
- **State Management**: TanStack React Query
- **Routing**: Wouter (lightweight React router)

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Development**: TSX for TypeScript execution, Vite for build tooling
- **Database**: Drizzle ORM with PostgreSQL support via Neon Database serverless
- **Session Management**: Connect PG Simple for PostgreSQL session storage

### Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **TypeScript**: Full type safety with strict configuration
- **Database Tooling**: Drizzle Kit for migrations and schema management
- **Replit Integration**: Custom plugins for development environment

## Deployment Strategy

### Build Process
- Vite builds the frontend React application to `dist/public`
- ESBuild bundles the backend Express server to `dist/index.js`
- TypeScript compilation with strict type checking
- Optimized production builds with code splitting and tree shaking

### Environment Configuration
- Development mode runs concurrent frontend and backend with HMR
- Production mode serves static files through Express
- Database connections via environment variables
- Session management with PostgreSQL backend

### Database Management
- Drizzle ORM with PostgreSQL dialect
- Migration system via Drizzle-kit
- Schema versioning in `shared/schema.ts`
- Development includes fallback in-memory storage

### Development Workflow
- Hot module replacement for instant feedback
- TypeScript type checking across full-stack
- Integrated development server with API proxy
- Replit-specific development tooling and error handling

The application showcases modern web development practices with a focus on creating premium user experiences through thoughtful design, smooth animations, and robust technical implementation.