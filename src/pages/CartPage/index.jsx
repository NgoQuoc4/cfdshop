import React from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import ThumbHero from '../../components/ThumbHero'
import { Link } from 'react-router-dom'
import PATHS from '../../constants/paths'
import CartTable from './CartTable'
import CartSummary from './CartSummary'
import useCartPage from './useCartPage'

const CartPage = () => {
    const { cartTableProps, cartSummaryProps } = useCartPage();
    return (
        <main className="main">
            <ThumbHero page="Shopping Cart" />
            <BreadCrumb>
                <BreadCrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </BreadCrumb.Item>
                <BreadCrumb.Item >
                    <Link to={PATHS.PRODUCTS}>Product</Link>
                </BreadCrumb.Item>
                <BreadCrumb.Item isActive>Shopping Cart</BreadCrumb.Item>
            </BreadCrumb>
            <div className="page-content">
                <div className="cart">
                    <div className="container">
                        <div className="row">
                            <CartTable {...cartTableProps} />
                            <CartSummary {...cartSummaryProps} />
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default CartPage