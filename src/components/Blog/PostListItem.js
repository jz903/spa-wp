import React from 'react'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'

const PostListItem = ({
  post,
}) => (
  <li>
    <h2><Link to={`/blog/${post.id}`}>{post.title && post.title.rendered}</Link></h2>
  </li>
)

PostListItem.propTypes = {
  post: object.isRequired,
}

export default PostListItem
