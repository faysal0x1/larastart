export default function Repositories() {
  return (
    <div className="doc-content">
      <h1>Repositories</h1>

      <p>
        Repositories in Larastart implement the repository pattern to abstract data access logic.
        They provide a clean interface for database operations.
      </p>

      <h2>Repository Structure</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Interfaces</h3>
          <ul className="space-y-2 text-sm">
            <li>• BaseRepositoryInterface</li>
            <li>• BlogRepositoryInterface</li>
            <li>• UserRepositoryInterface</li>
            <li>• CountryRepositoryInterface</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Implementations</h3>
          <ul className="space-y-2 text-sm">
            <li>• BaseRepository</li>
            <li>• BlogRepository</li>
            <li>• BlogCategoryRepository</li>
            <li>• CountryRepository</li>
          </ul>
        </div>
      </div>

      <h2>Repository Usage</h2>

      <h3>Interface Definition</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <code>{`interface BlogRepositoryInterface
{
    public function paginate(Request $request);
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}`}</code>
      </pre>

      <h3>Implementation</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
        <code>{`class BlogRepository extends BaseRepository implements BlogRepositoryInterface
{
    public function __construct(Blog $model)
    {
        parent::__construct($model);
    }

    public function paginate(Request $request)
    {
        return $this->model
            ->with(['category', 'author'])
            ->when($request->search, function($query, $search) {
                return $query->where('title', 'like', "%{$search}%");
            })
            ->paginate($request->per_page ?? 15);
    }
}`}</code>
      </pre>
    </div>
  )
}
