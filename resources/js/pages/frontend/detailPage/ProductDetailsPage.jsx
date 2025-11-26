import React from 'react';
import MoreItemsToConsider from '@/components/frontend/home/MoreItemsToConsider';

const ProductDetailsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        More Items to Consider - Demo
                    </h1>
                    <p className="text-gray-600">
                        This is a JSX implementation of the "More Items to Consider" section
                        from the HTML reference, built with Tailwind CSS and component-based architecture.
                    </p>
                </div>

                <MoreItemsToConsider />
            </div>
        </div>
    );
};

export default ProductDetailsPage;
