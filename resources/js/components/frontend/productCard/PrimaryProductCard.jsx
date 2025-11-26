import React from 'react';
import BaseProductCard from './BaseProductCard';

const PrimaryProductCard = ({ product, className = '', gridCardHeight, ...rest }) => (
        <BaseProductCard
        {...rest}
            product={product}
        className={className}
        gridCardHeight={gridCardHeight}
            variant="grid"
        />
    );

export default PrimaryProductCard;
