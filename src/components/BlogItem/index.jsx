import React from 'react'

const BlogItem = () => {
    return (
        <div className="entry-item col-sm-6">
            <article className="entry entry-grid">
                <figure className="entry-media">
                    <a href="blog-single.html">
                        <img src="assets/images/blog/grid/3cols/post-1.jpg" alt="image desc" />
                    </a>
                </figure>
                <div className="entry-body">
                    <div className="entry-meta">
                        <span>Nov 22, 2018</span>
                        <span className="meta-separator">|</span>
                        <span className="entry-author"> by <a href="#">John Doe</a>
                        </span>
                    </div>
                    <h2 className="entry-title">
                        <a href="blog-single.html">Cras ornare tristique elit.</a>
                    </h2>
                    <div className="entry-content">
                        <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas vulputate ...</p>
                        <a href="blog-single.html" className="read-more">Read More</a>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default BlogItem