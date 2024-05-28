import queryString from 'query-string';
import React, { useEffect, useMemo, useRef } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import useMutation from '../../hooks/useMutation';
import { productService } from '../../services/productService';
import { SORT_OPTIONS } from '../../constants/general';
import useQuery from '../../hooks/useQuery';

const PRODUCT_LIMITS = 9;

const useProductPage = () => {
    // query string set url
    const { search } = useLocation();
    const queryObject = queryString.parse(search);
    const [_, setSearchParams] = useSearchParams();

    // get data product
    const { data: productData,
        loading: productLoading,
        error: productError,
        execute: fetchProducts
    } = useMutation((query) =>
        productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`));

    const products = productData?.products || [];
    const productsPagi = productData?.pagination || {};

    useEffect(() => {
        fetchProducts(search);
    }, [search])

    // categories
    const {
        data: categoriesData,
        loading: categoriesLoading,
        error: categoriesError,
    } = useQuery(productService.getCategories);
    const categories = categoriesData?.products || [];

    // product list props
    const productListProps = {
        isLoading: productLoading,
        isError: !!productError,
        products
    }

    // update query string /// pagination
    const updateQueryString = (queryObject) => {
        const newQueryString = queryString.stringify({
            ...queryObject,
            limit: PRODUCT_LIMITS,
        });
        setSearchParams(new URLSearchParams(newQueryString))
    }
    // change pagination
    const onPagiChange = (page) => {
        updateQueryString({ ...queryObject, page: page });
    }
    // pagination props
    const pagiProps = {
        page: Number(productsPagi.page || queryObject.page || 1),
        limit: Number(productsPagi.limit || 0),
        total: Number(productsPagi.total || 0),
        onPagiChange
    }

    // toolbox props
    const activeSort = useMemo(() => {
        return (
            Object.values(SORT_OPTIONS).find(
                (options) =>
                    options.queryObject.orderBy === queryObject.orderBy &&
                    options.queryObject.order === queryObject.order
            )?.value || SORT_OPTIONS.popularity.value
        )
    }, [queryObject])


    const onSortChange = (sortType) => {
        const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
        if (sortQueryObject) {
            updateQueryString({
                ...queryObject,
                ...sortQueryObject,
                page: 1,
            });
        }
    };

    const toolboxProps = {
        showNumb: products?.length || 0,
        totalNumb: productsPagi.total || 0,
        activeSort,
        onSortChange
    };


    // filter categories
    const onCateFilterChange = (cateId, isChecked) => {
        let newCategoryQuery = Array.isArray(queryObject.category)
            ? [...queryObject.category, cateId]
            : [queryObject.category, cateId];

        if (!isChecked) {
            newCategoryQuery = newCategoryQuery.filter(
                (category) => category !== cateId);
        }

        if (!cateId) {
            newCategoryQuery = [];
        }

        updateQueryString({
            ...queryObject,
            category: newCategoryQuery,
            page: 1,
        });
    };
    //filter price
    const priceFilterTimeout = useRef();
    const handlePriceFilterChange = (priceRange) => {
        if (priceRange?.length === 2) {
            if (priceFilterTimeout.current) {
                clearTimeout(priceFilterTimeout.current);
            }
            priceFilterTimeout.current = setTimeout(() => {
                updateQueryString({
                    ...queryObject,
                    minPrice: priceRange[0].substring(1),
                    maxPrice: priceRange[1].substring(1),
                    page: 1,
                });
            }, 500);
        }
    };

    // filter props
    const filterProps = {
        categories: categories || [],
        isLoading: categoriesLoading,
        isError: categoriesError,
        activeCategory: Array.isArray(queryObject.category)
            ? queryObject.category
            : [queryObject.category],
        currentPriceRange: [
            queryObject.minPrice || 0,
            queryObject.maxPrice || 1000,
        ],
        onCateFilterChange,
        handlePriceFilterChange
    };

    return {
        toolboxProps,
        productListProps,
        pagiProps,
        filterProps,
    }
}

export default useProductPage