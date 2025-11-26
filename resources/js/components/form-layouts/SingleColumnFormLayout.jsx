import React from 'react';

export default function SingleColumnFormLayout({ fields = [], renderFieldBlock }) {
    return (
        <div className="space-y-4">
            {fields.filter(field => field && field.name).map((field) => (
                <div key={field.name}>
                    {renderFieldBlock(field)}
                </div>
            ))}
        </div>
    );
}


