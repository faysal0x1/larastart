import { Link } from 'react-router-dom'
import { BookOpen, Code, Settings, Database, Shield, Wrench, Layers, Server, Users, Rocket } from 'lucide-react'

const features = [
  {
    name: 'Laravel Backend',
    description: 'Full-featured Laravel 12 application with modern PHP practices',
    icon: Server,
    href: '/controllers'
  },
  {
    name: 'React Frontend',
    description: 'Modern React 19 frontend with Inertia.js for seamless SPA experience',
    icon: Layers,
    href: '/components'
  },
  {
    name: 'Artisan Commands',
    description: 'Powerful CLI commands for rapid development and code generation',
    icon: Code,
    href: '/commands'
  },
  {
    name: 'Helper Functions',
    description: 'Utility functions and helpers for common development tasks',
    icon: Wrench,
    href: '/helpers'
  },
  {
    name: 'Models & Relationships',
    description: 'Eloquent models with proper relationships and traits',
    icon: Database,
    href: '/models'
  },
  {
    name: 'Services & Repositories',
    description: 'Service layer and repository pattern implementation',
    icon: Settings,
    href: '/services'
  },
  {
    name: 'Middleware',
    description: 'Custom middleware for authentication, authorization, and more',
    icon: Shield,
    href: '/middleware'
  },
  {
    name: 'Utilities',
    description: 'JavaScript utilities and helper functions',
    icon: Wrench,
    href: '/utils'
  }
]

export default function Home() {
  return (
    <div className="doc-content">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Larastart Documentation
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete documentation for Larastart - A powerful Laravel React starter kit with modern development tools and best practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <Link
            key={feature.name}
            to={feature.href}
            className="group relative bg-white p-6 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center mb-4">
              <feature.icon className="h-8 w-8 text-primary-600 group-hover:text-primary-700" />
              <h3 className="ml-3 text-lg font-semibold text-gray-900 group-hover:text-primary-700">
                {feature.name}
              </h3>
            </div>
            <p className="text-gray-600 group-hover:text-gray-700">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-8 mb-8">
        <div className="text-center">
          <Rocket className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Start Guide
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get up and running with Larastart in minutes. Follow our comprehensive getting started guide to set up your development environment.
          </p>
          <Link
            to="/getting-started"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Laravel 12 with modern PHP practices</li>
            <li>• React 19 with Inertia.js</li>
            <li>• Tailwind CSS for styling</li>
            <li>• TypeScript support</li>
            <li>• Authentication & Authorization</li>
            <li>• Role & Permission system</li>
            <li>• File upload handling</li>
            <li>• Real-time notifications</li>
            <li>• API development tools</li>
            <li>• Testing setup</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Rapid development with code generators</li>
            <li>• Pre-built UI components</li>
            <li>• Form handling and validation</li>
            <li>• Data tables with sorting/filtering</li>
            <li>• Modal dialogs and notifications</li>
            <li>• Dark mode support</li>
            <li>• Responsive design</li>
            <li>• SEO optimization</li>
            <li>• Performance optimization</li>
            <li>• Security best practices</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
