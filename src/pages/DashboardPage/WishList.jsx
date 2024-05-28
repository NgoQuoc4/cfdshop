import React from 'react'
import useMutation from '../../hooks/useMutation'
import { authService } from '../../services/authService'
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/format';
import PATHS from '../../constants/paths';
import { Link } from 'react-router-dom';
import { handleAddCart } from '../../store/reducers/cartReducer';
import { handleDeleteWishList } from '../../store/reducers/authReducer';

const WishList = () => {
    const dispatch = useDispatch();

    const _onAddToCar = (e, id, price, discount, color) => {
        e?.preventDefault();
        const addPayload = {
            addedId: id,
            addedColor: color?.[0] || "",
            addedQuantity: 1,
            addedPrice: price - discount,
        }
        dispatch(handleAddCart(addPayload));
    }
    const { profile } = useSelector((state) => state.auth);
    const { whiteList } = profile || {};

    const _onDeleteWishList = (e, id) => {
        e?.preventDefault();
        const addPayload = {
            product: id,
        }

        dispatch(handleDeleteWishList(addPayload));
    }
    return (
        <div className="tab-pane fade show active" id="tab-wishlist" role="tabpanel" aria-labelledby="tab-wishlist-link">
            <table className="table table-wishlist table-mobile">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Stock Status</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {whiteList?.map((product) => {
                        const { id, images, name, price, stock, slug, discount, color } = product || {};
                        const image = images[0]
                        const productPath = PATHS.PRODUCTS + `/${slug}`;
                        return (
                            <tr key={id}>
                                <td className="product-col">
                                    <div className="product">
                                        <figure className="product-media">
                                            <Link to={productPath}>
                                                <img src={`https://cfdshop.hn.ss.bfcplatform.vn/images/product/` + image} alt="Product image" />
                                            </Link>
                                        </figure>
                                        <h3 className="product-title">
                                            <Link to={productPath}>{name || ""}</Link>
                                        </h3>
                                    </div>
                                </td>
                                <td className="price-col text-center">${formatCurrency(price || "")}</td>
                                <td className="stock-col text-center">
                                    <span className="in-stock">{stock > 0 ? "In Stock" : "Out Stock"}</span>
                                </td>
                                <td className="action-col">
                                    <button className="btn btn-block btn-outline-primary-2" onClick={(e) => _onAddToCar(e, id, price, discount, color)}>
                                        <i className="icon-cart-plus" />Add to Cart </button>
                                </td>
                                <td className="remove-col">
                                    <button className="btn-remove" onClick={(e) => _onDeleteWishList(e, id)} >
                                        <i className="icon-close" />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default WishList