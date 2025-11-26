import React from 'react';

export default function SectionedFormLayout({ sections = [], fields = [], renderFieldBlock }) {
    const fieldByName = Object.fromEntries(fields.filter(f => f && f.name).map(f => [f.name, f]));

    return (
        <div className="space-y-6">
            {sections.map((section, idx) => {
                const {
                    title,
                    description,
                    fields: sectionFieldNames = [],
                    layout = 'grid',
                    gridCols = 2,
                } = section || {};

                const sectionFields = sectionFieldNames
                    .map((name) => fieldByName[name])
                    .filter(Boolean);

                const gridClass = layout === 'grid'
                    ? `grid grid-cols-1 md:grid-cols-${gridCols} gap-4`
                    : 'space-y-4';

                return (
                    <div key={idx} className="space-y-3">
                        {(title || description) && (
                            <div>
                                {title && <h3 className="text-lg font-semibold">{title}</h3>}
                                {description && <p className="text-sm text-muted-foreground">{description}</p>}
                            </div>
                        )}

                        <div className={gridClass}>
                            {sectionFields.map((field) => (
                                <div key={field.name}>
                                    {renderFieldBlock(field)}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


