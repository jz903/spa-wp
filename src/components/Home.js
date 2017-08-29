import React, { PureComponent } from 'react'
import { number, object, func } from 'prop-types'

import './Home.css'
import logo from '../assets/images/logo.svg'

class Home extends PureComponent {
  static propTypes = {
    pageId: number.isRequired,
    page: object.isRequired,
    posts: object.isRequired,
    fetchPage: func.isRequired,
    fetchAllPosts: func.isRequired,
  }

  componentDidMount() {
    const { pageId, fetchPage, fetchAllPosts } = this.props

    fetchPage(pageId)
    fetchAllPosts()
  }

  render() {
    const { posts, page } = this.props
    const { content } = page
    const isEmpty = Object.keys(posts).length === 0

    return (
      <div className="App container">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Welcome to WP SPA
          </h2>
          <div className="content" dangerouslySetInnerHTML={{ __html: content && content.rendered }} />
          <div>
            {isEmpty && 'There is no posts yet.'}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
