import React from 'react'
import styled from 'styled-components'
import { Modal, Empty } from 'antd';
import PATHS from '../../constants/paths';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/format';
import ProductColor from '../ProductDetailPage/ProductColor';
import QuantityInput from '../ProductDetailPage/QuantityInput';

const ProductTitle = styled.h3`
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

const CartTable = ({
    products,
    quantityRef,
    handleRemoveProduct,
    handleUpdateQuantity
}) => {
    const { confirm } = Modal;
    const _onRemoveClick = (e, removedIndex) => {
        e?.preventDefault();
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
        <div className="col-lg-9">
            <table className="table table-cart table-mobile">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {products?.length > 0 ? (
                        products.map((product, index) => {
                            const { id, slug, images, name, price, quantity, totalProduct, variant } = product || {};
                            const detailPath = PATHS.PRODUCTS + `${slug}`
                            let imagePath = images?.[0];
                            if (imagePath?.split("https")?.length > 2) {
                                imagePath = imagePath?.split("https");
                                imagePath = "https" + imagePath[2];
                            }
                            return (
                                <tr key={id + index}>
                                    <td className="product-col">
                                        <div className="product">
                                            <figure className="product-media">
                                                <Link to={detailPath}>
                                                    <img src={imagePath} alt={name} />
                                                </Link>
                                            </figure>
                                            <ProductTitle className="product-title">
                                                <Link to={detailPath}>{name}</Link>
                                                <div className="product-variant">
                                                    Color:{""}
                                                    <ProductColor colors={[variant]} />
                                                </div>
                                            </ProductTitle>
                                        </div>
                                    </td>
                                    <td className="price-col">${formatCurrency(price)}</td>
                                    <td className="quantity-col">
                                        <div className="cart-product-quantity">
                                            <QuantityInput
                                                ref={(thisRef) =>
                                                    (quantityRef.current[index] = thisRef)}
                                                max={100}
                                                defaultValue={quantity}
                                                onChange={(value) => handleUpdateQuantity(value, index)}
                                            />
                                        </div>
                                    </td>
                                    <td className="total-col">${formatCurrency(totalProduct)}</td>
                                    <td className="remove-col">
                                        <button className="btn-remove" onClick={(e) => _onRemoveClick(e, index)}>
                                            <i className="icon-close" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <Empty
                            description="There is no any product in cart!"
                            style={{ margin: "10px" }}
                        />
                    )}

                </tbody>
            </table>
            {/* <div className="cart-bottom">
                <div className="cart-discount">
                    <form action="#">
                        <div className="input-group">
                            <input type="text" className="form-control input-error" required placeholder="Coupon code" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary-2" type="submit">
                                    <i className="icon-long-arrow-right" />
                                </button>
                            </div>
                        </div>
                        <p className="form-error">Please fill in this field</p>
                    </form>
                </div>
                <a href="#" className="btn btn-outline-dark-2">
                    <span>UPDATE CART</span>
                    <i className="icon-refresh" />
                </a>
            </div> */}
        </div>
    )
}

export default CartTable