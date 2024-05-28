import axiosInstance from "../utils/axiosInstance";

export const blogService = {
    getBlogs(query = "") {
        return axiosInstance.get(`/blogs${query}`);
    },
    getBlogBySlug(slug = "") {
        return axiosInstance.get(`/blogs/${slug}`);
    },

    getBlogCategories(query = "") {
        return axiosInstance.get(`/blog-categories${query}`);
    },
    getBlogCategoryBySlug(slug = "") {
        return axiosInstance.get(`/blog-categories/${slug}`);
    },

    getBlogTag(query = "") {
        return axiosInstance.get(`/blog-tags${query}`);
    },
    getBlogTagBySlug(slug = "") {
        return axiosInstance.get(`/blog-tags/${slug}`);
    },
};