import { Terminal, Database, Code, Rocket } from 'lucide-react'

export default function GettingStarted() {
    return (
        <div className="doc-content">
            <h1>Getting Started</h1>

            <p>
                Larastart is a powerful Laravel React starter kit that provides everything you need to build modern web applications.
                This guide will help you get up and running quickly.
            </p>

            <h2>Prerequisites</h2>
            <p>Before you begin, make sure you have the following installed:</p>
            <ul>
                <li>PHP 8.2 or higher</li>
                <li>Composer</li>
                <li>Node.js 18 or higher</li>
                <li>Bun (recommended) or npm</li>
                <li>MySQL, PostgreSQL, or SQLite</li>
                <li>Git</li>
            </ul>

            <h2>Installation</h2>

            <h3>1. Clone the Repository</h3>
            <pre><code>git clone https://github.com/your-username/larastart.git
                cd larastart</code></pre>

            <h3>2. Install PHP Dependencies</h3>
            <pre><code>composer install</code></pre>

            <h3>3. Install Node.js Dependencies</h3>
            <pre><code>bun install</code></pre>

            <h3>4. Environment Setup</h3>
            <pre><code>cp .env.example .env
                php artisan key:generate</code></pre>

            <h3>5. Configure Database</h3>
            <p>Update your <code>.env</code> file with your database credentials:</p>
            <pre><code>DB_CONNECTION=mysql
                DB_HOST=127.0.0.1
                DB_PORT=3306
                DB_DATABASE=larastart
                DB_USERNAME=root
                DB_PASSWORD=</code></pre>

            <h3>6. Run Migrations</h3>
            <pre><code>php artisan migrate</code></pre>

            <h3>7. Seed the Database</h3>
            <pre><code>php artisan db:seed</code></pre>

            <h2>Development Server</h2>

            <h3>Start Development Servers</h3>
            <p>Larastart provides convenient scripts to start all development servers:</p>

            <h4>Using Composer (Recommended)</h4>
            <pre><code>composer run dev</code></pre>

            <h4>Using Individual Commands</h4>
            <pre><code># Terminal 1: Laravel server
                php artisan serve

                # Terminal 2: Vite development server
                bun run dev

                # Terminal 3: Queue worker (optional)
                php artisan queue:work</code></pre>

            <h2>Default Credentials</h2>
            <p>After running the seeders, you can log in with these default credentials:</p>
            <ul>
                <li><strong>Email:</strong> admin@example.com</li>
                <li><strong>Password:</strong> password</li>
            </ul>

            <h2>Project Structure</h2>

            <h3>Backend Structure</h3>
            <pre><code>app/
                ├── Console/Commands/     # Artisan commands
                ├── Enums/               # PHP enums
                ├── Events/              # Event classes
                ├── Facades/             # Custom facades
                ├── Helpers/             # Helper functions
                ├── Http/
                │   ├── Controllers/     # Controllers
                │   ├── Middleware/      # Middleware
                │   └── Requests/        # Form requests
                ├── Mail/                # Mail classes
                ├── Models/              # Eloquent models
                ├── Notifications/       # Notification classes
                ├── Policies/           # Authorization policies
                ├── Providers/          # Service providers
                ├── Repositories/        # Repository pattern
                ├── Services/           # Service classes
                └── Traits/             # Model traits</code></pre>

            <h3>Frontend Structure</h3>
            <pre><code>resources/js/
                ├── actions/             # Inertia actions
                ├── components/          # React components
                ├── contexts/           # React contexts
                ├── hooks/              # Custom hooks
                ├── layouts/            # Layout components
                ├── lib/                # Utility libraries
                ├── pages/              # Page components
                ├── routes/              # Inertia routes
                ├── utils/               # Utility functions
                └── validations/         # Form validations</code></pre>

            <h2>Key Features Overview</h2>

            <h3>Backend Features</h3>
            <ul>
                <li><strong>Authentication:</strong> Built-in Laravel authentication with social login support</li>
                <li><strong>Authorization:</strong> Role and permission system using Spatie Laravel Permission</li>
                <li><strong>File Management:</strong> Image upload and processing with Intervention Image</li>
                <li><strong>Real-time:</strong> Broadcasting with Laravel Reverb</li>
                <li><strong>API Ready:</strong> Structured for API development</li>
            </ul>

            <h3>Frontend Features</h3>
            <ul>
                <li><strong>SPA Experience:</strong> Inertia.js for seamless single-page application</li>
                <li><strong>UI Components:</strong> Pre-built components with Radix UI primitives</li>
                <li><strong>Styling:</strong> Tailwind CSS with custom design system</li>
                <li><strong>Forms:</strong> Form handling with validation</li>
                <li><strong>Tables:</strong> Data tables with sorting and filtering</li>
                <li><strong>Dark Mode:</strong> Built-in dark mode support</li>
            </ul>

            <h2>Next Steps</h2>
            <p>Now that you have Larastart set up, explore the documentation to learn about:</p>
            <ul>
                <li><a href="/commands">Artisan Commands</a> - Generate code quickly</li>
                <li><a href="/components">Components</a> - Use pre-built UI components</li>
                <li><a href="/helpers">Helpers</a> - Utility functions</li>
                <li><a href="/models">Models</a> - Database models and relationships</li>
                <li><a href="/controllers">Controllers</a> - HTTP controllers</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <h3 className="text-blue-900 font-semibold mb-2">💡 Pro Tip</h3>
                <p className="text-blue-800">
                    Use the <code>generate-page.js</code> script to quickly create new resource pages with all CRUD operations.
                    Run <code>node generate-page.js</code> and follow the prompts to generate complete resource pages.
                </p>
            </div>
        </div>
    )
}
