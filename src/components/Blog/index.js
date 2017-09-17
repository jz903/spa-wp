import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import PostDetail from './PostDetail'
import PostListItem from './PostListItem'
import NoMatch from '../NoMatch'

class Blog extends PureComponent {
  static propTypes = {
    router: object.isRequired,
    posts: object.isRequired,
    fetchPosts: func.isRequired,
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    const { router, posts } = this.props
    const postsIds = Object.keys(posts)
    const isEmpty = postsIds.length === 0

    return (
      <div className="container">
        {(router.location && router.location.pathname === '/blog') && <ul className="app-blog__list">
          {isEmpty ? 'No posts yet.'
            : postsIds.map(key => (
              <PostListItem key={key} post={posts[key]} />
            ))
          }
        </ul>}
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
