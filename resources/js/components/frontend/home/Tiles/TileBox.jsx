import React from 'react';

const TileBox = ({ children, className = '' }) => {
    return (
        <div className={`home-tile-box grid gap-4 ${className}`}>
            {children}
        </div>
    );
};

export default TileBox;


