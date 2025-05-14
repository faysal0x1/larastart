import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'border border-gray-300 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;