import React from 'react'

const RelatedBlog = () => {
    return (
        <div className="related-posts">
            <h3 className="title">Related Posts</h3>
            <div className="owl-carousel owl-simple" data-toggle="owl" data-owl-options="{
                                      &quot;nav&quot;: false, 
                                      &quot;dots&quot;: true,
                                      &quot;margin&quot;: 20,
                                      &quot;loop&quot;: false,
                                      &quot;responsive&quot;: {
                                          &quot;0&quot;: {
                                              &quot;items&quot;:1
                                          },
                                          &quot;480&quot;: {
                                              &quot;items&quot;:2
                                          },
                                          &quot;768&quot;: {
                                              &quot;items&quot;:3
                                          }
                                      }
                                  }">
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
                    </div>
                </article>
                <article className="entry entry-grid">
                    <figure className="entry-media">
                        <a href="blog-single.html">
                            <img src="assets/images/blog/grid/3cols/post-2.jpg" alt="image desc" />
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
                            <a href="blog-single.html">Vivamus ntulla necante.</a>
                        </h2>
                    </div>
                </article>
                <article className="entry entry-grid">
                    <figure className="entry-media">
                        <a href="blog-single.html">
                            <img src="assets/images/blog/grid/3cols/post-3.jpg" alt="image desc" />
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
                            <a href="blog-single.html">Utaliquam sollicitudin leo.</a>
                        </h2>
                    </div>
                </article>
                <article className="entry entry-grid">
                    <figure className="entry-media">
                        <a href="blog-single.html">
                            <img src="assets/images/blog/grid/3cols/post-4.jpg" alt="image desc" />
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
                            <a href="blog-single.html">Fusce pellentesque suscipit.</a>
                        </h2>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default RelatedBlog