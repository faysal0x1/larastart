import React from 'react';
import { Link } from '@inertiajs/react';

const Hero = () => {
    const popularTags = ['Design', 'Writing', 'Video', 'Data Entry', 'Programming', 'Marketing', 'Translation', 'Social Media'];

    const handleTagClick = (tag) => {
        console.log(`Searching for: ${tag}`);
    };

    return (
        <div className="bg-gradient text-black min-h-[680px] flex items-center">
            <div className="max-w-7xl mx-auto w-full py-20 px-4 sm:py-28 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-light text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Find the perfect freelance services for your business
                    </h1>
                    <p className="text-light mt-6 max-w-lg mx-auto text-xl">
                        Get your micro-tasks completed quickly by talented freelancers worldwide
                    </p>
                    <div className="mt-8 max-w-4xl mx-auto">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            // You can use Inertia's visit function to navigate to search results
                            const query = e.target.elements.search.value;
                            window.location.href = route('search', { query });
                        }}>
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="search"
                                    className="bg-light block w-full rounded-md border-0 py-4 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Search for micro-jobs..."
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <button
                                        type="submit"
                                        className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            {popularTags.slice(0, 5).map((category) => (
                                <Link
                                    key={category.id}
                                    // href={route('search', { tag: category.name })}
                                    className="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-white/10 text-light hover:bg-white/20 transition-colors duration-200"
                                >
                                    {category.name}
                                </Link>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;