import React, { PureComponent } from 'react'
import { array, object, func } from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import PostList from './PostList'
import PostDetail from './PostDetail'
import NoMatch from '../NoMatch'

import './index.css'

class Blog extends PureComponent {
  static propTypes = {
    router: object.isRequired,
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
  }

  render() {
    const { router, posts, postsIds, postsMeta } = this.props

    return (
      <div className="container">
        {router.location && router.location.pathname === '/blog' &&
          <PostList
            posts={posts}
            postsIds={postsIds}
            postsMeta={postsMeta}
            handlePageChange={this.handlePageChange}
          />
        }
        <Switch>
          <Route
            path="/blog/:id"
            component={({ match }) => {
              const post = posts[match.params.id]

              if (!post) {
                return <NoMatch />
              }

              return <PostDetail post={post} />
            }}
          />
        </Switch>
      </div>
    )
  }
}

export default Blog
