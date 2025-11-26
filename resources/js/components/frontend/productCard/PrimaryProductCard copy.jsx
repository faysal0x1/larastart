import React from 'react';
import BaseProductCard from './BaseProductCard';

const PrimaryProductCard = ({ product }) => {
    return (
        <BaseProductCard
            product={product}
            variant="grid"
        />
    );
};

export default PrimaryProductCard;
