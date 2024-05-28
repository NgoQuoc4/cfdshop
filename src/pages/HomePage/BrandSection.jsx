import React, { useEffect } from 'react'
import owlCarousels from '../../utils/owlCarousels';

const BrandSection = ({ brands }) => {
    useEffect(() => {
        owlCarousels();
    }, [brands]);
    return (
        <div className="container">
            {brands?.length > 0 && (
                <div className="owl-carousel mt-5 mb-5 owl-simple" data-toggle="owl" data-owl-options="{
                                                  &quot;nav&quot;: false, 
                                                  &quot;dots&quot;: false,
                                                  &quot;margin&quot;: 30,
                                                  &quot;loop&quot;: false,
                                                  &quot;responsive&quot;: {
                                                      &quot;0&quot;: {
                                                          &quot;items&quot;:2
                                                      },
                                                      &quot;420&quot;: {
                                                          &quot;items&quot;:3
                                                      },
                                                      &quot;600&quot;: {
                                                          &quot;items&quot;:4
                                                      },
                                                      &quot;900&quot;: {
                                                          &quot;items&quot;:5
                                                      },
                                                      &quot;1024&quot;: {
                                                          &quot;items&quot;:6
                                                      }
                                                  }
                                              }">
                    {brands.map((brand, index) => {
                        return (
                            <div key={index} className="brand">
                                <img src={brand} alt="Brand Name" />
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default BrandSection