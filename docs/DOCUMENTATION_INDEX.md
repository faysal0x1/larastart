# Larastart Documentation Index

This file provides a comprehensive overview of all the documentation files and their purposes in the Larastart project.

## Documentation Structure

### 📁 `/docs/` - Static Documentation Site
The main documentation site built with React and Vite.

#### Core Files
- `package.json` - Dependencies and scripts for the documentation site
- `vite.config.js` - Vite configuration for the documentation
- `tailwind.config.js` - Tailwind CSS configuration
- `index.html` - Main HTML file
- `README.md` - Documentation site setup guide

#### Source Files (`/src/`)
- `main.jsx` - React entry point
- `App.jsx` - Main app component with routing
- `index.css` - Global styles and Tailwind imports

#### Components (`/src/components/`)
- `Layout.jsx` - Main layout with sidebar navigation

#### Pages (`/src/pages/`)
- `Home.jsx` - Landing page with feature overview
- `GettingStarted.jsx` - Installation and setup guide
- `Commands.jsx` - Artisan command documentation
- `Components.jsx` - React component library
- `Helpers.jsx` - PHP and JavaScript helper functions
- `Models.jsx` - Eloquent model documentation
- `Controllers.jsx` - HTTP controller documentation
- `Services.jsx` - Service layer documentation
- `Repositories.jsx` - Repository pattern documentation
- `Middleware.jsx` - HTTP middleware documentation
- `Utils.jsx` - Utility functions documentation

#### Scripts
- `start-docs.bat` - Windows batch file to start documentation server
- `start-docs.sh` - Unix shell script to start documentation server

## Backend Documentation

### 📁 `/app/Console/Commands/` - Artisan Commands
- `GenerateAllSchemas.php` - Generate comprehensive structured data schemas
- `MakeResource.php` - Create complete resource with controller, repository, requests
- `GenerateSchema.php` - Generate structured data schemas for SEO
- `GenerateSitemap.php` - Generate XML sitemap
- `MakeAllResources.php` - Generate all resources from database tables
- `GenerateModelRelationshipsCommand.php` - Generate model relationship methods

### 📁 `/app/Helpers/` - Helper Functions
- `Helper.php` - General utility functions (formatCurrency, formatDate, etc.)
- `QueryBuilderHelper.php` - Database query builder utilities
- `ClientHelpers.php` - Client-side helper functions
- `NotificationHelper.php` - Notification and messaging utilities
- `ToastHelper.php` - Toast notification utilities
- `imageDownloader.php` - Image download utilities

### 📁 `/app/Models/` - Eloquent Models
- `User.php` - User authentication and profile
- `Blog.php` - Blog posts and articles
- `BlogCategory.php` - Blog categories
- `BlogComment.php` - Blog comments
- `Country.php` - Country data
- `MicroTask.php` - Micro tasks and jobs
- `MicroTaskCategory.php` - Task categories
- `Conversation.php` - Chat conversations
- `Message.php` - Chat messages

### 📁 `/app/Http/Controllers/` - HTTP Controllers
#### Admin Controllers
- `Admin/BlogController.php` - Blog management
- `Admin/BlogCategoryController.php` - Blog category management
- `Admin/CountryController.php` - Country management
- `Admin/UserController.php` - User management

#### Web Controllers
- `Web/WebController.php` - Main web controller
- `ChatController.php` - Chat functionality
- `Auth/` - Authentication controllers

### 📁 `/app/Services/` - Service Layer
- `CountryService.php` - Country-related business logic
- `GlobalNotificationService.php` - Global notification handling
- `SchemaService.php` - Schema generation service
- `ImageService.php` - Image processing service

### 📁 `/app/Repositories/` - Repository Pattern
#### Interfaces
- `Interfaces/BaseRepositoryInterface.php` - Base repository interface
- `Interfaces/BlogRepositoryInterface.php` - Blog repository interface
- `Interfaces/BlogCategoryRepositoryInterface.php` - Blog category repository interface

#### Implementations
- `BaseRepository.php` - Base repository implementation
- `BlogRepository.php` - Blog repository implementation
- `BlogCategoryRepository.php` - Blog category repository implementation

### 📁 `/app/Http/Middleware/` - HTTP Middleware
- `CheckUserRole.php` - Role-based access control
- `HandleAppearance.php` - Appearance handling
- `HandleInertiaRequests.php` - Inertia.js request handling
- `Authenticate.php` - Authentication middleware
- `RedirectIfAuthenticated.php` - Redirect authenticated users
- `EnsureEmailIsVerified.php` - Email verification middleware

## Frontend Documentation

### 📁 `/resources/js/components/` - React Components
#### UI Components (`/ui/`)
- `button.jsx` - Button component
- `input.jsx` - Input component
- `select.jsx` - Select component
- `checkbox.jsx` - Checkbox component
- `dialog.jsx` - Dialog/modal component
- `dropdown-menu.jsx` - Dropdown menu component
- `alert.jsx` - Alert component
- `avatar.jsx` - Avatar component

#### Layout Components
- `app-layout.jsx` - Main application layout
- `app-header.jsx` - Application header
- `app-sidebar.jsx` - Application sidebar
- `breadcrumbs.jsx` - Breadcrumb navigation

#### Form Components
- `GlobalForm.jsx` - Global form component
- `FormField.jsx` - Form field component

#### Data Display Components
- `DataTable.jsx` - Data table component
- `ListingPage.jsx` - Listing page component
- `PaginationComponent.jsx` - Pagination component
- `ActionsDropdown.jsx` - Actions dropdown component

#### Utility Components
- `ToastManager.jsx` - Toast notification manager
- `GlobalLoader.jsx` - Global loading component
- `LazyImage.jsx` - Lazy loading image component
- `QuillEditor.jsx` - Rich text editor component

### 📁 `/resources/js/utils/` - JavaScript Utilities
- `tableUtils.js` - Table utility functions
- `utils.js` - General utility functions

### 📁 `/resources/js/routes/` - Inertia Routes
- Various route files for different features (auth, users, blogs, etc.)

## Configuration Files

### 📁 `/config/` - Laravel Configuration
- `app.php` - Application configuration
- `auth.php` - Authentication configuration
- `broadcasting.php` - Broadcasting configuration
- `database.php` - Database configuration
- `filesystems.php` - File system configuration
- `mail.php` - Mail configuration
- `permission.php` - Permission configuration
- `queue.php` - Queue configuration

### 📁 `/database/` - Database Files
- `migrations/` - Database migrations
- `seeders/` - Database seeders
- `factories/` - Model factories

## Scripts and Tools

### 📁 `/` - Root Directory
- `generate-page.js` - Page generation script for rapid development
- `package.json` - Node.js dependencies and scripts
- `composer.json` - PHP dependencies and scripts
- `vite.config.js` - Vite configuration for the main app
- `tailwind.config.js` - Tailwind CSS configuration for the main app

## How to Use This Documentation

### For New Users
1. Start with `Getting Started` page in the documentation site
2. Read the `Home` page for feature overview
3. Explore `Commands` to understand available Artisan commands
4. Check `Components` to see available React components

### For Developers
1. Use `Commands` to generate new resources quickly
2. Reference `Components` for UI component usage
3. Check `Helpers` for available utility functions
4. Review `Models`, `Controllers`, `Services`, and `Repositories` for architecture patterns

### For Customization
1. Modify `Components` to customize UI
2. Add new `Commands` for custom functionality
3. Extend `Helpers` with project-specific utilities
4. Create new `Services` for business logic

## Quick Start Commands

```bash
# Start the documentation site
cd docs
bun install
bun run dev

# Generate a new resource
php artisan make:resource YourModel

# Generate all resources from database
php artisan make:all-resources

# Generate schemas for SEO
php artisan schema:generate-all

# Generate sitemap
php artisan generate:sitemap
```

## Contributing to Documentation

1. Edit the appropriate `.jsx` files in `/docs/src/pages/`
2. Update this index file when adding new sections
3. Test the documentation site locally
4. Submit pull requests for documentation improvements

## Deployment

The documentation site can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

Build the site with `bun run build` and deploy the `dist` folder.
