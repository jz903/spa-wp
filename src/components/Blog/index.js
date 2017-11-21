import React, { PureComponent } from 'react'
import { array, object, func } from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import PostList from './PostList'
import PostDetail from './PostDetail'

import './index.css'

class Blog extends PureComponent {
  static propTypes = {
    router: object.isRequired,
    posts: object.isRequired,
    postsIds: array.isRequired,
    postsMeta: object.isRequired,
    fetchPosts: func.isRequired,
    fetchSinglePost: func.isRequired,
  }

  render() {
    const { router, posts, postsIds, postsMeta, fetchPosts, fetchSinglePost } = this.props

    return (
      <div className="container">
        {router.location && router.location.pathname === '/blog' &&
          <PostList
            posts={posts}
            postsIds={postsIds}
            postsMeta={postsMeta}
            fetchPosts={fetchPosts}
          />
        }
        <Switch>
          <Route
            path="/blog/:id"
            render={({ match }) => {
              const id = match.params.id
              const post = posts[id] || { id }

              return <PostDetail post={post} fetchSinglePost={fetchSinglePost} />
            }}
          />
        </Switch>
      </div>
    )
  }
}

export default Blog
