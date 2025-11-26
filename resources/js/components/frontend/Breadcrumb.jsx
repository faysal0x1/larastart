import { Home } from 'lucide-react';

export default function Breadcrumb({ product }) {
    const breadcrumbData = [
        product?.category?.slug && {
            name: product?.category?.name,
            href: route('web.slug', product?.category?.slug),
        },
        product?.sub_category?.slug && {
            name: product?.sub_category?.name,
            href: route('web.slug', product?.sub_category?.slug),
        },
        product?.child_category?.slug && {
            name: product?.child_category?.name,
            href: route('web.slug', product?.child_category?.slug),
        },
        { name: product?.name, href: null },
    ].filter(Boolean); // removes any false/null/undefined items

    return (
        <div className="mx-auto max-w-[1680px] px-2 py-2 sm:px-4 sm:py-3">
            <nav className="mx-auto" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {/* Home Icon/Link */}
                    <li className="flex-shrink-0">
                        <a
                            href="/"
                            className="text-gray-400 transition-colors hover:text-red-600 flex items-center justify-center"
                            aria-label="Home"
                        >
                            <Home size={14} className="sm:w-4 sm:h-4" />
                        </a>
                    </li>

                    {/* Breadcrumb Items */}
                    {breadcrumbData.map((item, index) => {
                        const isLast = index === breadcrumbData.length - 1;
                        return (
                            <li key={index} className="flex items-center flex-shrink-0">
                                <span className="mx-1 sm:mx-2 text-gray-300 text-xs sm:text-sm">/</span>
                                {isLast || !item.href ? (
                                    <span className="max-w-[120px] sm:max-w-xs overflow-hidden font-medium text-ellipsis whitespace-nowrap text-gray-700 text-xs sm:text-sm">
                                        {item.name}
                                    </span>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="whitespace-nowrap transition-colors text-xs sm:text-sm text-gray-500 hover:text-red-600 max-w-[100px] sm:max-w-none overflow-hidden text-ellipsis"
                                    >
                                        {item.name}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
}
