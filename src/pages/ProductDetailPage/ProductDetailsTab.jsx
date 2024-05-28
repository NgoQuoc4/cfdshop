import React, { useEffect, useState } from 'react'
import cn from '../../utils/cn'
import { formatDateNow } from '../../utils/format';

const TABS = {
    descriptions: "Description",
    shipping: "Shipping &amp; Returns",
    review: "Reviews",
};

const ProductDetailsTab = ({ reviews, description, shippingReturn }) => {
    const [selectedTab, setSelectedTab] = useState(TABS.descriptions);
    const _onTabChange = (e, tab) => {
        e.preventDefault();
        e?.stopPropagation();
        setSelectedTab("");
        setTimeout(() => {
            setSelectedTab(tab);
        }, 200);
    };

    return (
        <div className="product-details-tab">
            <ul className="nav nav-pills justify-content-center" role="tablist">
                <li className="nav-item">
                    <a href="#"
                        onClick={(e) => _onTabChange(e, TABS.descriptions)}
                        className={cn("nav-link", { active: selectedTab === TABS.descriptions })}
                    >Description</a>
                </li>
                <li className="nav-item">
                    <a href="#"
                        onClick={(e) => _onTabChange(e, TABS.shipping)}
                        className={cn("nav-link", { active: selectedTab === TABS.shipping })}
                    >Shipping &amp; Returns</a>
                </li>
                <li className="nav-item">
                    <a href="#"
                        onClick={(e) => _onTabChange(e, TABS.review)}
                        className={cn("nav-link", { active: selectedTab === TABS.review })}
                    >Reviews ({reviews?.length || ""})</a>
                </li>
            </ul>
            <div className="tab-content">
                {selectedTab === TABS.descriptions && (
                    <div className="tab-pane p-0 fade show active">
                        <div className="product-desc-content" dangerouslySetInnerHTML={{ __html: description }}>
                        </div>
                    </div>
                )}
                {selectedTab === TABS.shipping && (
                    <div className="tab-pane p-0 fade show active">
                        <div className="product-desc-content" dangerouslySetInnerHTML={{ __html: shippingReturn }}>
                        </div>
                    </div>
                )}
                {selectedTab === TABS.review && (
                    <div className="tab-pane p-0 fade show active">
                        <div className="reviews">
                            <h3>Reviews ({reviews?.length || ""})</h3>
                            {reviews?.length > 0 && reviews?.map((review, index) => {
                                const { id, order, title, description, rate, createdAt } = review || {};
                                return (
                                    <div key={id || index} className="review">
                                        <div className="row no-gutters">
                                            <div className="col-auto">
                                                <h4>
                                                    <a href="#">#{order.slice(-4)}</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{ width: `${(rate || 0) * 20}%  ` }} />
                                                    </div>
                                                </div>
                                                <span className="review-date">{formatDateNow(createdAt)}</span>
                                            </div>
                                            <div className="col">
                                                <h4>{title || ""}</h4>
                                                <div className="review-content">
                                                    <p dangerouslySetInnerHTML={{ __html: description }}></p>
                                                </div>
                                                <div className="review-action">
                                                    <a href="#">
                                                        <i className="icon-thumbs-up" />Helpful (2) </a>
                                                    <a href="#">
                                                        <i className="icon-thumbs-down" />Unhelpful (0) </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetailsTab