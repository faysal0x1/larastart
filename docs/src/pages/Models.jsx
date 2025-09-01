export default function Models() {
    return (
        <div className="doc-content">
            <h1>Models</h1>

            <p>
                Larastart uses Eloquent models with proper relationships, traits, and scopes.
                Models are organized with best practices and include common functionality.
            </p>

            <h2>Model Structure</h2>

            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Available Models</h3>
                <ul className="space-y-2">
                    <li>• User - User authentication and profile</li>
                    <li>• Blog - Blog posts and articles</li>
                    <li>• BlogCategory - Blog categories</li>
                    <li>• BlogComment - Blog comments</li>
                    <li>• Country - Country data</li>
                    <li>• MicroTask - Micro tasks and jobs</li>
                    <li>• MicroTaskCategory - Task categories</li>
                    <li>• Conversation - Chat conversations</li>
                    <li>• Message - Chat messages</li>
                </ul>
            </div>

            <h2>Model Features</h2>

            <h3>Traits</h3>
            <ul>
                <li>• HasFloatWallet - Wallet functionality</li>
                <li>• Deletable - Soft delete functionality</li>
                <li>• Searchable - Search functionality</li>
                <li>• Filterable - Filter functionality</li>
            </ul>

            <h3>Relationships</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`// User model relationships
public function blogs()
{
    return $this->hasMany(Blog::class);
}

public function microTasks()
{
    return $this->hasMany(MicroTask::class);
}

public function conversations()
{
    return $this->hasMany(Conversation::class);
}`}</code>
            </pre>

            <h3>Scopes</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`// Active scope
public function scopeActive($query)
{
    return $query->where('status', 'active');
}

// Published scope
public function scopePublished($query)
{
    return $query->where('published_at', '<=', now());
}`}</code>
            </pre>
        </div>
    )
}
