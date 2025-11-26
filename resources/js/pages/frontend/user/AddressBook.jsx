import AddAddressModal from '@/components/frontend/AddAddressModal';
import Sidebar from '@/components/frontend/Sideber';
import WebLayout from '@/layouts/web/WebLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';


const AddressBook = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <WebLayout>
            <Head>
                <title>Profile - Address</title>
                <meta
                    name="description"
                    content="Manage your addresses in the Address Book."
                />
                <meta name="keywords" content="address book, contacts, manage addresses" />
                <link rel="canonical" href="https://tbz.com.bd/" />
                {/* Open Graph Tags */}
                <meta property="og:title" content="Profile - Address" />
                <meta property="og:description" content="Manage your addresses in the Address Book." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tbz.com.bd/" />
                <meta property="og:image" content="https://tbz.com.bd/images/og-home.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="TBZ" />
                <meta property="og:locale" content="en_US" />
                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@tbz" />
                <meta name="twitter:creator" content="@tbz" />
                <meta name="twitter:title" content="Profile - Address" />
                <meta name="twitter:description" content="Manage your addresses in the Address." />
                <meta name="twitter:image" content="https://tbz.com.bd/images/twitter-home.jpg" />
                {/* Additional Meta Tags */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="TBZ" />
                <meta name="theme-color" content="#2563eb" />
                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'TBZ',
                        url: 'https://tbz.com.bd/',
                        logo: 'https://tbz.com.bd/images/logo.png',
                        description: 'Manage your addresses in the Address.',
                        applicationCategory: 'BusinessApplication',
                    })}
                </script>
            </Head>
            <div className="min-h-screen bg-gray-50 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row">
                        {/* Sidebar Navigation */}
                        <Sidebar activePage="addressBook" />

                        {/* Main Content */}
                        <div className="flex-1">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Address Book</h2>
                                <p className="mt-1 text-gray-600">Manage your addresses.</p>
                            </div>

                            <div className="mb-6 rounded-lg bg-white text-black p-4 shadow-sm">
                                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
                                    <label className="text-sm font-medium text-gray-700">Search Within:</label>
                                    <input
                                        type="search"
                                        className="flex-1 rounded-md border border-gray-300 px-3 py-1 text-sm"
                                        placeholder="Search..."
                                    />
                                    <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
                                        <option value="0">Address Name</option>
                                        <option value="1">Contact Person's Name</option>
                                        <option value="2">Company Name</option>
                                        <option value="3">Address</option>
                                        <option value="4">City</option>
                                        <option value="5">State/Province/Region</option>
                                        <option value="6">Zip/Postal Code</option>
                                    </select>
                                    <button className="rounded-md bg-sky-800 px-4 py-1 text-sm text-white transition-colors hover:bg-gray-500">
                                        GO
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={openModal}
                                className="mb-6 flex items-center rounded-md bg-sky-800 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-1 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add New Address
                            </button>

                            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="py-8 text-center text-gray-500">No addresses found. Add your first address!</p>
                            </div>

                            <div id="sentinel" className="h-10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Address Modal */}
            <AddAddressModal isOpen={isModalOpen} onClose={closeModal} />
        </WebLayout>
    );
};

export default AddressBook;
