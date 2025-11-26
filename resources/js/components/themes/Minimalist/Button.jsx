import React from 'react';

export default function Button({ type = 'button', className = '', processing, children, ...props }) {
    return (
        <button
            type={type}
            className={`inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-sm font-normal text-xs text-gray-800 tracking-wide hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:border-gray-400 focus:ring ring-gray-200 disabled:opacity-25 transition ease-in-out duration-150 ${
                processing && 'opacity-25'
            } ${className}`}
            disabled={processing}
            {...props}
        >
            {children}
        </button>
    );
}