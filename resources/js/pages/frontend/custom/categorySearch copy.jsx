import { useState } from 'react';
import { Link } from '@inertiajs/react';
import JobCard from '../../../components/frontend/searchPageComponent/JobCard';

const categorySearch = ({ category }) => {
    // Sample data filtered by category if provided
    const allJobListings = [
        {
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
            title: 'CUSTOM WEBSITE DEVELOPMENT',
            seller: 'US',
            description: 'ODDEL NOW',
            thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $100',
            deliveryTime: '3 days',
            category: 'web-development'
        },
        {
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
            title: 'WEBSITE DEVELOPMENT',
            seller: 'GARANTIE',
            description: 'ODDED',
            thumbnail: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $150',
            deliveryTime: '4 days',
            category: 'web-development'
        }
    ];

    // Filter jobs by category if provided
    const jobListings = category 
        ? allJobListings.filter(job => job.category === category)
        : allJobListings;

    // Get category name for breadcrumb
  
    const getCategoryName = (category) => {
        const categoryNames = {
            'web-development': 'Web Development',
            'wordpress': 'WordPress'
        };
        return categoryNames[category] || category;
    };

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
                        {category && (
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <Link to={`/category/${category}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                                        {getCategoryName(category)}
                                    </Link>
                                </div>
                            </li>
                        )}
                    </ol>
                </nav>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {category ? `Results for ${getCategoryName(category)}` : 'All Job Listings'}
                </h1>
                <p className="text-gray-600 mb-8">{jobListings.length}+ results</p>

                {/* Results Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {jobListings.map((job, index) => (
                        <Link to={`/job/${job.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                            <JobCard job={job} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default categorySearch;