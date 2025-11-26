import React from "react";
import HeaderTop from "./HeaderTop";
import Nav from "./Nav";
// import HeaderNav from "./HeaderNav";

const Header = () => {
    return (
        <header className="w-full">
            <HeaderTop />
            <Nav/>
        </header>
    );
};

export default Header;


