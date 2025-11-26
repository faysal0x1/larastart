import React from 'react';

const ProductCard = () => {
  return (
    <div className="grid-col">
      <div className="goods-container bg-white rounded-md relative p-4 border border-gray-200 shadow-sm" data-itemnumber="14-500-598">
        <div className="tag-list absolute top-2 left-2 z-10">
          <div className="tag transform -skew-x-12 bg-blue-600 inline-block px-2 py-1">
            <div className="tag-text transform skew-x-12 text-white text-xs font-bold">Newegg Select</div>
          </div>
        </div>
        
        <div className="goods-info mb-3">
          <a
            href="#"
            className="goods-title text-sm font-semibold block mb-2 line-clamp-2 h-10"
            title="View Details"
          >
            YAWYORE Gaming PC Desktop Computer, AMD Ryzen 5 5600GT, 16G...
          </a>
          
          <p className="goods-promo text-xs text-orange-500 mb-2">$20 promotional gift card w/ purchase, limited offer</p>
          
          <div className="flex items-center mb-2">
            <span className="free-gift-badge bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Free Gift</span>
          </div>
          
          <div className="goods-price mb-2">
            <div className="goods-price-current">
              <span className="goods-price-symbol text-lg font-bold">$</span>
              <span className="goods-price-value text-lg font-bold">419</span>
              <sup className="text-lg font-bold">.99</sup>
            </div>
            <div className="goods-price-was text-gray-500 text-xs line-through">$819.99</div>
          </div>
          
          <div className="goods-msg">
            <div className="goods-save flex items-center bg-red-100 text-red-700 w-fit px-2 py-1 rounded">
              <strong className="text-sm font-bold">48</strong>
              <div className="goods-save-off ml-1 text-xs">
                <span>%</span>
                <span>off</span>
              </div>
            </div>
          </div>
        </div>
        
        <a
          href="#"
          className="goods-img block text-center"
        >
          <img 
            src="https://placehold.co/200x200"
            className="mx-auto"
            title="YAWYORE Gaming PC Desktop Computer"
            alt="YAWYORE Gaming PC Desktop Computer"
          />
        </a>
      </div>
    </div>
  );
};

export default ProductCard;