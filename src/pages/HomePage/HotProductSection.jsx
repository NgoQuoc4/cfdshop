import React, { useEffect, useState } from 'react'
import owlCarousels from '../../utils/owlCarousels'
import cn from '../../utils/cn';
import ProductCard from '../../components/ProductCard/ProductCard';

// tabs
const TABS = {
    featured: "Featured",
    on_sale: "On_sale",
    top_rated: "Top_rated",
}
const HotProductSection = ({ featuredProducts, onSaleProducts, topRatedProducts }) => {
    const [selectedTab, setSelectedTabs] = useState(TABS.featured);

    useEffect(() => {
        owlCarousels();
    }, [selectedTab, featuredProducts, onSaleProducts, topRatedProducts])

    // change tab
    const _onChangeTabs = (e, tab) => {
        e.preventDefault();
        setSelectedTabs("")
        setTimeout(() => {
            setSelectedTabs(tab)
        }, 200)
    };
    // get products tab
    const _getSelectedProducts = (tab) => {
        switch (tab) {
            case TABS.featured:
                return featuredProducts
            case TABS.on_sale:
                return onSaleProducts
            case TABS.top_rated:
                return topRatedProducts
            default:
                return [];
        }
    }
    // render products tab
    const renderProducts = _getSelectedProducts(selectedTab);

    return (
        <div className="container featured">
            <ul className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3" role="tablist">
                <li className="nav-item">
                    <a className={cn("nav-link", { active: selectedTab === TABS.featured })}
                        onClick={(e) => _onChangeTabs(e, TABS.featured)}
                        id="products-featured-link" data-toggle="tab" href="#products-featured-tab" role="tab" aria-controls="products-featured-tab" aria-selected="true">Featured</a>
                </li>
                <li className="nav-item">
                    <a className={cn("nav-link", { active: selectedTab === TABS.on_sale })}
                        onClick={(e) => _onChangeTabs(e, TABS.on_sale)}
                        id="products-sale-link" data-toggle="tab" href="#products-sale-tab" role="tab" aria-controls="products-sale-tab" aria-selected="false">On Sale</a>
                </li>
                <li className="nav-item">
                    <a className={cn("nav-link", { active: selectedTab === TABS.top_rated })}
                        onClick={(e) => _onChangeTabs(e, TABS.top_rated)}
                        id="products-top-link" data-toggle="tab" href="#products-top-tab" role="tab" aria-controls="products-top-tab" aria-selected="false">Top Rated</a>
                </li>
            </ul>
            <div className="tab-content tab-content-carousel">
                <div className={cn("tab-pane p-0 fade", { " show active": renderProducts?.length > 0 })} id="products-featured-tab" role="tabpanel" aria-labelledby="products-featured-link">
                    {renderProducts?.length > 0 && (
                        <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl" data-owl-options="{
                                                      &quot;nav&quot;: true, 
                                                      &quot;dots&quot;: true,
                                                      &quot;margin&quot;: 20,
                                                      &quot;loop&quot;: false,
                                                      &quot;responsive&quot;: {
                                                          &quot;0&quot;: {
                                                              &quot;items&quot;:2
                                                          },
                                                          &quot;600&quot;: {
                                                              &quot;items&quot;:2
                                                          },
                                                          &quot;992&quot;: {
                                                              &quot;items&quot;:3
                                                          },
                                                          &quot;1200&quot;: {
                                                              &quot;items&quot;:4
                                                          }
                                                      }
                                                  }">
                            {renderProducts.map((product) => {
                                return <ProductCard key={product.id} product={product} />
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default HotProductSection 