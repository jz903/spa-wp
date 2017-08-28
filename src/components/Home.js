import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'

import './Home.css'
import logo from '../assets/images/logo.svg'

class Home extends PureComponent {
  static propTypes = {
    posts: object.isRequired,
    fetchPosts: func.isRequired,
  }

  componentDidMount() {
    const { fetchPosts } = this.props

    fetchPosts()
  }

  render() {
    const { posts } = this.props
    const isEmpty = Object.keys(posts).length === 0

    return (
      <div className="App container">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Welcome to WP SPA
            {isEmpty && 'There is no posts yet.'}
          </h2>
        </div>
      </div>
    )
  }
}

export default Home
