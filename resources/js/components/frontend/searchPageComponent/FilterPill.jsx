
import { X } from 'lucide-react';

const FilterPill = ({ label, onRemove }) => (
    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
        <span>{label}</span>
        <button onClick={onRemove} className="text-gray-500 hover:text-gray-700">
            <X size={14} />
        </button>
    </div>
);

export default FilterPill;

