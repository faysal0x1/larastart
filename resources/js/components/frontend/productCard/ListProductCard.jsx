import React from 'react';
import BaseProductCard from './BaseProductCard';

const ListProductCard = ({ product }) => {
    return (
        <BaseProductCard
            product={product}
            variant="list"
        />
    );
};

export default ListProductCard;

