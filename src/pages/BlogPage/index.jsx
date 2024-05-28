import React from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import PATHS from '../../constants/paths'
import BlogFilter from './BlogFilter'
import BlogCard from '../../components/BlogCard'
import Pagination from '../../components/Pagination'
import useBlogPage from './useBlogPage'
import BlogList from './BlogList'

const BlogPage = () => {
    const { blogsListProps, pagiProps, filterProps } = useBlogPage();

    return (
        <main className="main">
            <div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
                <div className="container">
                    <h1 className="page-title">Blog</h1>
                </div>
            </div>
            <BreadCrumb>
                <BreadCrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </BreadCrumb.Item>
                <BreadCrumb.Item isActive>Blog</BreadCrumb.Item>
            </BreadCrumb>
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <BlogList {...blogsListProps} />
                            <Pagination {...pagiProps} />
                        </div>
                        <BlogFilter {...filterProps} />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BlogPage