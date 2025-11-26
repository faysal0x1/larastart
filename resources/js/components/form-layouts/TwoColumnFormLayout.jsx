import React from 'react';

export default function TwoColumnFormLayout({ fields = [], renderFieldBlock }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.filter(field => field && field.name).map((field) => (
                <div key={field.name}>
                    {renderFieldBlock(field)}
                </div>
            ))}
        </div>
    );
}


