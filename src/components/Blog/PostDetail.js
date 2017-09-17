import React from 'react'
import { object } from 'prop-types'

const PostDetail = ({
  post,
}) => (
  <div>
    <h1>{post.title && post.title.rendered}</h1>
    <div
      className="app-page__content"
      dangerouslySetInnerHTML={{ __html: post.content && post.content.rendered }} // eslint-disable-line
    />
  </div>
)

PostDetail.propTypes = {
  post: object.isRequired,
}

export default PostDetail
