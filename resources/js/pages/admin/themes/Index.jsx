import { Head, useForm } from '@inertiajs/react';
// import { useTheme } from '@/ThemeProviders.jsx';
import AppLayout from '@/layouts/app-layout.jsx';

export default function Index({ themes, activeTheme }) {
    const { data, setData, post, processing, errors } = useForm({
        theme: activeTheme.slug,
    });

    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.themes.activate'));
    };

    return (
        <AppLayout>
            <Head title="Theme Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold mb-4">Theme Settings</h2>

                            <div className="mb-8">
                                <p className="mb-2">Current active theme: <strong>{activeTheme.name}</strong></p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    {themes.map((theme) => (
                                        <div
                                            key={theme.id}
                                            className={`border p-4 rounded-lg cursor-pointer transition-all ${
                                                data.theme === theme.slug ? 'border-blue-500 shadow-md' : 'border-gray-300'
                                            }`}
                                            onClick={() => setData('theme', theme.slug)}
                                        >
                                            <div className="flex items-center mb-2">
                                                <input
                                                    type="radio"
                                                    name="theme"
                                                    value={theme.slug}
                                                    checked={data.theme === theme.slug}
                                                    onChange={() => setData('theme', theme.slug)}
                                                    className="mr-2"
                                                />
                                                <h3 className="text-lg font-medium">{theme.name}</h3>
                                            </div>
                                            <p className="text-gray-600 text-sm">{theme.description}</p>

                                            {/* Theme preview mockup */}
                                            <div className={`mt-4 h-32 bg-gray-100 rounded border border-gray-200 flex items-center justify-center theme-preview-${theme.slug}`}>
                                                Preview
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center">
                                    <button
                                        type="submit"
                                        disabled={processing || data.theme === activeTheme.slug}
                                        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
                                            (processing || data.theme === activeTheme.slug) ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {processing ? 'Activating...' : 'Activate Theme'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
