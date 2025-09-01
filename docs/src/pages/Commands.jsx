import { Terminal, Code, Database, FileText, Globe, Users } from 'lucide-react'

const commands = [
    {
        name: 'make:resource',
        signature: 'make:resource {name} {--path=Admin} {--table=}',
        description: 'Create a complete resource with controller, repository, requests, and service provider registration',
        category: 'Resource Generation',
        examples: [
            'php artisan make:resource Country',
            'php artisan make:resource User --path=Admin',
            'php artisan make:resource Product --table=products'
        ]
    },
    {
        name: 'make:all-resources',
        signature: 'make:all-resources',
        description: 'Generate all resources from database tables automatically',
        category: 'Resource Generation',
        examples: [
            'php artisan make:all-resources'
        ]
    },
    {
        name: 'schema:generate',
        signature: 'schema:generate {--type=all}',
        description: 'Generate structured data schemas for SEO and search engines',
        category: 'SEO & Schema',
        examples: [
            'php artisan schema:generate',
            'php artisan schema:generate --type=organization',
            'php artisan schema:generate --type=blog'
        ]
    },
    {
        name: 'schema:generate-all',
        signature: 'schema:generate-all {--output=public/schemas}',
        description: 'Generate comprehensive structured data schemas for the entire website',
        category: 'SEO & Schema',
        examples: [
            'php artisan schema:generate-all',
            'php artisan schema:generate-all --output=public/json-ld'
        ]
    },
    {
        name: 'generate:sitemap',
        signature: 'generate:sitemap',
        description: 'Generate XML sitemap for search engines',
        category: 'SEO & Schema',
        examples: [
            'php artisan generate:sitemap'
        ]
    },
    {
        name: 'generate:model-relationships',
        signature: 'generate:model-relationships',
        description: 'Generate model relationship methods automatically',
        category: 'Model Generation',
        examples: [
            'php artisan generate:model-relationships'
        ]
    }
]

export default function Commands() {
    return (
        <div className="doc-content">
            <h1>Artisan Commands</h1>

            <p>
                Larastart comes with powerful Artisan commands that help you generate code quickly and efficiently.
                These commands follow Laravel conventions and generate well-structured, production-ready code.
            </p>

            <h2>Available Commands</h2>

            {commands.map((command) => (
                <div key={command.name} className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{command.name}</h3>
                            <p className="text-sm text-gray-500">{command.category}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                        <p className="text-gray-700">{command.description}</p>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Signature</h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                            <code>php artisan {command.signature}</code>
                        </pre>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Examples</h4>
                        <div className="space-y-2">
                            {command.examples.map((example, index) => (
                                <pre key={index} className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                                    <code>{example}</code>
                                </pre>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <h2>Usage Tips</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-blue-900 font-semibold mb-2">💡 Best Practices</h3>
                <ul className="text-blue-800 space-y-1">
                    <li>• Always review generated code before using in production</li>
                    <li>• Use the <code>--path</code> option to organize controllers in subdirectories</li>
                    <li>• Run schema generation commands after major content updates</li>
                    <li>• Use <code>make:all-resources</code> for existing databases</li>
                </ul>
            </div>
        </div>
    )
}
