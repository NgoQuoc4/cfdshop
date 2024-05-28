import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleRemoveFromCart } from '../../store/reducers/cartReducer';
import { useMainContext } from '../../context/MainContext'

const useHeaderMiddle = () => {
    const { isShowNavbar, handleShowMobileMenu } = useMainContext();
    useEffect(() => {
        // Header Search Toggle
        var $searchWrapper = $('.header-search-wrapper'),
            $body = $('body'),
            $searchToggle = $('.search-toggle');

        $searchToggle.on('click', function (e) {
            $searchWrapper.toggleClass('show');
            $(this).toggleClass('active');
            $searchWrapper.find('input').focus();
            e.preventDefault();
        });

        $body.on('click', function (e) {
            if ($searchWrapper.hasClass('show')) {
                $searchWrapper.removeClass('show');
                $searchToggle.removeClass('active');
                $body.removeClass('is-search-active');
            }
        });

        $('.header-search').on('click', function (e) {
            e.stopPropagation();
        });
        // Sticky header 
        var catDropdown = $('.category-dropdown'),
            catInitVal = catDropdown.data('visible');

        if ($('.sticky-header').length && $(window).width() >= 992) {
            var sticky = new Waypoint.Sticky({
                element: $('.sticky-header')[0],
                stuckClass: 'fixed',
                offset: -300,
                handler: function (direction) {
                    // Show category dropdown
                    if (catInitVal && direction == 'up') {
                        catDropdown.addClass('show').find('.dropdown-menu').addClass('show');
                        catDropdown.find('.dropdown-toggle').attr('aria-expanded', 'true');
                        return false;
                    }

                    // Hide category dropdown on fixed header
                    if (catDropdown.hasClass('show')) {
                        catDropdown.removeClass('show').find('.dropdown-menu').removeClass('show');
                        catDropdown.find('.dropdown-toggle').attr('aria-expanded', 'false');
                    }
                }
            });
        }
    }, []);
    const dispatch = useDispatch();
    const { cartInfo, cartLoading } = useSelector((state) => state.cart);
    const { product, quantity, total, totalProduct, shipping, variant } = cartInfo || {};
    const handleRemoveProduct = (removedIndex) => {
        if (cartLoading || removedIndex < 0) return;
        dispatch(handleRemoveFromCart({ removedIndex }));
    }
    const cartDropDownProps = {
        products:
            product?.map((item, index) => {
                return {
                    ...item,
                    quantity: quantity?.[index],
                    totalProduct: totalProduct?.[index],
                    variant: variant?.[index],
                };
            }) || [],
        total,
        shipping,
        handleRemoveProduct,
    };
    return { isShowNavbar, handleShowMobileMenu, cartDropDownProps }
}

export default useHeaderMiddle