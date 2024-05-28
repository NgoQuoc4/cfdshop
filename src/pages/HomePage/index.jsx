import React from 'react'
import IntroSection from './IntroSection'
import HotProductSection from './HotProductSection'
import DealSection from './DealSection'
import GetDealSection from './GetDealSection'
import FeaturedProductsSection from './FeaturedProductsSection'
import BrandSection from './BrandSection'
import ServiceSection from './ServiceSection'
import useHomePage from './useHomePage'

const HomePage = () => {
    const { introProps, hotProducts, dealProps, brandProps, featuredProps, servicesProps, getDealProps } = useHomePage();
    return (
        <>
            <main className="main">
                <IntroSection {...introProps} />
                <HotProductSection {...hotProducts} />
                <div className="mb-7 mb-lg-11" />
                <DealSection {...dealProps} />
                <BrandSection {...brandProps} />
                <div className="container">
                    <hr className="mt-3 mb-6" />
                </div>
                <div className="container">
                    <hr className="mt-5 mb-6" />
                </div>
                <FeaturedProductsSection {...featuredProps} />
                <div className="container">
                    <hr className="mt-5 mb-0" />
                </div>
                <ServiceSection {...servicesProps} />
                <GetDealSection {...getDealProps} />
            </main>
        </>
    )
}

export default HomePage