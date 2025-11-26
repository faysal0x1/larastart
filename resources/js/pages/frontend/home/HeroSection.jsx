import MegaMenu from "@/components/frontend/home/ecommerce/MegaMenu"
import HeroBanner from "@/components/frontend/home/ecommerce/HeroBanner"
import LeftDealsSlider from "@/components/frontend/home/ecommerce/LeftDealsSlider"
import CenterDealStatic from "@/components/frontend/home/ecommerce/CenterDealStatic"
import RightDealsSlider from "@/components/frontend/home/ecommerce/RightDealsSlider"
import PromoCard from "@/components/frontend/home/ecommerce/PromoCard"
// import BannerOne from '../../../../../public/image/BannerOne.jpg'

export default function HeroSection() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 p-2 sm:p-4">
            <div className="mx-auto max-w-[1680px] space-y-2 sm:space-y-4">
                <div className="flex items-stretch gap-2 sm:gap-4">
                    {/* <div className="flex items-stretch gap-2 sm:gap-4"> */}
                    <div className="hidden lg:block relative">
                        <MegaMenu />
                    </div>
                    <div className="flex-1 space-y-2 sm:space-y-4">
                        <HeroBanner />
                        <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 ">
                            <LeftDealsSlider />
                            <CenterDealStatic />
                            <RightDealsSlider />
                        </div>
                    </div>
                </div>
             
             <div className="hidden lg:block">
                   <div className=" grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2 ">
                    <img
                        className="w-full h-44 lg:h-52 rounded-lg"
                        src="/image/BannerOne.jpg"
                        alt="BannerOne"
                    />
                    <img
                        className="w-full h-44 lg:h-52 rounded-lg"
                        src="/image/BannerTwo.jpg"
                        alt="BannerTwo"
                    />

                </div>

             </div>
            </div>
        </div>
    )
}
