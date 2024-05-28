import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PATHS from '../../constants/paths'
import { message } from 'antd';
import { formatCurrency } from '../../utils/format';
import RadioGroup from '../../components/RadioGroup';
import { SHIPPING_OPTIONS } from '../../constants/general';


const CartSummary = ({ subTotal, total, typeShip, handleUpdateShipping }) => {
    const navigate = useNavigate();
    const _onProccedCheckout = (e) => {
        e?.preventDefault();
        if (!typeShip) {
            message.error("Please select shipping method")
        } else {
            navigate(PATHS.CHECKOUT)
        }
    }

    return (
        <aside className="col-lg-3">
            <div className="summary summary-cart">
                <h3 className="summary-title">Cart Total</h3>
                <table className="table table-summary">
                    <tbody>
                        <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>${formatCurrency(subTotal) || 0}</td>
                        </tr>
                        <tr className="summary-shipping">
                            <td>Shipping:</td>
                            <td>&nbsp;</td>
                        </tr>
                        <RadioGroup
                            onChange={handleUpdateShipping}
                            defaultValue={typeShip || ""}
                        >
                            {SHIPPING_OPTIONS.map((option) => {
                                const { label, value, price } = option || {};
                                return (
                                    <tr key={option.value}
                                        className="summary-shipping-row"
                                    >
                                        <td>
                                            <RadioGroup.Item value={value}>
                                                {label}
                                            </RadioGroup.Item>
                                        </td>
                                        <td>${formatCurrency(price)}</td>
                                    </tr>
                                );
                            })}
                        </RadioGroup>

                        {/* <tr className="summary-shipping-row">
                            <td>
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="free-shipping" name="shipping" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="free-shipping">Free Shipping</label>
                                </div>
                            </td>
                            <td>$0.00</td>
                        </tr>
                        <tr className="summary-shipping-row">
                            <td>
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="standart-shipping" name="shipping" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="standart-shipping">Standart:</label>
                                </div>
                            </td>
                            <td>$10.00</td>
                        </tr>
                        <tr className="summary-shipping-row">
                            <td>
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="express-shipping" name="shipping" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="express-shipping">Express:</label>
                                </div>
                            </td>
                            <td>$20.00</td>
                        </tr> */}
                        <tr className="summary-shipping-estimate">
                            <td>Estimate for Your Country <br />
                                <Link to={PATHS.PROFILE.INDEX}>Change address</Link>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr className="summary-total">
                            <td>Total:</td>
                            <td>${formatCurrency(total) || 0}</td>
                        </tr>
                    </tbody>
                </table>
                <a onClick={_onProccedCheckout} href="#" className="btn btn-outline-primary-2 btn-order btn-block">PROCEED TO CHECKOUT</a>
            </div>
            <Link to={PATHS.PRODUCTS} className="btn btn-outline-dark-2 btn-block mb-3">
                <span>CONTINUE SHOPPING</span>
                <i className="icon-refresh" />
            </Link>
        </aside >
    )
}

export default CartSummary