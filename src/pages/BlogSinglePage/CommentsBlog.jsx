import React from 'react'

const CommentsBlog = () => {
    return (
        <div className="comments">
            <h3 className="title">3 Comments</h3>
            <ul>
                <li>
                    <div className="comment">
                        <figure className="comment-media">
                            <a href="#">
                                <img src="assets/images/blog/comments/1.jpg" alt="User name" />
                            </a>
                        </figure>
                        <div className="comment-body">
                            <a href="#" className="comment-reply">Reply</a>
                            <div className="comment-user">
                                <h4>
                                    <a href="#">Jimmy Pearson</a>
                                </h4>
                                <span className="comment-date">November 9, 2018 at 2:19 pm</span>
                            </div>
                            <div className="comment-content">
                                <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
                                    sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut
                                    justo. Suspendisse potenti. </p>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <div className="comment">
                                <figure className="comment-media">
                                    <a href="#">
                                        <img src="assets/images/blog/comments/2.jpg" alt="User name" />
                                    </a>
                                </figure>
                                <div className="comment-body">
                                    <a href="#" className="comment-reply">Reply</a>
                                    <div className="comment-user">
                                        <h4>
                                            <a href="#">Lena Knight</a>
                                        </h4>
                                        <span className="comment-date">November 9, 2018 at 2:19
                                            pm</span>
                                    </div>
                                    <div className="comment-content">
                                        <p>Morbi interdum mollis sapien. Sed ac risus.</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="comment">
                        <figure className="comment-media">
                            <a href="#">
                                <img src="assets/images/blog/comments/3.jpg" alt="User name" />
                            </a>
                        </figure>
                        <div className="comment-body">
                            <a href="#" className="comment-reply">Reply</a>
                            <div className="comment-user">
                                <h4>
                                    <a href="#">Johnathan Castillo</a>
                                </h4>
                                <span className="comment-date">November 9, 2018 at 2:19 pm</span>
                            </div>
                            <div className="comment-content">
                                <p>Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                                    dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                                    dapibus eu, fermentum et, dapibus sed, urna.</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default CommentsBlog