# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Laravel + React (Inertia.js) application using:
- **Backend**: Laravel 12 with PHP 8.2+
- **Frontend**: React 19 with TypeScript/JSX, Tailwind CSS 4, and shadcn/ui components
- **Database**: SQLite (default)
- **Testing**: Pest PHP for backend, built-in test structure
- **Build Tools**: Vite for frontend assets

## Development Commands

### Development Server
```bash
# Start development server (Laravel + Vite + Queue)
composer dev

# Start with SSR support
composer dev:ssr

# Frontend only
npm run dev
```

### Building & Linting
```bash
# Build frontend assets
npm run build

# Build with SSR
npm run build:ssr

# Lint and fix JavaScript/React code
npm run lint

# Format code
npm run format
npm run format:check
```

### Testing
```bash
# Run all tests using Pest
php artisan test

# Run PHPUnit directly
vendor/bin/phpunit

# Run specific test file
php artisan test --filter=ExampleTest
```

### Laravel Commands
```bash
# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Database operations
php artisan migrate
php artisan migrate:fresh --seed

# Queue processing
php artisan queue:work
```

## Architecture

### Frontend Structure
- **Pages**: `resources/js/pages/` - Inertia.js pages
- **Components**: `resources/js/components/` - Reusable React components
- **UI Components**: `resources/js/components/ui/` - shadcn/ui components
- **Layouts**: `resources/js/layouts/` - Page layouts (app, auth, settings)
- **Hooks**: `resources/js/hooks/` - Custom React hooks
- **Utils**: `resources/js/lib/` - Utility functions

### Backend Structure
- **Controllers**: `app/Http/Controllers/` - MVC controllers
- **Models**: `app/Models/` - Eloquent models
- **Routes**: `routes/` - Route definitions (web.php, auth.php, settings.php)
- **Middleware**: `app/Http/Middleware/` - Custom middleware including HandleInertiaRequests
- **Database**: `database/` - Migrations, seeders, factories

### Key Features
- **Authentication**: Complete auth system with email verification
- **Settings**: User profile and appearance management
- **Theming**: Light/dark mode support with system preference detection
- **Responsive Design**: Mobile-first approach with sidebar navigation
- **Component System**: Structured UI components with consistent styling

### Inertia.js Integration
- Pages are React components that receive props from Laravel controllers
- Form submissions use Inertia's form helpers
- Navigation preserves SPA behavior
- SSR support available for better SEO

### Styling
- Tailwind CSS 4 with CSS variables for theming
- shadcn/ui component library
- Responsive design with mobile navigation
- Consistent spacing and typography system