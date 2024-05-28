import React, { useEffect } from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import PATHS from '../../constants/paths'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { productService } from '../../services/productService'
import useMutation from '../../hooks/useMutation'
import ProductDetailsTop from './ProductDetailsTop';
import ProductDetailsTab from './ProductDetailsTab';
import useProductDetailPage from './useProductDetailPage';

const ProductDetailPage = () => {
    const { productName, productDetailTopProps, productDetailTabProps } = useProductDetailPage();

    return (
        <main className="main">
            <BreadCrumb>
                <BreadCrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </BreadCrumb.Item>
                <BreadCrumb.Item >
                    <Link to={PATHS.PRODUCTS}>Product</Link>
                </BreadCrumb.Item>
                <BreadCrumb.Item isActive>{productName || ""}</BreadCrumb.Item>
            </BreadCrumb>
            <div className="page-content">
                <div className="container">
                    <ProductDetailsTop {...productDetailTopProps} />
                    <ProductDetailsTab {...productDetailTabProps} />
                </div>
            </div>
        </main>

    )
}

export default ProductDetailPage