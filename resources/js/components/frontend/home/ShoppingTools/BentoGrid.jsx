import { Link } from '@inertiajs/react';
import LazyImage from '@/components/LazyImage';

export default function BentoGrid() {
    return (
        // <div className="grid grid-cols-12 grid-rows-4 gap-4 h-[800px] max-w-[1680px] mx-auto">
        <div className="grid grid-cols-12 gap-4 max-w-[1680px] mx-auto">

            {/* AI PC Store - Large left banner */}
            <Link href={route('pc.builder')} className="col-span-3 row-span-2 rounded-lg overflow-hidden relative group cursor-pointer">
                <LazyImage
                    src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=420&h=500&fit=crop"
                    alt="AI PC Store"
                    className="w-full h-full hover:scale-105 transition-transform duration-300"
                    objectFit="cover"
                />
            </Link>

            {/* 30 Days Lowest Price */}
            <Link href={route('deal.page')} className="col-span-3  rounded-lg overflow-hidden relative group cursor-pointer">
                <LazyImage
                    src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=420&h=240&fit=crop"
                    alt="30 Days Lowest Price"
                    className="w-full h-full hover:scale-105 transition-transform duration-300"
                    objectFit="cover"
                />
            </Link>

            {/* Best Sellers */}
            <Link href={route('best.sellers')} className="col-span-3  rounded-lg overflow-hidden relative group cursor-pointer">
                <LazyImage
                    src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=420&h=240&fit=crop"
                    alt="Best Sellers"
                    className="w-full h-full hover:scale-105 transition-transform duration-300"
                    objectFit="cover"
                />
            </Link>

            {/* Student Store - Large right banner */}
            <Link href="#" className="col-span-3 row-span-2 rounded-lg overflow-hidden relative group cursor-pointer">
                <LazyImage
                    src="https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=420&h=500&fit=crop"
                    alt="Student Store"
                    className="w-full h-full hover:scale-105 transition-transform duration-300"
                    objectFit="cover"
                />
            </Link>

            {/* TBz Select */}
            <Link href={route('products.index')} className="col-span-3  rounded-lg overflow-hidden relative group cursor-pointer">
                <LazyImage
                    src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=420&h=240&fit=crop"
                    alt="TBz Select"
                    className="w-full h-full hover:scale-105 transition-transform duration-300"
                    objectFit="cover"
                />
            </Link>

            {/* TBz Refreshed */}
            <Link href="#" className="col-span-3  rounded-lg overflow-hidden relative group cursor-pointer">
                <LazyImage
                    src="https://images.unsplash.com/photo-1591488320449-011701bb6704?w=420&h=240&fit=crop"
                    alt="TBz Refreshed"
                    className="w-full h-full hover:scale-105 transition-transform duration-300"
                    objectFit="cover"
                />
            </Link>
        </div>
    )
}
