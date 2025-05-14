import { useState } from 'react';
import { Link } from '@inertiajs/react';
import JobCard from '../../../components/frontend/searchPageComponent/JobCard';

const categorySearch = ({ category, microTask, count }) => {
    // Sample data filtered by category if provided
   

    
    // Get category name for breadcrumb


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
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <Link to={`/category/${category}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                                        {category.name}
                                    </Link>
                                </div>
                            </li>
                        )}
                    </ol>
                </nav>

                {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {category ? `Results for ${getCategoryName(category)}` : 'All Job Listings'}
                </h1> */}
                <p className="text-gray-600 mb-8">{count}+ results</p>

                {/* Results Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {microTask.map((job, index) => (
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