import React from 'react'
import { useParams } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import { blogService } from '../../services/blogService';
import useMutation from '../../hooks/useMutation';
import useBlogPage from '../BlogPage/useBlogPage';

const useBlogSinglePage = () => {
    const { slug } = useParams();

    const {
        data: blogData,
    } = useQuery(() => blogService.getBlogBySlug(slug), [slug]);

    // category
    const { category } = blogData || {};
    const {
        data: categoriesData,
        loading: categoriesLoading,
        error: categoriesError,
    } = useQuery(blogService.getBlogCategories);
    const categories = categoriesData?.blogs || [];

    const cate = categories.filter((catego) => catego.id === category?.id)
    // const slugBlog = cate.map((item) => (item?.slug))

    // const { blogsListProps } = useBlogPage();
    // const { blogs } = blogsListProps || []

    // const blogsCategory = blogs.filter((item) => item?.category?.slug === slugBlog)

    const blogProps = {
        ...blogData
    }

    return {
        blogProps
    }
}

export default useBlogSinglePage