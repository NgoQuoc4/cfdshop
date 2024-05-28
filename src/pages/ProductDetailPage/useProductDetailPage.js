import React, { useRef } from 'react'
import { useParams } from "react-router-dom";
import useQuery from '../../hooks/useQuery';
import { productService } from '../../services/productService';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { handleAddCart } from '../../store/reducers/cartReducer';
import { handleAddWishList } from '../../store/reducers/authReducer';

const useProductDetailPage = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const colorRef = useRef();
    const quantityRef = useRef();
    // fetch api
    // get data product details
    const {
        data: productDetailData,
    } = useQuery(() => productService.getProductDetail(slug), [slug]);
    // get id, name , description, shipping, price, discount
    const { id, name, description, shippingReturn, price, discount } = productDetailData || {};
    // get data review
    const {
        data: productDetailReviews,
    } = useQuery(() => id && productService.getProductReviews(id), [id]);

    // handel add to cart 
    const handleAddToCart = async () => {
        const { value: color, reset: colorReset } = colorRef.current || {};
        const { value: quantity, reset: quantityReset } = quantityRef.current || {};

        if (!color) {
            message.error("Plese select color!")
            return;
        } else if (isNaN(quantity) && quantity < 1) {
            message.error("Quantity must be greater than 1")
            return;
        }
        // add cart 
        const addPayload = {
            addedId: id,
            addedColor: color,
            addedQuantity: quantity,
            addedPrice: price - discount,
        }
        try {
            const res = dispatch(handleAddCart(addPayload)).unwrap();
            if (res) {
                colorReset?.();
                quantityReset?.();
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleAddToWishList = () => {
        // add cart 
        const addPayload = {
            product: id,
        }
        try {
            const res = dispatch(handleAddWishList(addPayload)).unwrap();
        } catch (error) {
            console.log("error", error);
        }
    }

    const productDetailTopProps = {
        ...productDetailData,
        reviews: productDetailReviews,
        colorRef,
        quantityRef,
        handleAddToCart,
        handleAddToWishList
    }
    const productDetailTabProps = {
        description,
        shippingReturn,
        reviews: productDetailReviews
    }

    return {
        productName: name,
        productDetailTopProps,
        productDetailTabProps
    }
}

export default useProductDetailPage