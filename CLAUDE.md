# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (currently ignores errors during builds)

### TypeScript
The project has TypeScript build errors ignored in next.config.mjs for development speed.

## Project Architecture

### Technology Stack
- **Framework**: Next.js 15.2.4 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Library**: Extensive Radix UI components (@radix-ui/react-*)
- **Charts**: Multiple charting libraries (ApexCharts, Chart.js, Recharts)
- **Forms**: React Hook Form with Zod validation
- **Maps**: React Google Maps API integration

### Directory Structure

#### App Structure (Next.js App Router)
- `app/` - Next.js App Router pages and API routes
  - `api/` - API routes for conversations, messages, projects, and proxy services
  - `portal/` - Main application portal with role-based access
    - `ceo/` - CEO dashboard, operations, reports, AI chat
    - `field-coordinator/` - Field management interface
    - `importer/` - Import management portal
    - `miller/` - Miller operations dashboard
  - `login/` - Authentication pages

#### Component Organization
- `components/ui/` - shadcn/ui base components (buttons, cards, dialogs, etc.)
- `components/modals/` - Reusable modal components for different features
- `components/` - Shared components including auth provider and portal layout

#### Libraries and Services
- `lib/` - Utility functions and services
  - `utils.ts` - Tailwind class merging utility
  - `*-service.ts` - Various service modules (AI, PDF parsing, RSS, CSV)

### Key Architectural Patterns

#### Authentication & Authorization
- Uses AuthProvider context for user management
- Portal routes are protected and redirect to `/login` if unauthenticated
- Role-based portal access (CEO, Field Coordinator, Importer, Miller)

#### Modal System
- Centralized modal components in `components/modals/`
- Modals are organized by feature area (alerts, meetings, reports, etc.)

#### UI Component System
- Built on shadcn/ui and Radix UI primitives
- Consistent theming with CSS custom properties
- Dark mode support configured in Tailwind

#### Data Visualization
- Multiple chart libraries available for different visualization needs
- ApexCharts for advanced charts
- Chart.js for standard charts
- Recharts for React-specific charts

### Development Notes

#### Configuration
- ESLint and TypeScript errors are ignored during builds for faster development
- Images are unoptimized in Next.js config
- Tailwind configured with custom color system using CSS variables

#### State Management
- Uses React Context for authentication
- Hook Form for form state management
- No global state management library detected

#### API Integration
- API routes handle conversations, messages, and project data
- Proxy routes for RSS and article content
- AI chat integration available