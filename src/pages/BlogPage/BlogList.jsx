import React from 'react'
import BlogCard from '../../components/BlogCard'
import { Empty, Skeleton } from 'antd';
import styled from 'styled-components';
const BlogSkeletonStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 5%;
`;
const BlogList = ({ isLoading, isError, blogs }) => {
    if ((!isLoading && blogs?.length < 1) || isError)
        return (
            <div className="entry-container max-col-2" d>
                <Empty description="There is no blogs" />
            </div>
        );
    if (blogs > 0 && isLoading) {
        return (
            <div className="entry-container max-col-2">
                {new Array(9).fill("").map((_, index) => {
                    return (
                        <BlogSkeletonStyle key={index} className="entry-item col-sm-6">
                            <Skeleton.Image active style={{ width: "100%", height: 275 }} />
                            <Skeleton.Input />
                            <Skeleton.Input block />
                        </BlogSkeletonStyle>
                    )
                })}
            </div>
        )
    }
    return (
        <div className="entry-container max-col-2">
            {
                blogs.map((blog, index) => {
                    return (
                        <div key={blog?.id || index} className="entry-item col-sm-6">
                            <BlogCard blog={blog} />
                        </div>
                    );
                })
            }
        </div>
    )
}

export default BlogList