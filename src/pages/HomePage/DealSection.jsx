import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';
import CountDown from '../../components/CountDown';
import ProductCard from '../../components/ProductCard/ProductCard';

const DealSection = ({ dealProduct }) => {
    const targetTime = moment()
        .add(1, "day")
        .set({ hour: 17, minute: 0, second: 0, millisecond: 0 });
    const dealOfTheDayProduct = dealProduct?.[0] || {};
    return (
        <div className="bg-light deal-container pt-7 pb-7 mb-5">
            <div className="container">
                <div className="heading text-center mb-4">
                    <h2 className="title">Deals &amp; Outlet</h2>
                    <p className="title-desc">Today’s deal and more</p>
                </div>
                <div className="row">
                    <div className="col-lg-6 deal-col">
                        <div className="deal" style={{ backgroundImage: 'url("assets/images/demos/demo-3/deal/bg-1.jpg")' }}>
                            <div className="deal-top">
                                <h2>Deal of the Day.</h2>
                                <h4>Limited quantities. </h4>
                            </div>
                            <div className="deal-content">
                                <h3 className="product-title">
                                    <Link to={PATHS.PRODUCTS + `/${dealOfTheDayProduct.slug}`}>
                                        {dealOfTheDayProduct.name}
                                    </Link>
                                </h3>
                                <div className="product-price">
                                    <span className="new-price">${dealOfTheDayProduct.price - dealOfTheDayProduct.discount}</span>
                                    <span className="old-price">Was ${dealOfTheDayProduct.price}</span>
                                </div>
                                <Link to={PATHS.PRODUCTS + `/${dealOfTheDayProduct.slug}`} className="btn btn-link">
                                    <span>Shop Now</span>
                                    <i className="icon-long-arrow-right" />
                                </Link>
                            </div>
                            <div className="deal-bottom">
                                <CountDown targetTime={targetTime} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="products">
                            <div className="row">
                                <div className="col-6">
                                    {dealProduct?.[1] && (
                                        <ProductCard product={dealProduct[1]} />
                                    )}
                                </div>
                                <div className="col-6">
                                    {dealProduct?.[2] && (
                                        <ProductCard product={dealProduct[2]} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="more-container text-center mt-3 mb-0">
                    <Link to={PATHS.PRODUCTS} className="btn btn-outline-dark-2 btn-round btn-more">
                        <span>Shop more</span>
                        <i className="icon-long-arrow-right" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DealSection