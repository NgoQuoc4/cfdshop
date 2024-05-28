import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileMenu from '../../components/MobileMenu'
import AuthenModal from '../../components/AuthenModal'
import ScrollTop from '../../components/ScrollTop'
import { Outlet } from 'react-router-dom';
import MainContextProvider from '../../context/MainContext'
import AuthContextProvider from '../../context/AuthContext'

const MainLayout = () => {
    return (
        <MainContextProvider>
            <AuthContextProvider>
                <>
                    <div className="page-wrapper">
                        < Header />
                        <Outlet />
                        <Footer />
                    </div >
                    <ScrollTop />
                    <MobileMenu />
                    <AuthenModal />
                </>
            </AuthContextProvider>

        </MainContextProvider>

    )
}

export default MainLayout