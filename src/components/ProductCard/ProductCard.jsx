import React from 'react'
import PATHS from '../../constants/paths';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/format';
import { useDispatch } from 'react-redux';
import { handleAddCart } from '../../store/reducers/cartReducer';
import { handleAddWishList } from '../../store/reducers/authReducer';

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;
const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { id, images, slug, title, price, rating, discount, color } = product || {};
    const productPath = PATHS.PRODUCTS + `/${slug}`;

    const _onAddToCar = (e) => {
        e?.preventDefault();
        const addPayload = {
            addedId: id,
            addedColor: color?.[0] || "",
            addedQuantity: 1,
            addedPrice: price - discount,
        }
        dispatch(handleAddCart(addPayload));
    }

    const _onAddWishList = (e) => {
        e?.preventDefault();
        const addPayload = {
            product: id,
        }
        dispatch(handleAddWishList(addPayload));
    }
    return (
        <div className="product product-2">
            <figure className="product-media">
                {discount > 0 && <span className="product-label label-circle label-sale">Sale</span>}
                <Link to={productPath} style={{ height: 275 }}>
                    {images?.length > 0 ? (
                        <img src={images[0] || ""}
                            alt="Product image" className="product-image"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }} />) : (
                        <ImageWrapper>
                            <Empty description=""
                                image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </ImageWrapper>
                    )

                    }
                </Link>
                <div className="product-action-vertical">
                    <a href="#" onClick={_onAddWishList} className="btn-product-icon btn-wishlist btn-expandable">
                        <span>add to wishlist</span>
                    </a>
                </div>
                <div className="product-action product-action-dark">
                    <a href="#" onClick={_onAddToCar} className="btn-product btn-cart" title="Add to cart">
                        <span>add to cart</span>
                    </a>
                </div>
            </figure>
            <div className="product-body">
                <h3 className="product-title">
                    <Link to={productPath}>{title || ""}</Link>
                </h3>
                <div className="product-price">
                    {discount ? (
                        <>
                            {" "}
                            <span className="new-price">
                                ${formatCurrency(price - discount)}
                            </span>
                            <span className="old-price">
                                Was ${formatCurrency(price)}
                            </span>{" "}
                        </>
                    ) : (
                        <>${formatCurrency(price || 0)}</>
                    )}</div>
                <div className="ratings-container">
                    <div className="ratings">
                        <div className="ratings-val" style={{ width: `${(rating || 0) * 20}%  ` }} />
                    </div>
                    <span className="ratings-text">( {rating} Reviews )</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard