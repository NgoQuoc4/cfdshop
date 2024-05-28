import React from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import Pagination from '../../components/Pagination'
import { Link } from 'react-router-dom'
import PATHS from '../../constants/paths'
import ProductToolbox from './ProductToolbox'
import useProductPage from './useProductPage'
import ProductList from './ProductList'
import ProductFilter from './ProductFilter'

const ProductPage = () => {
    const { toolboxProps, productListProps, pagiProps, filterProps } = useProductPage();
    return (
        <main className="main">
            <div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
                <div className="container">
                    <h1 className="page-title">Product</h1>
                </div>
            </div>
            <BreadCrumb>
                <BreadCrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </BreadCrumb.Item>
                <BreadCrumb.Item isActive>Product</BreadCrumb.Item>
            </BreadCrumb>

            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <ProductToolbox {...toolboxProps} />
                            <ProductList {...productListProps} />
                            <Pagination {...pagiProps} />
                        </div>
                        <ProductFilter {...filterProps} />
                    </div>
                </div>
            </div>
        </main>

    )
}

export default ProductPage