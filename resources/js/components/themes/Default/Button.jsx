import React from 'react';

export default function Button({ type = 'button', className = '', processing, children, ...props }) {
    return (
        <button
            type={type}
            className={`inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150 ${
                processing && 'opacity-25'
            } ${className}`}
            disabled={processing}
            {...props}
        >
            {children}
        </button>
    );
}