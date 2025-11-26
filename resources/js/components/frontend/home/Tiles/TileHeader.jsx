import React from 'react';

const TileHeader = ({ children }) => {
    return (
        <div className="home-tile-title text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            {children}
        </div>
    );
};

export default TileHeader;


