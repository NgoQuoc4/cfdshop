import React from 'react'
import { Link } from 'react-router-dom'
import PATHS from '../../constants/paths'
import useQuery from '../../hooks/useQuery'
import { orderServices } from '../../services/orderService'
import { formatCurrency } from '../../utils/format'

const ListOrder = () => {
    const { data: orderData } = useQuery(orderServices.getOrders)
    const orders = orderData?.orders || {}
    console.log("orders", orders)
    return (
        <div className="tab-pane fade show active" id="tab-orders" role="tabpanel" aria-labelledby="tab-orders-link">
            <p>No order has been made yet.</p>
            <Link to={PATHS.PRODUCTS} className="btn btn-outline-primary-2">
                <span>GO SHOP</span>
                <i className="icon-long-arrow-right" />
            </Link>
            <br />
            <br />
            <table className="table table-cart table-mobile">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.length > 0 &&
                        orders?.map((order) => {
                            const { id, product, quantity, total, subTotal } = order || {}
                            console.log("product", product)
                            return (
                                <tr key={id}>
                                    <td className="product-col">
                                        {product?.map((item) => {
                                            const { id, slug, images, name } = item || {}
                                            const productPath = PATHS.PRODUCTS + `/${slug}`;

                                            return (
                                                <div key={id} className="product">
                                                    <figure className="product-media">
                                                        <Link to={productPath}>
                                                            <img src={images[0] || images || ""} alt="Product image" />
                                                        </Link>
                                                    </figure>
                                                    <h3 className="product-title">
                                                        <Link to={productPath}>{name || ""}</Link>
                                                    </h3>
                                                </div>
                                            )
                                        })}

                                    </td>
                                    <td className="price-col text-center">${formatCurrency(subTotal || "")}</td>
                                    <td className="quantity-col text-center">{quantity || ""}</td>
                                    <td className="total-col text-center">${formatCurrency(total || "")}</td>
                                </tr>
                            )
                        })}

                </tbody>
            </table>
        </div>
    )
}

export default ListOrder