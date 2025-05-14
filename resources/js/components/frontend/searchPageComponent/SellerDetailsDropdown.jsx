import { ChevronDown, ChevronUp } from 'lucide-react';

const SellerDetailsDropdown = ({ isOpen, toggle, selected, setSelected }) => {
    const sellerOptions = {
      'Seller level': ['Top Rated Seller', 'Level 2', 'Level 1', 'New Seller'],
      'Rate type': ['Offers hourly rates'],
      'Seller type': ['Agency'],
      'Seller availability': ['Online Now'],
      'Seller speaks': ['English', 'Urdu']
    };
  
    const toggleOption = (option) => {
      if (selected.includes(option)) {
        setSelected(selected.filter(o => o !== option));
      } else {
        setSelected([...selected, option]);
      }
    };
  
    return (
      <div className="relative">
        <button
          onClick={toggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isOpen ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'}`}
        >
          <span>Seller details</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            {Object.entries(sellerOptions).map(([category, options]) => (
              <div key={category} className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
                <div className="space-y-2 pl-2">
                  {options.map(option => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() => toggleOption(option)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-2 pt-3 border-t border-gray-200">
              <button 
                onClick={() => setSelected([])}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear all
              </button>
              <button 
                onClick={toggle}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  export default SellerDetailsDropdown