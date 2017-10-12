import React from 'react'
import { object } from 'prop-types'

import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'

import PostDate from './PostDate'

const PostDetail = ({
  post,
}) => (
  <div className="app-blog__detail">
    <Breadcrumb className="app-blog__breadcrumb">
      <Breadcrumb.Item><Link to="/" >Home</Link></Breadcrumb.Item>
      <Breadcrumb.Item><Link to="/blog" >Blog</Link></Breadcrumb.Item>
      <Breadcrumb.Item>{post.title && post.title.rendered}</Breadcrumb.Item>
    </Breadcrumb>
    <h1>{post.title && post.title.rendered}</h1>
    <PostDate date={post.date} />
    <div
      className="app-blog__content"
      dangerouslySetInnerHTML={{ __html: post.content && post.content.rendered }} // eslint-disable-line
    />
  </div>
)

PostDetail.propTypes = {
  post: object.isRequired,
}

export default PostDetail
