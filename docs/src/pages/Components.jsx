import { Layers, Code, Settings } from 'lucide-react'

export default function Components() {
  return (
    <div className="doc-content">
      <h1>React Components</h1>
      
      <p>
        Larastart includes a comprehensive set of pre-built React components that follow modern design patterns 
        and are built with accessibility in mind. These components are built on top of Radix UI primitives 
        and styled with Tailwind CSS.
      </p>

      <h2>Component Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">UI Components</h3>
          <p className="text-gray-600 mb-4">Reusable UI components built with Radix UI primitives</p>
          <ul className="space-y-2 text-sm">
            <li>• Button</li>
            <li>• Input</li>
            <li>• Select</li>
            <li>• Checkbox</li>
            <li>• Dialog</li>
            <li>• Dropdown Menu</li>
            <li>• Alert</li>
            <li>• Avatar</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Layout Components</h3>
          <p className="text-gray-600 mb-4">Page layout and structure components</p>
          <ul className="space-y-2 text-sm">
            <li>• AppLayout</li>
            <li>• AuthLayout</li>
            <li>• AppHeader</li>
            <li>• AppSidebar</li>
            <li>• Breadcrumbs</li>
            <li>• MainLayout</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Form Components</h3>
          <p className="text-gray-600 mb-4">Form handling and validation components</p>
          <ul className="space-y-2 text-sm">
            <li>• GlobalForm</li>
            <li>• FormField</li>
            <li>• FormSection</li>
            <li>• ValidationError</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Data Display</h3>
          <p className="text-gray-600 mb-4">Components for displaying and managing data</p>
          <ul className="space-y-2 text-sm">
            <li>• DataTable</li>
            <li>• ListingPage</li>
            <li>• PaginationComponent</li>
            <li>• ActionsDropdown</li>
            <li>• Modal</li>
          </ul>
        </div>
      </div>

      <h2>Usage Examples</h2>

      <h3>Basic Component Usage</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <code>{`import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function MyComponent() {
  return (
    <div>
      <Input placeholder="Enter your name" />
      <Button>Click me</Button>
    </div>
  )
}`}</code>
      </pre>

      <h3>Form Component Usage</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <code>{`import GlobalForm from '@/components/GlobalForm'

export default function CreateUser() {
  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true
    }
  ]

  return (
    <GlobalForm
      title="Create User"
      fields={fields}
      submitUrl="/users"
      submitLabel="Create User"
    />
  )
}`}</code>
      </pre>

      <h2>Component Features</h2>
      
      <ul>
        <li>• Built with Radix UI primitives for accessibility</li>
        <li>• Styled with Tailwind CSS</li>
        <li>• Dark mode support</li>
        <li>• TypeScript support</li>
        <li>• Consistent design system</li>
        <li>• Responsive design</li>
      </ul>
    </div>
  )
}
