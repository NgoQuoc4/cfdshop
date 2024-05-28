import React, { useEffect } from 'react'
import { Empty } from 'antd';
import cn from '../../utils/cn';

const ProductImagesZoom = ({ images }) => {

    useEffect(() => {
        if ($.fn.elevateZoom && images?.length > 0) {
            $('#product-zoom').elevateZoom({
                gallery: 'product-zoom-gallery',
                galleryActiveClass: 'active',
                zoomType: "inner",
                cursor: "crosshair",
                zoomWindowFadeIn: 400,
                zoomWindowFadeOut: 400,
                responsive: true
            });

            // On click change thumbs active item
            $('.product-gallery-item').on('click', function (e) {
                $('#product-zoom-gallery').find('a').removeClass('active');
                $(this).addClass('active');

                e.preventDefault();
            });

            var ez = $('#product-zoom').data('elevateZoom');

            // Open popup - product images
            $('#btn-product-gallery').on('click', function (e) {
                if ($.fn.magnificPopup) {
                    $.magnificPopup.open({
                        items: ez.getGalleryList(),
                        type: 'image',
                        gallery: {
                            enabled: true
                        },
                        fixedContentPos: false,
                        removalDelay: 600,
                        closeBtnInside: false
                    }, 0);

                    e.preventDefault();
                }
            });
        }
        // remove zoom
        return () => {
            $(".zoomContainer").remove();
        };

    }, [images])

    return (
        <div className="product-gallery product-gallery-vertical">
            <div className="row">
                <figure className="product-main-image">
                    {images?.length ? (
                        <img
                            id="product-zoom"
                            src={images[0]}
                            data-zoom-image={images[0]}
                            alt="product image" />
                    ) : (
                        <Empty />
                    )}
                    <div id="btn-product-gallery" className="btn-product-gallery">
                        <i className="icon-arrows" />
                    </div>
                </figure>
                <div id="product-zoom-gallery" className="product-image-gallery">
                    {!!images?.length && images?.map((image, index) => {
                        return (
                            <a key={index}
                                className={cn("product-gallery-item", { active: index === 0 })}
                                href='#'
                                data-image={image}
                                data-zoom-image={image}
                            >
                                <img src={image} alt="Dark yellow lace" />
                            </a>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default ProductImagesZoom