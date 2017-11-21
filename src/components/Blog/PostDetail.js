import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'

import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'

import PostDate from './PostDate'
import NoMatch from '../../containers/NoMatch'

class PostDetail extends PureComponent {
  static propTypes = {
    post: object.isRequired,
    fetchSinglePost: func.isRequired,
  }

  componentDidMount() {
    const { post, fetchSinglePost } = this.props

    if (!post.title) {
      fetchSinglePost(post.id)
    }
  }

  render() {
    const { post } = this.props
    const isPostValid = post.title

    return isPostValid ? (
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
    ) : <NoMatch />
  }
}

export default PostDetail
