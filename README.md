# Larastart

A comprehensive Laravel 12 starter kit with Inertia.js, React, module-based architecture, e-commerce features, admin panel, and more.

## Features

- 🚀 **Laravel 12** - Latest Laravel framework
- ⚡ **Inertia.js + React** - Modern SPA experience without the complexity
- 📦 **Module-Based Architecture** - Using nwidart/laravel-modules
- 🛒 **E-Commerce Ready** - Products, cart, checkout, and payment integration
- 👥 **Role & Permission System** - Spatie Laravel Permission
- 📸 **Media Library** - Spatie Media Library for file management
- 🔐 **Social Login** - Laravel Socialite integration
- 💳 **Payment Gateway** - SSLCommerz integration
- 🎨 **Modern UI** - Tailwind CSS with Radix UI components
- 🔄 **Real-time** - Laravel Reverb for WebSockets
- 📱 **SSR Support** - Server-side rendering with Inertia
- 🧪 **Testing** - PHPUnit with Pest support

## Requirements

- PHP >= 8.2
- Composer
- Node.js >= 18.x
- NPM or Bun
- MySQL/PostgreSQL/SQLite
- Redis (optional, for queues and caching)

## Installation

### Using Composer Create Project

```bash
composer create-project faysal0x1/larastart my-project
cd my-project
```

### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/faysal0x1/larastart.git
cd larastart
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node dependencies:
```bash
npm install
# or
bun install
```

4. Copy environment file:
```bash
cp .env.example .env
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Configure your `.env` file with database credentials and other settings.

7. Run migrations:
```bash
php artisan migrate
```

8. Seed the database (optional):
```bash
php artisan db:seed
```

9. Build assets:
```bash
npm run build
# or for development
npm run dev
```

## Development

Start the development server:

```bash
composer run dev
```

This will start:
- Laravel development server
- Queue worker
- Vite dev server

For SSR development:

```bash
composer run dev:ssr
```

## Default Credentials

After seeding, you can login with:

- **Admin**: `admin@gmail.com` / `password`
- **Super Admin**: `superadmin@gmail.com` / `password`

## Project Structure

```
larastart/
├── app/
│   ├── Modules/          # Modular application structure
│   ├── Helpers/          # Helper functions
│   ├── Http/            # Controllers, Middleware, Requests
│   ├── Models/          # Eloquent models
│   └── Services/        # Business logic services
├── resources/
│   ├── js/              # React/Inertia frontend
│   └── views/           # Blade templates
├── routes/              # Application routes
├── database/            # Migrations and seeders
└── config/              # Configuration files
```

## Key Packages

- `inertiajs/inertia-laravel` - Inertia.js server-side adapter
- `nwidart/laravel-modules` - Module management
- `spatie/laravel-permission` - Role and permission management
- `spatie/laravel-medialibrary` - Media file management
- `laravel/socialite` - Social authentication
- `karim007/sslcommerz-laravel` - Payment gateway
- `tightenco/ziggy` - Route helper for JavaScript

## Versioning

This package follows [Semantic Versioning](https://semver.org/).

- **Major** (1.x.x): Breaking changes
- **Minor** (x.1.x): New features, backwards compatible
- **Patch** (x.x.1): Bug fixes, backwards compatible

## Publishing to Packagist

1. Create a GitHub repository for your package
2. Update the repository URL in `composer.json`
3. Tag your releases:
   ```bash
   git tag -a v1.0.0 -m "Initial release"
   git push origin v1.0.0
   ```
4. Submit your package to [Packagist](https://packagist.org/packages/submit)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

The Larastart starter kit is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Support

For issues and questions:
- [GitHub Issues](https://github.com/faysal0x1/larastart/issues)
- [GitHub Discussions](https://github.com/faysal0x1/larastart/discussions)

## Credits

Built with ❤️ using Laravel and React.

