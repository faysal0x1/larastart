import * as LucideIcons from 'lucide-react';
import { Keyboard, Paintbrush, Pen, Smartphone, Video } from 'lucide-react';

const iconMap = {
    'paint-brush': Paintbrush,
    'pen-fancy': Pen,
    video: Video,
    keyboard: Keyboard,
    'mobile-alt': Smartphone,
};

// const categories = [
//     { name: "Design", icon: "paint-brush", jobs: 1245 },
//     { name: "Writing", icon: "pen-fancy", jobs: 892 },
//     { name: "Video", icon: "video", jobs: 567 },
//     { name: "Data Entry", icon: "keyboard", jobs: 2134 },
//     { name: "App Testing", icon: "mobile-alt", jobs: 756 },
// ];
function toPascalCase(str) {
    if (!str || typeof str !== 'string') return '';
    return str
        .split(/[-_ ]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

const BrowseCategories = ({ categories }) => {
    return (
        <div className="bg-gray-50 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-primary text-base font-semibold tracking-wide uppercase">Browse Micro-Jobs</h2>
                    <p className="text-dark mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">Find work by category</p>
                </div>
                {/* icons and category list  */}
                <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {categories.slice(0,3).map((category, index) => {
                        const iconName = toPascalCase(category.icon);
                        const Icon = LucideIcons[iconName];
                        return (
                            <div
                                key={index}
                                className="overflow-hidden rounded-lg bg-white shadow transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="px-4 py-5 text-center sm:p-6">
                                    <div className="bg-primary/10 text-primary mx-auto flex h-12 w-12 items-center justify-center rounded-md">
                                        {Icon && <Icon className="h-6 w-6" />}
                                    </div>
                                    <h3 className="text-dark mt-3 text-lg font-medium">{category.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {/*{category.jobs.toLocaleString()} available jobs*/}
                                        10 available jobs
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10 text-center">
                    <a
                        href="#"
                        className="bg-primary hover:bg-primary/90 inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm"
                    >
                        Browse All Categories
                        <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BrowseCategories;
