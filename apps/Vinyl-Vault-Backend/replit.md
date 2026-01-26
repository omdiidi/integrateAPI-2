# Vinyl Shop Inventory Management

## Overview

A mobile-first inventory management application for vinyl record shops. The app enables quick vinyl record entry with camera integration, tracks in-store vs online inventory, and manages the lifecycle of records from draft to sold. Built as a single-page application with a focus on touch-optimized interactions for warehouse and shop floor use.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom build script for production
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Component Library**: shadcn/ui (Radix UI primitives with custom styling)
- **Form Handling**: React Hook Form with Zod validation

The frontend follows a mobile-first design approach with iOS-inspired patterns and Material Design touch targets (minimum 44px). The UI uses a bright, high-contrast color palette suitable for outdoor/warehouse environments.

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful JSON API under `/api/*` prefix
- **Build**: esbuild for server bundling, Vite for client

The server uses a simple file-based structure with routes registered in `server/routes.ts`. Static files are served from the built client bundle in production.

### Data Layer
- **ORM**: Drizzle ORM with Zod schema integration
- **Database**: PostgreSQL (configured via `DATABASE_URL` environment variable)
- **Schema Location**: `shared/schema.ts` - contains TypeScript types and Zod validators
- **Migrations**: Managed via `drizzle-kit push`

The storage layer uses an in-memory implementation (`server/storage.ts`) with seed data for development, designed to be replaced with database persistence.

### Key Data Models
- **Vinyl**: Core entity with fields for artist, release title, condition grading, pricing, location, and marketplace listings
- **Status workflow**: draft → active → sold
- **Inventory flags**: inStore, online, holdForCustomer

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## External Dependencies

### Database
- PostgreSQL via `DATABASE_URL` environment variable
- Drizzle ORM for type-safe queries
- Session storage via `connect-pg-simple`

### UI Libraries
- Radix UI primitives (dialog, select, checkbox, etc.)
- Lucide React for icons
- React Icons (for marketplace brand icons)
- Embla Carousel
- Vaul (drawer component)

### Form & Validation
- React Hook Form
- Zod with drizzle-zod integration
- zod-validation-error for user-friendly messages

### Styling
- Tailwind CSS with PostCSS
- Class Variance Authority for component variants
- clsx/tailwind-merge for class composition

### Build & Development
- Vite with React plugin
- esbuild for server bundling
- TypeScript with strict mode
- Replit-specific plugins (error overlay, cartographer, dev banner)