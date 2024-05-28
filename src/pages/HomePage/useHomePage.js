import React, { useState } from 'react'
import useQuery from '../../hooks/useQuery'
import { productService } from '../../services/productService'
import { pageService } from '../../services/pageService';
import useMutation from '../../hooks/useMutation';
import { subscribeService } from '../../services/subscribeService';
import { message } from 'antd';
import { GENERAL_MESSAGE, HOME_MESSAGE } from '../../constants/message';

const useHomePage = () => {
    // get data products
    const { data: productsData } = useQuery(productService.getProducts);
    const products = productsData?.products || [];
    const featuredProducts = products?.filter((product) => product.featured) || [];

    // get product 3 items 
    const introProducts = featuredProducts.slice(0, 3);
    const introProps = {
        introProducts,
    };
    // 
    const onSaleProducts = products?.filter((product) => product.onSale) || [];
    const topRatedProducts = products?.filter((product) => product.topRated) || [];
    const hotProducts = {
        featuredProducts,
        onSaleProducts,
        topRatedProducts
    }
    // 
    const dealProduct = products?.filter((product) => product.discount > 0) || [];
    const dealProps = {
        dealProduct
    }
    // brand
    const { data: homeData } = useQuery(() => pageService.getPageDataByName("home"));
    const brands = homeData?.data?.brands || [];
    const brandProps = {
        brands
    }

    // get data categories
    const { data: categoriesData } = useQuery(productService.getCategories);
    const categories = categoriesData?.products || [];

    // featured
    const [selectedCateSlug, setSelectedCateSlug] = useState("all");
    const featuredProduct = selectedCateSlug === "all"
        ? [...(products || [])]
        : products?.filter((product) => product?.category?.slug === selectedCateSlug)

    const featuredProps = {
        categories: [{ name: "All", slug: "all" }, ...categories],
        featuredProduct,
        selectedCateSlug,
        handleSelectCate: (slug) => setSelectedCateSlug(slug),
    };

    // service 
    const services = homeData?.data?.information || {};
    const servicesProps = {
        services,
    }
    // get deal 
    const { execute: dealExecution } = useMutation(subscribeService.subscribeDeal);

    const handleSubscribeDeal = (email, callback) => {
        if (email) {
            dealExecution(email, {
                onSuccess: (data) => {
                    message.success(HOME_MESSAGE.dealSuccess);
                    callback?.();
                },
                onFail: (error) => {
                    message.error(GENERAL_MESSAGE.error);
                }
            });
        }
    }
    const getDealProps = {
        handleSubscribeDeal,
    }
    return {
        introProps,
        hotProducts,
        dealProps,
        brandProps,
        featuredProps,
        servicesProps,
        getDealProps
    }
}

export default useHomePage