import React, { useEffect } from 'react'
import owlCarousels from '../../utils/owlCarousels';
import PATHS from '../../constants/paths';
import { Link } from 'react-router-dom';

const IntroSection = ({ introProducts }) => {
    useEffect(() => {
        owlCarousels();
    }, [])
    return (
        <div className="intro-section pt-3 pb-3 mb-2">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="intro-slider-container slider-container-ratio mb-2 mb-lg-0">
                            <div className="intro-slider owl-carousel owl-simple owl-dark owl-nav-inside" data-toggle="owl" data-owl-options="{
                                                              &quot;nav&quot;: false, 
                                                              &quot;dots&quot;: true,
                                                              &quot;responsive&quot;: {
                                                                  &quot;768&quot;: {
                                                                      &quot;nav&quot;: true,
                                                                      &quot;dots&quot;: false
                                                                  }
                                                              }
                                                          }">
                                <div className="intro-slide">
                                    <figure className="slide-image">
                                        <img src="assets/images/demos/demo-3/slider/slide-1.jpg" alt="Image Desc" />
                                    </figure>
                                    <div className="intro-content">
                                        <h3 className="intro-subtitle text-primary">Daily Deals</h3>
                                        <h1 className="intro-title"> AirPods <br />Earphones </h1>
                                        <div className="intro-price">
                                            <sup>Today:</sup>
                                            <span className="text-primary"> $247 <sup>.99</sup>
                                            </span>
                                        </div>
                                        <a href="product-detail.html" className="btn btn-primary btn-round">
                                            <span>Click Here</span>
                                            <i className="icon-long-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                                <div className="intro-slide">
                                    <figure className="slide-image">
                                        <img src="assets/images/demos/demo-3/slider/slide-2.jpg" alt="Image Desc" />
                                    </figure>
                                    <div className="intro-content">
                                        <h3 className="intro-subtitle text-primary">Deals and Promotions</h3>
                                        <h1 className="intro-title"> Echo Dot <br />3rd Gen </h1>
                                        <div className="intro-price">
                                            <sup className="intro-old-price">$49,99</sup>
                                            <span className="text-primary"> $29 <sup>.99</sup>
                                            </span>
                                        </div>
                                        <a href="product-detail.html" className="btn btn-primary btn-round">
                                            <span>Click Here</span>
                                            <i className="icon-long-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <span className="slider-loader" />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="intro-banners">
                            {introProducts?.map((product) => {
                                const { id, name, images, slug } = product || {};
                                const productPaths = PATHS.PRODUCTS + `/${slug}`;
                                return (
                                    <div key={id} className="banner mb-lg-1 mb-xl-2">
                                        <Link to={productPaths}>
                                            <img src={images[0] || ""} alt="Banner"
                                                style={{
                                                    height: 119,
                                                    objectFit: "contain",
                                                    objectPosition: "center right",
                                                }} />
                                        </Link>
                                        <div className="banner-content">
                                            <h3 className="banner-title">
                                                <Link to={productPaths}>{name || ""}</Link>
                                            </h3>
                                            <Link to={productPaths} className="banner-link">Shop Now <i className="icon-long-arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroSection