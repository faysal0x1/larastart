import React from 'react';
import { Play, PhoneCall, X } from 'lucide-react';

// Renaming Play to PhoneCall for clarity in the button section
const Call = PhoneCall;

// WhatsApp Icon SVG Component
const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

// Helper function to format phone number for WhatsApp (remove +, spaces, dashes)
const formatPhoneForWhatsApp = (phone) => {
    if (!phone) return '';
    return phone.replace(/[\s+\-()]/g, '');
};

const ProductCard = ({
    badge,
    image,
    rating,
    reviewCount,
    title,
    promotion,
    discount,
    freeGift,
    price,
    originalPrice,
    hasVideo,
    videoUrl, // NEW: Prop to accept the video URL
    callForPriceNumber = '+880-17XX-XXXXXX' // Phone number for WhatsApp
}) => {
    // NEW: State to manage the visibility of the video modal
    const [showVideoModal, setShowVideoModal] = React.useState(false);

    // Function to handle the "Call for Price" action - redirects to WhatsApp
    const handleCallForPrice = (e) => {
        e.preventDefault();
        // Format phone number for WhatsApp (remove +, spaces, dashes)
        const formattedPhone = formatPhoneForWhatsApp(callForPriceNumber);
        const whatsappMessage = encodeURIComponent(`Hi, I'm interested in ${title}`);
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    // NEW: Handler for opening the video modal
    const handlePlayVideo = (e) => {
        e.stopPropagation(); // Prevent card click events
        if (videoUrl) {
            setShowVideoModal(true);
        } else {
            console.log('No video URL provided for this product.');
        }
    };

    // NEW: Handler for closing the video modal
    const handleCloseModal = () => {
        setShowVideoModal(false);
    };

    // Function to format the price with Taka sign and splitting logic
    const formatPrice = (p) => {
        if (!p) return null;

        // Clean up potential non-digit characters (like commas) before splitting
        const cleanedPrice = p.replace(/,/g, '');
        const [main, decimal] = cleanedPrice.split('.');

        return (
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">৳{main}</span>
                {/* Only show the decimal part if it exists */}
                {decimal && <span className="text-lg text-gray-900">.{decimal}</span>}
            </div>
        );
    };

    return (
        <>

            <div className="bg-sky-50/50 p-4  relative flex flex-col h-full">

                {/* Badge */}
                {badge && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded z-10 -skew-x-6">
                        {badge}
                    </div>
                )}

                {/* Image Container */}
                <div className="relative mb-4 flex items-center justify-center h-48 bg-white/50 rounded-lg p-2">
                    <img
                        src={image}
                        alt={title}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/CCCCCC/333333?text=Image+Missing"; }}
                    />
                    {hasVideo && (
                        <button
                            onClick={handlePlayVideo} // <-- Now opens the modal
                            className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-blue-50 transition duration-150"
                        >
                            <Play className="w-5 h-5 text-blue-600" fill="currentColor" />
                        </button>
                    )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                            </span>
                        ))}
                    </div>
                    <span className="text-gray-600 text-sm">({reviewCount})</span>
                </div>

                {/* Title */}
                <h3 className="text-sm text-gray-800 mb-3 line-clamp-2 flex-grow font-medium">
                    {title}
                </h3>

                {/* Promotion */}
                {promotion && (
                    <p className="text-xs text-red-600 mb-2 line-clamp-2 italic">
                        {promotion}
                    </p>
                )}

                {/* Badges for discount and free gift */}
                <div className="flex gap-2 mb-3">
                    {discount && (
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded -skew-x-6 shadow-sm">
                            {discount}
                        </span>
                    )}
                    {freeGift && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded -skew-x-6 shadow-sm">
                            {freeGift}
                        </span>
                    )}
                </div>

                {/* Price and Call for Price Block */}
                <div className="mt-auto pt-3 border-t border-gray-200">

                    {/* Price Display (Only if price exists) */}
                    {price && (
                        <div className="mb-2">
                            {formatPrice(price)}
                            {originalPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                    ৳{originalPrice}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Call for Price Button and Phone Number (Always Visible) */}
                    <div className="mt-2">
                        <button
                            onClick={handleCallForPrice}
                            className="w-full text-center text-white bg-[#25D366] border border-[#25D366] hover:bg-[#20BA5A] font-semibold text-sm py-1.5 px-3 rounded-lg transition duration-150 ease-in-out flex items-center justify-center gap-2 shadow-sm -skew-x-12"
                        >
                            <WhatsAppIcon className="w-4 h-4" />
                            WhatsApp for Price
                        </button>

                        {/* Phone Number Display */}
                        <p className="text-xs text-gray-500 text-center mt-1.5">
                            Or call: <a href={`tel:${callForPriceNumber}`} className="font-bold text-gray-700 hover:text-blue-600 transition duration-150">{callForPriceNumber}</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Video Modal Overlay (The new functionality) */}
            {showVideoModal && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 transition-opacity duration-300"
                    // Close modal when clicking on the overlay background
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-4xl relative"
                        // Prevent closing when clicking inside the content box
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute -top-3 -right-3 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 z-10 shadow-lg transition duration-150"
                            aria-label="Close video player"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h4 className="text-lg font-bold mb-3 text-gray-800 line-clamp-1">Product Video: {title}</h4>

                        {videoUrl ? (
                            // Responsive container for 16:9 video aspect ratio
                            <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
                                <iframe
                                    title={`Video for ${title}`}
                                    // Using '?autoplay=1&rel=0' to auto-play (when allowed) and remove related videos
                                    src={videoUrl.includes('?') ? videoUrl : `${videoUrl}?autoplay=1&rel=0`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full"
                                ></iframe>
                            </div>
                        ) : (
                            <p className="text-center text-red-500 py-10">Video URL is currently unavailable for this product.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

const ProductGrid = () => {
    const products = [
        {
            badge: 'Black Friday Price Protection',
            image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
            rating: 4,
            reviewCount: 148,
            title: 'ABS Aqua Gaming PC - Windows 11 - Intel Core i9-14900KF - GeForce RTX 4070 Ti ABS Aqua Gaming PC - Windows 11 - Intel Core i9-14900KF - GeForce RTX 4070 Ti ABS Aqua Gaming PC - Windows 11 - Intel Core i9-14900KF - GeForce RTX 4070 Ti',
            promotion: 'Free Adobe Express & Bitdefender Total Security w/ purchase, limited offer',
            discount: 'Save 31%',
            price: '1,849.99',
            originalPrice: '2,699.99',
            hasVideo: true, // Button visible
            videoUrl: 'https://www.youtube.com/embed/Qd-LdM3gX_U' // Mock Video URL for a tech product
        },
        {
            badge: 'Limited Stock',
            image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop',
            rating: 4.5,
            reviewCount: 963,
            title: 'AOAOK Gaming PC Desktop AMD Ryzen 7 5700X, RTX 5060 Ti 8GB, 32GB DDR4, 1TB SSD',
            promotion: '৳60 promotional gift card w/ purchase, limited offer',
            discount: 'Save 50%',
            freeGift: 'Free Gift',
            price: '889.00',
            originalPrice: '1,799.99',
            hasVideo: true, // Button visible
            videoUrl: 'https://www.youtube.com/embed/g_CgD7H3w_0' // Mock Video URL for another tech product
        },
        {
            badge: 'New Arrival',
            image: 'https://images.unsplash.com/photo-1544377759-9f44146a8947?w=400&h=400&fit=crop',
            rating: 5,
            reviewCount: 12,
            title: 'Ultra Slim Laptop Pro X with 15-inch 4K OLED Display and 32GB RAM (Pricing Varies)',
            promotion: 'Exclusive pre-order bonus included!',
            discount: null,
            freeGift: 'Free Gift',
            price: null,
            originalPrice: null,
            hasVideo: false, // No video button for this one
            videoUrl: null
        },
        {
            badge: 'Best Seller',
            image: 'https://images.unsplash.com/photo-1599508704512-4f165971a539?w=400&h=400&fit=crop',
            rating: 4.8,
            reviewCount: 2005,
            title: 'Ergonomic Mechanical Keyboard RGB Backlit with Brown Switches',
            promotion: 'Get 10% off your next accessory purchase.',
            discount: '25% Off',
            freeGift: null,
            price: '5,200.50',
            originalPrice: '6,934.00',
            hasVideo: false,
            videoUrl: null
        },
        {
            badge: 'Hot Deal',
            image: 'https://images.unsplash.com/photo-15467385965902b74070a3791?w=400&h=400&fit=crop',
            rating: 4.2,
            reviewCount: 78,
            title: 'High-Fidelity Wireless Noise Cancelling Headphones, Long Battery Life',
            promotion: null,
            discount: 'Save 15%',
            freeGift: 'Free Case',
            price: '4,500.00',
            originalPrice: null,
            hasVideo: true, // Button visible
            videoUrl: 'https://www.youtube.com/embed/4yW5P3w2KGo' // Mock Video URL
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-[Inter]">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Default export is App for single file React component structure
export default ProductGrid;
