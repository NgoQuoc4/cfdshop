import React from 'react'
import styled from 'styled-components'
import PATHS from '../../constants/paths'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/format'
import { Modal } from 'antd';
import ProductColor from '../../pages/ProductDetailPage/ProductColor'
import tokenMethod from '../../utils/token'
const DropdownContainer = styled.div`
    max-height: 30vh;
    overflow-y:scroll;
    padding-right: 25px;
    /* width */
    &::-webkit-scrollbar{
        width: 10px;
    }
    /* Track */
    &::-webkit-scrollbar-track{
        background: #f1f1f1;
    }
    /* handle */
    &::-webkit-scrollbar-thumb{
        background: #888;
    }
    /* handle hover */
    &::-webkit-scrollbar-thumb:hover{
        background: #555;
    }
`
const ProductCartDetailWrapper = styled.h3`
    display: flex !important;
    flex-direction: column;
    gap: 10px;
    .product-variant{
        display: flex ;
        align-items: center;
        gap: 5px;
        font-size:14px;
    }
    .product-nav-dots{
        margin: 0;
    }
`

const HeaderDropdown = ({ products, total, shipping, handleRemoveProduct }) => {
    const { confirm } = Modal;
    const _onRemoveClick = (e, removedIndex) => {
        e.preventDefault();
        e?.stopPropagation();
        const removedProduct = products?.[removedIndex] || {};
        confirm({
            title: "Do you want to remove this item from carts?",
            content: (
                <>
                    <p>{`${removedProduct.name || ""}`}</p>
                    <p>{`${removedProduct.quantity || 0} x $${removedProduct.price}`}</p>
                </>
            ),
            onOk() {
                if (removedIndex > -1) {
                    handleRemoveProduct?.(removedIndex);
                }
            },
            onCancel() {
                console.log("Cancel")
            }
        })
    }
    return (
        <div className="dropdown cart-dropdown">

            <a href="#" className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-display="static">
                <i className="icon-shopping-cart" />
                {tokenMethod.get()
                    ? (<span className="cart-count">{products?.length || 0}</span>)
                    : (<span className="cart-count">{0}</span>)}
            </a>


            <div className="dropdown-menu dropdown-menu-right" style={{ width: 400 }}>
                {products?.length > 0 ? (
                    <>
                        <DropdownContainer className="dropdown-cart-products">
                            {products?.map((item, index) => {
                                const { id, images, name, price, slug, quantity, variant } = item || {};
                                const detailPath = PATHS.PRODUCTS + `/${slug}`;
                                let imagePath = images?.[0];
                                if (imagePath?.split("https")?.length > 2) {
                                    imagePath = imagePath?.split("https");
                                    imagePath = "https" + imagePath[2];
                                }
                                return (
                                    <div key={id + index} className="product">
                                        <ProductCartDetailWrapper className="product-cart-details">
                                            <h4 className="product-title">
                                                <Link to={detailPath}>{name || ""}</Link>
                                            </h4>
                                            <div className="product-variant">
                                                Color:{""}
                                                <ProductColor colors={[variant]} />
                                            </div>
                                            <span className="cart-product-info">
                                                <span className="cart-product-qty">{quantity || ""}
                                                </span>{""}
                                                x ${formatCurrency(price)}{""}
                                            </span>
                                        </ProductCartDetailWrapper>
                                        <figure className="product-image-container">
                                            <Link to={detailPath} className="product-image">
                                                <img src={imagePath} alt={name} />
                                            </Link>
                                        </figure>
                                        <a href="#"
                                            className="btn-remove"
                                            title="Remove Product"
                                            onClick={(e) => _onRemoveClick(e, index)}
                                        >
                                            <i className="icon-close" />
                                        </a>
                                    </div>
                                )
                            })}
                        </DropdownContainer>
                        <div className="dropdown-cart-total">
                            <span>Total</span>
                            <span className="cart-total-price">${formatCurrency(total || 0)}</span>
                        </div>
                        <div className="dropdown-cart-action">
                            <Link to={PATHS.CART} className="btn btn-primary">View Cart</Link>
                            {shipping?.typeShip && (
                                <Link to={PATHS.CHECKOUT} className="btn btn-outline-primary-2">
                                    <span>Checkout</span>
                                    <i className="icon-long-arrow-right" />
                                </Link>
                            )}

                        </div>
                    </>
                ) : (
                    <p>
                        There is no any product in cart -{""}
                        <Link to={PATHS.PRODUCTS}>Go to shop</Link>
                    </p>
                )}

            </div>
        </div >
    )
}

export default HeaderDropdown