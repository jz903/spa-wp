import React from 'react'
import { array, object, func } from 'prop-types'
import { Pagination } from 'antd'

import PostListItem from './PostListItem'

const PostList = ({
  posts,
  postsIds,
  postsMeta,
  handlePageChange,
}) => {
  const isEmpty = postsIds.length === 0

  return (
    <div>
      <ul className="app-blog__list">
        {isEmpty ? 'Blog list is empty.'
          : postsIds
            .map(key => (
              <PostListItem key={key} post={posts[key]} />
            ))
        }
      </ul>
      {postsMeta.pages > 1 && <Pagination
        className="app-blog__pagination"
        defaultCurrent={postsMeta.current}
        total={postsMeta.total}
        onChange={handlePageChange}
      />}
    </div>
  )
}

PostList.propTypes = {
  posts: object.isRequired,
  postsIds: array.isRequired,
  postsMeta: object.isRequired,
  handlePageChange: func.isRequired,
}

export default PostList
