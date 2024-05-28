import React, { useEffect } from 'react'
import owlCarousels from '../../utils/owlCarousels';
import cn from '../../utils/cn';
import ProductCard from '../../components/ProductCard/ProductCard';

const FeaturedProductsSection = ({ categories, featuredProduct, selectedCateSlug, handleSelectCate }) => {
    useEffect(() => {
        owlCarousels();
    }, [selectedCateSlug]);

    const _onSelectCate = (e, slug) => {
        e.preventDefault();
        e.stopPropagation();
        handleSelectCate?.("")
        setTimeout(() => {
            handleSelectCate?.(slug);
        }, 200)
    }

    return (
        <div className="container top">
            <div className="heading heading-flex mb-3">
                <div className="heading-left">
                    <h2 className="title">Featured Products</h2>
                </div>
                <div className="heading-right">
                    <ul className="nav nav-pills nav-border-anim justify-content-center" role="tablist">
                        {categories?.map((category, index) => {
                            const { name, slug } = category || {};
                            return (
                                <li key={index} className="nav-item">
                                    <a className={cn("nav-link", { active: selectedCateSlug === slug })}
                                        href="#top-tv-tab"
                                        onClick={(e) => _onSelectCate(e, slug)}
                                    >{name}</a>
                                </li>
                            )
                        }
                        )}
                    </ul>
                </div>
            </div>
            <div className="tab-content tab-content-carousel just-action-icons-sm">
                <div className={cn("tab-pane p-0 fade", { "show active": featuredProduct?.length > 0 })}
                    id="top-all-tab" role="tabpanel" aria-labelledby="top-all-link">
                    {featuredProduct?.length > 0 && (
                        <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl" data-owl-options="{
                                                      &quot;nav&quot;: true, 
                                                      &quot;dots&quot;: false,
                                                      &quot;margin&quot;: 20,
                                                      &quot;loop&quot;: false,
                                                      &quot;responsive&quot;: {
                                                          &quot;0&quot;: {
                                                              &quot;items&quot;:2
                                                          },
                                                          &quot;480&quot;: {
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
                            {featuredProduct?.map((product) => {
                                return <ProductCard key={product.id} product={product} />
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}
export default FeaturedProductsSection