import React from 'react'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'

import PostDate from './PostDate'

const PostListItem = ({
  post,
}) => (
  <li>
    <h2><Link to={`/blog/${post.id}`}>{post.title && post.title.rendered}</Link></h2>
    <PostDate date={post.date} />
    <div
      className="app-blog__excerpt"
      dangerouslySetInnerHTML={ // eslint-disable-line
        { __html: post.excerpt.rendered }
      }
    />
    <p>
      <Link to={`/blog/${post.id}`}>{'Read More >>'}</Link>
    </p>
  </li>
)

PostListItem.propTypes = {
  post: object.isRequired,
}

export default PostListItem
