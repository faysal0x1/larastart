export default function Helpers() {
    return (
        <div className="doc-content">
            <h1>Helper Functions</h1>

            <p>
                Larastart includes various helper functions that provide common utilities for development.
                These helpers are automatically loaded and available throughout your application.
            </p>

            <h2>Available Helpers</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Helper.php</h3>
                    <p className="text-gray-600 mb-4">General utility functions</p>
                    <ul className="space-y-2 text-sm">
                        <li>• formatCurrency()</li>
                        <li>• formatDate()</li>
                        <li>• generateSlug()</li>
                        <li>• sanitizeInput()</li>
                        <li>• validateEmail()</li>
                    </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">QueryBuilderHelper.php</h3>
                    <p className="text-gray-600 mb-4">Database query builder utilities</p>
                    <ul className="space-y-2 text-sm">
                        <li>• filters()</li>
                        <li>• search()</li>
                        <li>• sort()</li>
                        <li>• paginate()</li>
                    </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">ClientHelpers.php</h3>
                    <p className="text-gray-600 mb-4">Client-side helper functions</p>
                    <ul className="space-y-2 text-sm">
                        <li>• formatFileSize()</li>
                        <li>• validateForm()</li>
                        <li>• showNotification()</li>
                        <li>• debounce()</li>
                    </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">NotificationHelper.php</h3>
                    <p className="text-gray-600 mb-4">Notification and messaging utilities</p>
                    <ul className="space-y-2 text-sm">
                        <li>• sendNotification()</li>
                        <li>• broadcastMessage()</li>
                        <li>• formatMessage()</li>
                    </ul>
                </div>
            </div>

            <h2>Usage Examples</h2>

            <h3>General Helpers</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`// Format currency
$price = formatCurrency(1000, 'USD'); // $1,000.00

// Format date
$date = formatDate('2024-01-01'); // January 1, 2024

// Generate slug
$slug = generateSlug('Hello World'); // hello-world

// Sanitize input
$clean = sanitizeInput('<script>alert("xss")</script>'); // Cleaned text`}</code>
            </pre>

            <h3>Query Builder Helpers</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`// Get filters from request
$filters = QueryBuilderHelper::filters($request);

// Apply search
$query = QueryBuilderHelper::search($query, $request->search, ['name', 'email']);

// Apply sorting
$query = QueryBuilderHelper::sort($query, $request->sort, $request->direction);`}</code>
            </pre>

            <h3>Client Helpers</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`// Format file size
const size = formatFileSize(1024); // "1 KB"

// Show notification
showNotification('Success!', 'success');

// Debounce function
const debouncedSearch = debounce(searchFunction, 300);`}</code>
            </pre>
        </div>
    )
}
