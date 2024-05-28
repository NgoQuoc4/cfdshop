import React from 'react'
import cn from '../../utils/cn';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import PATHS from '../../constants/paths';
import { formatDate } from '../../utils/format';
const BlogFilter = ({
    categories,
    selectedCateSlug,
    handleSelectCate,
    popularBlogs,
    tags,
    handleSelectTags,
}) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const _onSelectCate = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        if (slug) {
            navigate(PATHS.BLOG + `?category=${id || ""}&limit=8&page=1`);
        } else {
            handleSelectCate?.("")
            setTimeout(() => {
                handleSelectCate?.(id);
            }, 200)
        }
    }

    const _onSelectTag = (e, slug, id,) => {
        e.preventDefault();
        e.stopPropagation();
        handleSelectCate?.("")
        setTimeout(() => {
            handleSelectTags?.(id, slug);
        }, 200)
    }
    return (
        <aside className="col-lg-3">
            <div className="sidebar">
                <div className="widget widget-search">
                    <h3 className="widget-title">Search</h3>
                    <form action="#">
                        <label htmlFor="ws" className="sr-only">Search in blog</label>
                        <input type="search" className="form-control" name="ws" id="ws" placeholder="Search in blog" required />
                        <button type="submit" className="btn">
                            <i className="icon-search" />
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                </div>
                <div className="widget widget-cats">
                    <h3 className="widget-title">Categories</h3>
                    <ul>
                        {categories.map((category) => {
                            const { id, name, slug } = category || {};
                            return (

                                <li key={id} >
                                    <a href="#"
                                        onClick={(e) => _onSelectCate(e, id)} >{name || ""}
                                        <span>{3}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="widget">
                    <h3 className="widget-title">Popular Posts</h3>
                    <ul className="posts-list">
                        {popularBlogs.map((popular, index) => {
                            const { id, image, slug, updatedAt, name } = popular || {}
                            const blogPath = PATHS.BLOG + `/${slug}`;
                            if (index < 4)
                                return (
                                    <li key={id}>
                                        <figure>
                                            <Link to={blogPath}>
                                                <img src={image || ""} alt="post" />
                                            </Link>
                                        </figure>
                                        <div>
                                            <span>{formatDate(updatedAt || "")}</span>
                                            <h4>
                                                <Link to={blogPath}>{name || ""}</Link>
                                            </h4>
                                        </div>
                                    </li>
                                )
                        })}
                    </ul>
                </div>
                <div className="widget widget-banner-sidebar">
                    <div className="banner-sidebar-title">ad box 280 x 280</div>
                    <div className="banner-sidebar banner-overlay">
                        <Link to={PATHS.PRODUCTS}>
                            <img src="assets/images/blog/sidebar/banner.jpg" alt="banner" />
                        </Link>
                    </div>
                </div>
                <div className="widget">
                    <h3 className="widget-title">Browse Tags</h3>
                    <div className="tagcloud">
                        {tags.map((tag) => {
                            const { id, name, slug } = tag || {};
                            return (
                                <a
                                    key={id}
                                    href="#"
                                    onClick={(e) => _onSelectTag(e, slug, id)}
                                >{name}</a>
                            )
                        })}
                    </div>

                </div>
            </div>
        </aside>
    )
}

export default BlogFilter