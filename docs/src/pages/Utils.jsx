export default function Utils() {
    return (
        <div className="doc-content">
            <h1>Utilities</h1>

            <p>
                Larastart includes various utility functions and helpers for common development tasks.
                These utilities are available in both PHP and JavaScript.
            </p>

            <h2>JavaScript Utilities</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Table Utils</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• column()</li>
                        <li>• createSerialColumn()</li>
                        <li>• createToggleColumn()</li>
                        <li>• createActionColumn()</li>
                    </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">General Utils</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• formatDate()</li>
                        <li>• formatCurrency()</li>
                        <li>• debounce()</li>
                        <li>• throttle()</li>
                    </ul>
                </div>
            </div>

            <h2>Usage Examples</h2>

            <h3>Table Utilities</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`import { column, createSerialColumn } from '@/utils/tableUtils'

const columns = [
  createSerialColumn('Serial'),
  column('name', 'Name'),
  column('email', 'Email'),
  column('created_at', 'Created At', (item) => formatDate(item.created_at))
]`}</code>
            </pre>

            <h3>General Utilities</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`import { formatDate, formatCurrency, debounce } from '@/utils/utils'

// Format date
const formattedDate = formatDate('2024-01-01')

// Format currency
const price = formatCurrency(1000, 'USD')

// Debounce function
const debouncedSearch = debounce(searchFunction, 300)`}</code>
            </pre>

            <h2>PHP Utilities</h2>

            <p>
                PHP utilities are available as helper functions and can be used throughout your application:
            </p>

            <ul>
                <li>• formatCurrency() - Format currency values</li>
                <li>• formatDate() - Format dates</li>
                <li>• generateSlug() - Generate URL-friendly slugs</li>
                <li>• sanitizeInput() - Clean user input</li>
                <li>• validateEmail() - Email validation</li>
            </ul>
        </div>
    )
}
