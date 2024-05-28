import React from 'react'
import { formatDate } from '../../utils/format'
import useQuery from '../../hooks/useQuery';
import { blogService } from '../../services/blogService';
import ShareLink from '../../components/ShareLink';

const ContentBlog = ({ name, image, updatedAt, author, description }) => {
    const pathUrl = window.location.href;

    return (
        <article className="entry single-entry">
            <div className="entry-body">
                <figure className="entry-media">
                    <img src={image || ""} alt="image desc" />
                </figure>
                <h1 className="entry-title entry-title-big">{name || ""}</h1>
                <div className="entry-meta">
                    <span>{formatDate(updatedAt || "")}</span>
                    <span className="meta-separator">|</span>
                    <span className="entry-author"> by <a href="#">{author || ""}</a>
                    </span>
                </div>
                {/* <div className="entry-content editor-content" dangerouslySetInnerHTML={{ __html: description }}>
                </div> */}
                <div className="editor-content" dangerouslySetInnerHTML={{ __html: description }}>
                </div>
                <div className="entry-footer row no-gutters flex-column flex-md-row">
                    <div className="col-md">
                        <div className="entry-tags">
                            <span>Tags:</span>
                            <a href="#">photography</a>
                            <a href="#">style</a>
                        </div>
                    </div>
                    <div className="col-md-auto mt-2 mt-md-0">
                        <div className="social-icons social-icons-color">
                            <span className="social-label">Share this post:</span>
                            {/* <a href="#" className="social-icon social-facebook" title="Facebook" target="_blank">
                                <i className="icon-facebook-f" />
                            </a>
                            <a href="#" className="social-icon social-twitter" title="Twitter" target="_blank">
                                <i className="icon-twitter" />
                            </a>
                            <a href="#" className="social-icon social-pinterest" title="Pinterest" target="_blank">
                                <i className="icon-pinterest" />
                            </a>
                            <a href="#" className="social-icon social-linkedin" title="Linkedin" target="_blank">
                                <i className="icon-linkedin" />
                            </a> */}
                            <ShareLink
                                title="Facebook"
                                path={pathUrl}
                            >
                                <i className="icon-facebook-f" />
                            </ShareLink>
                            <ShareLink
                                className="social-twitter"
                                title="Twitter"
                                path={pathUrl}
                                type="twitter"
                            >
                                <i className="icon-twitter" />
                            </ShareLink>
                            <ShareLink
                                title="Instagram"
                                path={pathUrl}
                                type="instagram"
                            >
                                <i className="icon-instagram" />
                            </ShareLink>
                            <ShareLink
                                title="Pinterest"
                                path={pathUrl}
                                type="pinterest"
                            >
                                <i className="icon-pinterest" />
                            </ShareLink>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ContentBlog