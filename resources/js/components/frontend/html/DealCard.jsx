import React from 'react';
export default function DealCard({
    href = '#',
    image,
    title,
    badgeText,
    ratingValue, // 0-5 like 4, 4.5, etc.
    ratingCount,
    promoText,
    priceInt, // like '2,279'
    priceDec = '99', // like '99'
    wasPrice,
    shipText,
    savePct, // like 5
}) {
    return (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
            {/* tag-list at-top-left */}
            {badgeText && (
                <div className="absolute z-10 m-2">
                    <a className="inline-block bg-blue-600 text-white text-[10px] px-2 py-0.5 skew-x-[-12deg] rounded-sm">
                        <div className="skew-x-[12deg]">{badgeText}</div>
                    </a>
                </div>
            )}

            <div className="p-3">
                {/* goods-info */}
                <div className="mb-2">
                    {/* goods-branding has-brand-store + rating */}
                    {(typeof ratingValue === 'number' || typeof ratingCount === 'number') && (
                        <a href={href} className="inline-flex items-center gap-1" title={`Rating + ${ratingValue || 0}`}>
                            <i
                                className="inline-block w-16 h-3 bg-[length:80px_12px] bg-no-repeat"
                                aria-label={`rated ${ratingValue || 0} out of 5`}
                                style={{ backgroundImage: 'linear-gradient(90deg,#f59e0b 0%,#f59e0b 50%,#e5e7eb 50%,#e5e7eb 100%)' }}
                            />
                            {typeof ratingCount === 'number' && (
                                <span className="text-xs text-gray-500">({ratingCount})</span>
                            )}
                        </a>
                    )}

                    {/* goods-title */}
                    <a href={href} className="block mt-1 text-sm font-medium text-gray-900">
                        {title}
                    </a>

                    {/* goods-promo */}
                    {promoText && (
                        <p className="mt-1 text-xs text-orange-700">{promoText}</p>
                    )}

                    {/* goods-price */}
                    <div className="mt-2">
                        <div className="flex items-start gap-1 text-gray-900">
                            <span className="text-sm">$</span>
                            <span className="text-2xl font-semibold leading-6">{priceInt}</span>
                            <sup className="text-sm leading-5">.{priceDec}</sup>
                        </div>
                        {wasPrice && (
                            <div className="text-xs text-gray-500 line-through">{wasPrice}</div>
                        )}
                        {shipText && (
                            <div className="text-xs text-gray-500">
                                <span className="text-blue-600">{shipText}</span>
                            </div>
                        )}
                    </div>

                    {/* goods-msg / goods-save */}
                    {typeof savePct === 'number' && (
                        <div className="mt-2 flex items-center gap-1">
                            <div className="text-red-600 font-semibold text-base">{savePct}</div>
                            <div className="text-red-600 text-sm flex items-center gap-0.5">
                                <span>%</span>
                                <span>off</span>
                            </div>
                            <div className="hidden" />
                        </div>
                    )}
                </div>
            </div>

            {/* goods-img */}
            <a href={href} className="block">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-44 object-contain"
                    loading="lazy"
                />
            </a>
        </div>
    );
}


