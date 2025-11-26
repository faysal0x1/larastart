import React from 'react';
// import mocData from './mocData';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';
import ShoppingCart from './ShoppingCart';
const CartPage = () => {
    return (
        <div>
            <Navbar />
            {/* <Shoppingart products={mocData} /> */}
            <ShoppingCart/>
            <Footer />
        </div>
    );
};

export default CartPage;