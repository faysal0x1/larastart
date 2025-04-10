import { useForm } from '@inertiajs/react';

// import { SelectTagComponent } from '@/components/SelectTagComponent';
import SelectTagComponent from '../../components/SelectTagComponent';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        body: '',
        tags: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posts.store'));
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold">Create a New Post</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                    {errors.title && <div className="mt-1 text-sm text-red-500">{errors.title}</div>}
                </div>
                <div>
                    <label className="block font-semibold">Body</label>
                    <textarea
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                    {errors.body && <div className="mt-1 text-sm text-red-500">{errors.body}</div>}
                </div>
                {/* Optional: tag selection */}
                <SelectTagComponent data={data} setData={setData} errors={errors} />

                <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    {processing ? 'Saving...' : 'Save Post'}
                </button>
            </form>
        </div>
    );
}
