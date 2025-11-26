import { useState, useEffect } from 'react';
import AddToCartModal from '@/components/frontend/common/SlideInModal';
import BestDealComponents from '@/components/frontend/home/BestDeal/BestDealComponents.jsx';
import ProductivityShowcase from '@/components/frontend/home/Productivity/ProductivityShowcase.jsx';
import NewAtTbz from '@/components/frontend/home/ProductShowSlider/NewAtTbz.jsx';
import NewSelected from '@/components/frontend/home/ProductShowSlider/NewSelected.jsx';
import LaptopSection from '@/components/frontend/home/ProductShowSlider/LaptopSection.jsx';
import BentoGrid from '@/components/frontend/home/ShoppingTools/BentoGrid.jsx';
import ShoppingTools from '@/components/frontend/home/ShoppingTools/ShoppingTools.jsx';
import FeatureTiles from '@/components/frontend/home/Tiles/FeatureTiles.jsx';
import FeaturedBrands from './FeaturedBrands.jsx';
import HeroSection from './HeroSection';
import TbzSelected from '@/components/frontend/home/ProductShowSlider/TbzSelected.jsx';
import AllProductsGrid from '@/components/frontend/home/ProductShowSlider/AllProductsGrid.jsx';
import serviceWorkerManager from '@/utils/serviceWorker';
import { preloadImages } from '@/utils/imageCache';




const Home = () => {

    // Modal state for Add to Cart
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [cartModalData, setCartModalData] = useState(null);

    // Initialize service worker only
    useEffect(() => {
        serviceWorkerManager.register();
    }, []);

    // Handler for opening cart modal
    const handleOpenCartModal = (productData) => {
        // Transform product data to match AddToCartModal expected structure
        const transformedData = {
            name: productData?.name || 'Product',
            image: productData?.image_url || productData?.img || '/placeholder.svg',
            price: parseFloat(productData?.final_price || productData?.price || 0),
            originalPrice:
                productData?.unit_price && productData?.final_price && parseFloat(productData.unit_price) > parseFloat(productData.final_price)
                    ? parseFloat(productData.unit_price)
                    : null,
        };

        setCartModalData(transformedData);
        setIsCartModalOpen(true);
    };

    // Handler for closing cart modal
    const handleCloseCartModal = () => {
        setIsCartModalOpen(false);
        setCartModalData(null);
    };



    return (
        <div className="min-h-screen bg-gray-100">
            <HeroSection />
            <BestDealComponents onAddToCart={handleOpenCartModal} hideIfEmpty />
            <FeatureTiles />
            <NewSelected onAddToCart={handleOpenCartModal} />
            <ProductivityShowcase />
            {/* <MoreItemsDemo /> */}
            <TbzSelected />
            <NewAtTbz onAddToCart={handleOpenCartModal} />
            <LaptopSection onAddToCart={handleOpenCartModal} />
            <AllProductsGrid onAddToCart={handleOpenCartModal} />
            <ShoppingTools />
            <BentoGrid />
            <FeaturedBrands />
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="flex-1"></div>
                </div>
            </div>

            {/* Global Add to Cart Modal */}
            <AddToCartModal
                isOpen={isCartModalOpen}
                onClose={handleCloseCartModal}
                product={cartModalData}
                cartSubtotal={cartModalData?.price || 0}
                cartItemCount={1}
            />

            {/* <Footer /> */}
        </div>
    );
};

export default Home;
