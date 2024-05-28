import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-lg-5">
                                <div className="widget widget-about">
                                    <img src="assets/images/logo.svg" className="footer-logo" alt="Footer Logo" width={120} />
                                    <p>Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. </p>
                                    <div className="widget-call">
                                        <i className="icon-phone" /> Got Question? Call us 24/7 <a href="tel:#">098 9596 912</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-2 offset-lg-1">
                                <div className="widget">
                                    <h4 className="widget-title">Useful Links</h4>
                                    <ul className="widget-list">
                                        <li>
                                            <a href="about.html">About Us</a>
                                        </li>
                                        <li>
                                            <a href="product.html">Product</a>
                                        </li>
                                        <li>
                                            <a href="faq.html">FAQs</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Contact us</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-2">
                                <div className="widget">
                                    <h4 className="widget-title">Customer Service</h4>
                                    <ul className="widget-list">
                                        <li>
                                            <a href="payment-methods.html">Payment Methods</a>
                                        </li>
                                        <li>
                                            <a href="returns.html">Returns</a>
                                        </li>
                                        <li>
                                            <a href="shipping.html">Shipping</a>
                                        </li>
                                        <li>
                                            <a href="privacy-policy.html">Privacy Policy</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-2">
                                <div className="widget">
                                    <h4 className="widget-title">My Account</h4>
                                    <ul className="widget-list">
                                        <li>
                                            <a href="dashboard.html">Account Details</a>
                                        </li>
                                        <li>
                                            <a href="cart.html">View Cart</a>
                                        </li>
                                        <li>
                                            <a href="dashboard.html">My Wishlist</a>
                                        </li>
                                        <li>
                                            <a href="dashboard.html">Track My Order</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <p className="footer-copyright">Copyright © 2023 <a href="https://cfdcircle.vn/" target="_blank"><strong>CFD Circle</strong></a>. All Rights Reserved.</p>
                        <figure className="footer-payments">
                            <img src="assets/images/payments.png" alt="Payment methods" width={272} height={20} />
                        </figure>
                    </div>
                </div>
            </footer>


        </>
    )
}

export default Footer