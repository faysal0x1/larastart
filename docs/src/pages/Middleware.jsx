export default function Middleware() {
    return (
        <div className="doc-content">
            <h1>Middleware</h1>

            <p>
                Middleware in Larastart handles HTTP requests and provides functionality like authentication,
                authorization, and request processing.
            </p>

            <h2>Available Middleware</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Authentication</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• Authenticate</li>
                        <li>• RedirectIfAuthenticated</li>
                        <li>• EnsureEmailIsVerified</li>
                    </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Custom Middleware</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• CheckUserRole</li>
                        <li>• HandleAppearance</li>
                        <li>• HandleInertiaRequests</li>
                        <li>• TrustProxies</li>
                    </ul>
                </div>
            </div>

            <h2>Middleware Usage</h2>

            <h3>Route Middleware</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('users', UserController::class);
});`}</code>
            </pre>

            <h3>Custom Middleware</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`class CheckUserRole
{
    public function handle(Request $request, Closure $next, $role)
    {
        if (!auth()->user()->hasRole($role)) {
            abort(403);
        }

        return $next($request);
    }
}`}</code>
            </pre>
        </div>
    )
}
