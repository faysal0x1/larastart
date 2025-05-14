import { useState } from 'react';
// import { ChevronDown, ChevronUp, Star, Clock, Check, X } from 'lucide-react';
import CategoryDropdown from '../../../components/frontend/searchPageComponent/CategoryDropdown';
import ServiceOptionsDropdown from '../../../components/frontend/searchPageComponent/ServiceOptionsDropdown';
import SellerDetailsDropdown from '../../../components/frontend/searchPageComponent/SellerDetailsDropdown';
import BudgetDropdown from '../../../components/frontend/searchPageComponent/BudgetDropdown';
import JobCard from '../../../components/frontend/searchPageComponent/JobCard';
import FilterPill from '../../../components/frontend/searchPageComponent/FilterPill';

const MicroJobSearchPage = () => {
    // Sample data
    const jobListings = [
        {
            title: 'RESPONSIVE WEBSITE 24 HOURS',
            seller: 'SAWER D',
            description: 'I will be a wordpress website developer, and responsive website design builder',
            thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $80',
            originalPrice: '$50 (72)',
            rating: '4.9',
            reviews: '72',
            deliveryTime: '24 hours'
        },
        {
            title: 'CUSTOM WEBSITE DEVELOPMENT',
            seller: 'US',
            description: 'ODDEL NOW',
            thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $100',
            deliveryTime: '3 days'
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
            deliveryTime: '2 days'
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
            deliveryTime: '5 days'
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
            deliveryTime: '1 week'
        },
        {
            title: 'WEBSITE DEVELOPMENT',
            seller: 'GARANTIE',
            description: 'ODDED',
            thumbnail: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            price: 'From $150',
            deliveryTime: '4 days'
        }
    ];

    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedSellerDetails, setSelectedSellerDetails] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState(null);

    const toggleFilter = (filterName) => {
        setActiveFilter(activeFilter === filterName ? null : filterName);
    };

    return (
        <div className='bg-gray-100'>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Results for Web Development</h1>
                <p className="text-gray-600 mb-8">29,000+ results</p>


                {/* Filter Bar */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <CategoryDropdown
                        isOpen={activeFilter === 'category'}
                        toggle={() => toggleFilter('category')}
                        selected={selectedCategories}
                        setSelected={setSelectedCategories}
                    />

                    <ServiceOptionsDropdown
                        isOpen={activeFilter === 'service'}
                        toggle={() => toggleFilter('service')}
                        selected={selectedServices}
                        setSelected={setSelectedServices}
                    />

                    <SellerDetailsDropdown
                        isOpen={activeFilter === 'seller'}
                        toggle={() => toggleFilter('seller')}
                        selected={selectedSellerDetails}
                        setSelected={setSelectedSellerDetails}
                    />

                    <BudgetDropdown
                        isOpen={activeFilter === 'budget'}
                        toggle={() => toggleFilter('budget')}
                        selected={selectedBudget}
                        setSelected={setSelectedBudget}
                    />
                </div>

                {/* Active Filters */}
                {(selectedCategories.length > 0 || selectedServices.length > 0 ||
                    selectedSellerDetails.length > 0 || selectedBudget) && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {selectedCategories.map(cat => (
                                <FilterPill key={cat} label={cat} onRemove={() =>
                                    setSelectedCategories(selectedCategories.filter(c => c !== cat))} />
                            ))}
                            {selectedServices.map(service => (
                                <FilterPill key={service} label={service} onRemove={() =>
                                    setSelectedServices(selectedServices.filter(s => s !== service))} />
                            ))}
                            {selectedSellerDetails.map(detail => (
                                <FilterPill key={detail} label={detail} onRemove={() =>
                                    setSelectedSellerDetails(selectedSellerDetails.filter(d => d !== detail))} />
                            ))}
                            {selectedBudget && (
                                <FilterPill label={selectedBudget} onRemove={() => setSelectedBudget(null)} />
                            )}
                            <button
                                onClick={() => {
                                    setSelectedCategories([]);
                                    setSelectedServices([]);
                                    setSelectedSellerDetails([]);
                                    setSelectedBudget(null);
                                }}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Clear all
                            </button>
                        </div>
                    )}

                {/* Results Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {jobListings.map((job, index) => (
                        <JobCard key={index} job={job} />

                    ))}
                </div>
            </div>
        </div>
    );
};

export default MicroJobSearchPage;