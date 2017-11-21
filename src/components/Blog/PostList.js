import React, { PureComponent } from 'react'
import { array, object, func } from 'prop-types'
import { Pagination } from 'antd'

import PostListItem from './PostListItem'

class PostList extends PureComponent {
  static propTypes = {
    posts: object.isRequired,
    postsIds: array.isRequired,
    postsMeta: object.isRequired,
    fetchPosts: func.isRequired,
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  handlePageChange = page => {
    this.props.fetchPosts({
      page,
    })
    window.document.body.scrollTop = 0
  }

  render() {
    const {
      posts,
      postsIds,
      postsMeta,
    } = this.props
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
          onChange={this.handlePageChange}
        />}
      </div>
    )
  }
}

export default PostList
