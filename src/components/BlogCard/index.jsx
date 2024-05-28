import React from 'react'
import PATHS from '../../constants/paths';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/format';

const BlogCard = ({ blog }) => {
    const { image, slug, updatedAt, author, name, description } = blog || {};
    const blogPath = PATHS.BLOG + `/${slug}`;

    return (
        <article className="entry entry-grid">
            <figure className="entry-media">
                <Link to={blogPath || ""}>
                    <img src={image || ""} alt="image desc" />
                </Link>
            </figure>
            <div className="entry-body">
                <div className="entry-meta">
                    <span>{formatDate(updatedAt) || ""}</span>
                    <span className="meta-separator">|</span>
                    <span className="entry-author"> by <a href="#">{author || ""}</a>
                    </span>
                </div>
                <h2 className="entry-title">
                    <Link to={blogPath || ""}>{name || ""}</Link>
                </h2>
                <div className="entry-content" dangerouslySetInnerHTML={{ __html: description }}>
                </div>
                <Link to={blogPath || ""} className="read-more">Read More</Link>
            </div>
        </article >
    )
}

export default BlogCard