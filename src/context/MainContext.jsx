import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

const MainContext = createContext({});
const MainContextProvider = ({ children }) => {
    const { pathname } = useLocation();

    const [isShowNavbar, setIsShowNavbar] = useState(false);

    useEffect(() => {
        handleCloseMobileMenu();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [pathname]);

    const handleShowMobileMenu = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        setIsShowNavbar(true);
        $("body").addClass("mmenu-active");
    }
    const handleCloseMobileMenu = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        $("body").removeClass("mmenu-active");
    }

    return (
        <MainContext.Provider
            value={{
                isShowNavbar,
                handleShowMobileMenu,
                handleCloseMobileMenu
            }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContextProvider;
export const useMainContext = () => useContext(MainContext);