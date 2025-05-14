import { useState } from 'react';
import { Link } from '@inertiajs/react';
import JobCard from '../../../components/frontend/searchPageComponent/JobCard';

const MicroJobSearchPage = () => {
    // Dummy categories data
    const categories = [
        { id: 'all', name: 'All Categories' },
        { id: 'web-development', name: 'Web Development' },
        { id: 'wordpress', name: 'WordPress' },
        { id: 'ecommerce', name: 'E-Commerce' },
        { id: 'graphic-design', name: 'Graphic Design' },
        { id: 'content-writing', name: 'Content Writing' }
    ];

    // State for selected category
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Sample job listings data with categories
    const allJobListings = [
        {
            id: 1,
            title: 'RESPONSIVE WEBSITE 24 HOURS',
            seller: 'SAWER D',
            description: 'I will be a wordpress website developer, and responsive website design builder',
            thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $80',
            originalPrice: '$50 (72)',
            rating: '4.9',
            reviews: '72',
            deliveryTime: '24 hours',
            category: 'web-development'
        },
        {
            id: 2,
            title: 'CUSTOM WEBSITE DEVELOPMENT',
            seller: 'US',
            description: 'ODDEL NOW',
            thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $100',
            deliveryTime: '3 days',
            category: 'web-development'
        },
        {
            id: 3,
            title: 'WORDPRESS WEBSITE DEVELOPMENT',
            seller: 'SWAPON Mia',
            description: 'I will do wordpress website development, design or redesign...',
            thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $90',
            originalPrice: '$4.9 (393)',
            rating: '4.9',
            reviews: '393',
            deliveryTime: '2 days',
            category: 'wordpress'
        },
        {
            id: 4,
            title: 'BUSINESS WEBSITE DEVELOPMENT',
            seller: 'Md. Omar Faruk',
            description: 'I will do business website development, design, redesign wordpress website',
            thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $130',
            originalPrice: '$4.9 (129)',
            rating: '4.9',
            reviews: '129',
            deliveryTime: '5 days',
            category: 'web-development'
        },
        {
            id: 5,
            title: 'DESIGN, REVISION, BUILD WORDPRESS WEBSITE',
            seller: 'A smart U',
            description: 'I will design or redesign responsive wordpress website, wordpress website...',
            thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $250',
            originalPrice: '$4.9 (63)',
            rating: '4.9',
            reviews: '63',
            features: ['Offers video consultations'],
            deliveryTime: '1 week',
            category: 'wordpress'
        },
        {
            id: 6,
            title: 'ECOMMERCE STORE SETUP',
            seller: 'ShopMaster',
            description: 'I will set up your ecommerce store with WooCommerce or Shopify',
            thumbnail: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $200',
            deliveryTime: '1 week',
            category: 'ecommerce'
        }
    ];

    // Filter jobs by selected category
    const filteredJobs = selectedCategory === 'all' 
        ? allJobListings 
        : allJobListings.filter(job => job.category === selectedCategory);

    return (
        <div className='bg-gray-100'>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="flex mb-4" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                                Home
                            </Link>
                        </li>
                        {selectedCategory !== 'all' && (
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                                        {categories.find(cat => cat.id === selectedCategory)?.name}
                                    </span>
                                </div>
                            </li>
                        )}
                    </ol>
                </nav>

                {/* Categories Navigation */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse Categories</h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category.id 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {selectedCategory === 'all' 
                                ? 'All Job Listings' 
                                : `${categories.find(cat => cat.id === selectedCategory)?.name} Jobs`}
                        </h1>
                        <p className="text-gray-600">{filteredJobs.length} results found</p>
                    </div>
                </div>

                {/* Results Section */}
                {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <Link 
                                to={`/job/${job.id}`} 
                                key={job.id}
                                className="hover:shadow-lg transition-shadow duration-300"
                            >
                                <JobCard job={job} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900">No jobs found in this category</h3>
                        <p className="text-gray-500 mt-2">Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MicroJobSearchPage;