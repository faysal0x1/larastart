import { ChevronDown, Clock, List, Search } from 'lucide-react';

const TopNavigation = ({ selectedStore, setSelectedStore, saleType, setSaleType, searchInvoice, setSearchInvoice }) => {
    return (
        <div className="animate-fadeIn mx-16 flex w-2/3 items-center space-x-2 rounded-md bg-white p-4 shadow">
            <div className="flex flex-1 space-x-2">
                <div className="relative w-32">
                    <select
                        className="w-full appearance-none rounded-md border bg-white p-2 transition-colors focus:ring-2 focus:ring-blue-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option>MyStore</option>
                        <option>Store 2</option>
                        <option>Store 3</option>
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute top-3 right-2 text-gray-500" />
                </div>

                <div className="relative w-32">
                    <select
                        className="w-full appearance-none rounded-md border bg-white p-2 transition-colors focus:ring-2 focus:ring-blue-300"
                        value={saleType}
                        onChange={(e) => setSaleType(e.target.value)}
                    >
                        <option>Sale</option>
                        <option>Return</option>
                        <option>Estimate</option>
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute top-3 right-2 text-gray-500" />
                </div>

                <div className="flex flex-1 items-center overflow-hidden rounded-md border transition-all focus-within:ring-2 focus-within:ring-blue-300">
                    <input
                        type="text"
                        placeholder="Search Invoice #"
                        className="flex-1 p-2 outline-none"
                        value={searchInvoice}
                        onChange={(e) => setSearchInvoice(e.target.value)}
                    />
                    <button className="flex items-center bg-gray-500 p-2 text-white transition-colors hover:bg-gray-600">
                        <Search size={18} />
                        <span className="ml-1">Search</span>
                    </button>
                </div>
            </div>

            <button className="flex items-center rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600">
                <Clock size={18} />
                <span className="ml-1">Recent</span>
            </button>

            <button className="flex items-center rounded-md bg-yellow-500 p-2 text-white transition-colors hover:bg-yellow-600">
                <List size={18} />
                <span className="ml-1">Hold List</span>
            </button>
        </div>
    );
};

export default TopNavigation;
