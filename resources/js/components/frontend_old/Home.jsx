// import React from 'react';
import BestSeller from "./BestSeller/BestSeller";
import Categories from "./Categories/Categories";
import CountDown from "./CountDown/CountDown";
import Marquee from "../../../src/Component/Marquee/Marquee";
import ShopCollection from "../../../src/Component/ShopCollection/ShopCollection";
import ShowProduct from "../../../src/Component/ShowProduct/ShowProduct";

import Slider from "../../../src/Component/Slider/Slider";
import StoreSection from "../../../src/Component/StoreSection/StoreSection";
const Home = () => {
    return (
        <>
            <Slider></Slider>
            <Marquee />
            <Categories />
            <BestSeller/>
            <CountDown />
            <ShowProduct></ShowProduct>
            <ShopCollection />
            <StoreSection/>

        </>
    );
};

export default Home;