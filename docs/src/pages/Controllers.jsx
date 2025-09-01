export default function Controllers() {
    return (
        <div className="doc-content">
            <h1>Controllers</h1>

            <p>
                Controllers in Larastart follow RESTful conventions and use dependency injection.
                They work seamlessly with Inertia.js for SPA functionality.
            </p>

            <h2>Controller Structure</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Admin Controllers</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• BlogController</li>
                        <li>• BlogCategoryController</li>
                        <li>• CountryController</li>
                        <li>• UserController</li>
                    </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Web Controllers</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• WebController</li>
                        <li>• ChatController</li>
                        <li>• Auth Controllers</li>
                    </ul>
                </div>
            </div>

            <h2>Controller Features</h2>

            <h3>Dependency Injection</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`class BlogController extends Controller
{
    public function __construct(
        private readonly BlogRepositoryInterface $blogRepository
    ) {
    }
}`}</code>
            </pre>

            <h3>Inertia Responses</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`public function index(Request $request): Response
{
    $blogs = $this->blogRepository->paginate($request);

    return Inertia::render('blog/index', [
        'blogs' => $blogs,
        'filters' => QueryBuilderHelper::filters($request),
    ]);
}`}</code>
            </pre>
        </div>
    )
}
