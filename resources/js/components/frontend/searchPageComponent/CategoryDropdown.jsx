import { ChevronDown, ChevronUp } from 'lucide-react';

const CategoryDropdown = ({ isOpen, toggle, selected, setSelected }) => {
    const categories = [
      'WordPress Development',
      'Custom Websites Development',
      'Website Development',
      'Software Development',
      'Web Application Development',
      'Mobile App Development',
      'Cross-Platform Mobile App Development',
      'Shopify Development'
    ];
  
    const toggleCategory = (category) => {
      if (selected.includes(category)) {
        setSelected(selected.filter(c => c !== category));
      } else {
        setSelected([...selected, category]);
      }
    };
  
    return (
      <div className="relative">
        <button
          onClick={toggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isOpen ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'}`}
        >
          <span>Category</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
              <button 
                onClick={() => setSelected([])}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear
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

  export default CategoryDropdown ;