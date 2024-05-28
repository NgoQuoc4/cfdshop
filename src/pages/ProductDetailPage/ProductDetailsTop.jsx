import React, { useEffect } from 'react'
import styled from 'styled-components';
import { Empty, message } from 'antd';

import { formatCurrency, transformNumberToPercent } from '../../utils/format';
import ProductColor from './ProductColor';
import QuantityInput from './QuantityInput';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';
import ShareLink from '../../components/ShareLink';
import ProductImagesZoom from './ProductImagesZoom';
import { useDispatch } from 'react-redux';
import { handleAddWishList } from '../../store/reducers/authReducer';
const ProductDetailsTop = ({
    reviews,
    id,
    images,
    name,
    price,
    color,
    rating,
    category,
    stock,
    description,
    title,
    colorRef,
    quantityRef,
    handleAddToCart,
    handleAddToWishList,

}) => {

    const pathUrl = window.location.href;
    const categoryPath = category?.id && PATHS.PRODUCTS + `?category=${category?.id}`;


    const _onAddToCart = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        handleAddToCart();
    }
    const _onAddWishList = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        handleAddToWishList();
    }

    return (
        <div className="product-details-top">
            <div className="row">
                <div className="col-md-6">
                    <ProductImagesZoom images={images} />
                </div>
                <div className="col-md-6">
                    <div className="product-details">
                        <h1 className="product-title">{name || ""}</h1>
                        <div className="ratings-container">
                            <div className="ratings">
                                <div className="ratings-val" style={{ width: `${(transformNumberToPercent(rating))}%  ` }} />
                            </div>
                            <a className="ratings-text" href="#product-review-link" id="review-link">( {reviews?.length} Reviews )</a>
                        </div>
                        <div className="product-price"> ${formatCurrency(price)}</div>
                        <div className="product-content"
                            dangerouslySetInnerHTML={{ __html: description }}>
                        </div>
                        <div className="details-filter-row details-row-size">
                            <label>Color:</label>
                            <ProductColor
                                ref={colorRef}
                                colors={color} />
                        </div>
                        <div className="details-filter-row details-row-size">
                            <label htmlFor="qty">Qty:</label>
                            <QuantityInput
                                max={stock}
                                ref={quantityRef} />
                        </div>
                        <div className="product-details-action">
                            <a href="#"
                                className="btn-product btn-cart"
                                onClick={_onAddToCart}>
                                <span>add to cart</span>
                            </a>
                            <div className="details-action-wrapper">
                                <a href="#"
                                    className="btn-product btn-wishlist"
                                    title="Wishlist"
                                    onClick={_onAddWishList}
                                >
                                    <span>Add to Wishlist</span>
                                </a>
                            </div>
                        </div>
                        <div className="product-details-footer">
                            <div className="product-cat">
                                <span>Category:</span>
                                <Link to={categoryPath}>{category?.name || ""}</Link>
                            </div>
                            <div className="social-icons social-icons-sm">
                                <span className="social-label">Share:</span>
                                <ShareLink
                                    title="Facebook"
                                    path={pathUrl}
                                >
                                    <i className="icon-facebook-f" />
                                </ShareLink>
                                <ShareLink
                                    title="Twitter"
                                    path={pathUrl}
                                    type="twitter"
                                >
                                    <i className="icon-twitter" />
                                </ShareLink>
                                <ShareLink
                                    title="Instagram"
                                    path={pathUrl}
                                    type="instagram"
                                >
                                    <i className="icon-instagram" />
                                </ShareLink>
                                <ShareLink
                                    title="Pinterest"
                                    path={pathUrl}
                                    type="pinterest"
                                >
                                    <i className="icon-pinterest" />
                                </ShareLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductDetailsTop