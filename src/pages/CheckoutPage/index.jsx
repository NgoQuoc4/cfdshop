import React from 'react'
import ThumbHero from '../../components/ThumbHero'
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import PATHS from '../../constants/paths'
import CheckoutDiscount from './CheckoutDiscount'
import CheckoutForm from './CheckoutForm'
import useCheckoutPage from './useCheckoutPage'

const CheckoutPage = () => {
    const { couponProps, checkoutFormProps } = useCheckoutPage();
    return (
        <main className="main">
            <ThumbHero />
            <BreadCrumb>
                <BreadCrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </BreadCrumb.Item>
                <BreadCrumb.Item >
                    <Link to={PATHS.PRODUCTS}>Product</Link>
                </BreadCrumb.Item>
                <BreadCrumb.Item isActive>Check out</BreadCrumb.Item>
            </BreadCrumb>
            <div className="page-content">
                <div className="checkout">
                    <div className="container">
                        <CheckoutDiscount {...couponProps} />
                        <CheckoutForm {...checkoutFormProps} />
                    </div>
                </div>
            </div>
        </main>

    )
}

export default CheckoutPage