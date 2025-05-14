import { ChevronDown, ChevronUp } from 'lucide-react';

const BudgetDropdown = ({ isOpen, toggle, selected, setSelected }) => {
    const budgetRanges = [
        { label: 'Under $85', value: 'under-85' },
        { label: '$85 - $110', value: '85-110' },
        { label: '$110 - $205', value: '110-205' },
        { label: 'Above $205', value: 'above-205' }
    ];

    return (
        <div className="relative">
            <button
                onClick={toggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isOpen ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'}`}
            >
                <span>Budget</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                    <div className="space-y-2">
                        {budgetRanges.map(range => (
                            <button
                                key={range.value}
                                onClick={() => {
                                    setSelected(range.value === selected ? null : range.value);
                                    toggle();
                                }}
                                className={`w-full text-left px-3 py-2 rounded ${selected === range.value ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-50'}`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
export default BudgetDropdown;