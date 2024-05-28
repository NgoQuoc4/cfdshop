import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import useMutation from '../../hooks/useMutation';
import { blogService } from '../../services/blogService';
import useQuery from '../../hooks/useQuery';

const BLOGS_LIMITS = 8;
const useBlogPage = () => {
    // query string set url
    const { search } = useLocation();
    const queryObject = queryString.parse(search);
    console.log("queryObject", queryObject)
    const [_, setSearchParams] = useSearchParams();

    // get data blog
    const { data: blogData,
        loading: blogLoading,
        error: blogError,
        execute: fetchBlogs
    } = useMutation((query) =>
        blogService.getBlogs(query || `?limit=${BLOGS_LIMITS}`));
    // data 
    const blogs = blogData?.blogs || [];
    // get data pagination
    const blogsPagi = blogData?.pagination || {};
    const popularBlogs = blogs.filter((blog) => blog.isPopular === true);
    useEffect(() => {
        fetchBlogs(search);
    }, [search])

    //get data categories
    const {
        data: categoriesData,
        loading: categoriesLoading,
        error: categoriesError,
    } = useQuery(blogService.getBlogCategories);
    const categories = categoriesData?.blogs || [];

    // update query string /// pagination
    const updateQueryString = (queryObject) => {
        const newQueryString = queryString.stringify({
            ...queryObject,
            limit: BLOGS_LIMITS,
        });
        setSearchParams(new URLSearchParams(newQueryString))
    }
    // change pagination
    const onPagiChange = (page) => {
        updateQueryString({ ...queryObject, page: page });
    }
    // pagination props
    const pagiProps = {
        page: Number(blogsPagi.page || queryObject.page || 1),
        limit: Number(blogsPagi.limit || 0),
        total: Number(blogsPagi.total || 0),
        onPagiChange
    }

    // filter props
    const [selectedCateSlug, setSelectedCateSlug] = useState("all");

    const featuredBogs = selectedCateSlug === "all"
        ? [...(blogs || [])]
        : blogs?.filter((blog) => blog?.category?.slug === selectedCateSlug)


    // filter categories
    const handleSelectCate = (cateId) => {
        let newCategoryQuery = cateId
        if (!cateId) {
            newCategoryQuery = [];
        }
        updateQueryString({
            ...queryObject,
            category: newCategoryQuery,
            page: 1,
        });
    };
    // filter tags
    const handleSelectTags = (tagsId) => {
        let newCategoryQuery = tagsId
        if (!tagsId) {
            newCategoryQuery = [];
        }
        updateQueryString({
            ...queryObject,
            tags: newCategoryQuery,
            page: 1,
        });
    };
    //get data categories
    const {
        data: tagsData,
        loading: tagsLoading,
        error: tagsError,
    } = useQuery(blogService.getBlogTag);
    const tags = tagsData?.blogs || [];


    // product list props
    const blogsListProps = {
        isLoading: blogLoading,
        isError: !!blogError,
        blogs,
    }

    // filter props
    const filterProps = {
        categories: [{ name: "All", slug: "all" }, ...categories] || [],
        selectedCateSlug,
        featuredBogs,
        handleSelectCate,
        popularBlogs,
        tags,
        queryObject,
        handleSelectTags,
    };

    return {
        blogsListProps,
        pagiProps,
        filterProps,
    }
}

export default useBlogPage