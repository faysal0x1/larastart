import { useState } from 'react';

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 pb-4">
      <button
        className="flex w-full items-center justify-between py-3 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600">
          {question}
        </h3>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-600 pl-2">{answer}</p>
      )}
    </div>
  );
}