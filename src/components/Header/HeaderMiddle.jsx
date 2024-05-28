import React, { useEffect, useState } from 'react'
import { MenuStyle } from '../StyleComponent'
import { Link, NavLink } from 'react-router-dom'
import PATHS from '../../constants/paths'
import HeaderSearch from './HeaderSearch'
import HeaderDropdown from './HeaderDropdown'
import useHeaderMiddle from './useHeaderMiddle'

const HeaderMiddle = () => {

    const { isShowNavbar, handleShowMobileMenu, cartDropDownProps } = useHeaderMiddle();

    // const [showNavbar, setShowNavbar] = useState(false);

    // useEffect(() => {
    //     if (isShowNavbar) {
    //         $("mobile-menu-toggler").addClass("active");
    //     } else {
    //         $("mobile-menu-toggler").removeClass("active");
    //     }
    // }, [isShowNavbar]);

    // const toggleMenu = (e) => {
    //     e.stopPropagation();
    //     handleShowNavbar?.(!isShowNavbar);
    //     console.log("toggleMenu");
    // };
    return (
        <div className="header-middle sticky-header">
            <div className="container">
                <div className="header-left">
                    <button className={`mobile-menu-toggler ${isShowNavbar} ? "active" : "" `} onClick={handleShowMobileMenu}>
                        <span className="sr-only">Toggle mobile menu</span>
                        <i className="icon-bars" />
                    </button>
                    <Link to={PATHS.HOME} className="logo">
                        <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
                    </Link>
                </div>
                <nav className="main-nav">
                    <MenuStyle className="menu">
                        <li>
                            <NavLink end to={PATHS.HOME}>Home</NavLink>
                        </li>
                        <li >
                            <NavLink to={PATHS.ABOUT}>About Us</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.PRODUCTS}>Product</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.BLOG}>Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
                        </li>
                    </MenuStyle>
                </nav>
                <div className="header-right">
                    <HeaderSearch />
                    <HeaderDropdown {...cartDropDownProps} />
                </div>
            </div>
        </div >
    )
}

export default HeaderMiddle