export default function Services() {
    return (
        <div className="doc-content">
            <h1>Services</h1>

            <p>
                Services in Larastart handle business logic and complex operations.
                They provide a clean separation between controllers and repositories.
            </p>

            <h2>Available Services</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Core Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• CountryService</li>
                        <li>• GlobalNotificationService</li>
                        <li>• SchemaService</li>
                        <li>• ImageService</li>
                    </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Feature Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• BlogService</li>
                        <li>• UserService</li>
                        <li>• ChatService</li>
                        <li>• FileService</li>
                    </ul>
                </div>
            </div>

            <h2>Service Usage</h2>

            <h3>Dependency Injection</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`class BlogController extends Controller
{
    public function __construct(
        private readonly BlogService $blogService
    ) {
    }

    public function store(BlogStoreRequest $request)
    {
        $blog = $this->blogService->create($request->validated());
        return redirect()->route('blogs.index');
    }
}`}</code>
            </pre>
        </div>
    )
}
