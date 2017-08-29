import React, { PureComponent } from 'react'
import { number, object, func } from 'prop-types'
import { Carousel } from 'antd'

import { HOME_CAROUSEL_CATEGORY_ID } from '../../constants/site'
import './index.css'
import logo from '../../assets/images/logo.svg'

class Home extends PureComponent {
  static propTypes = {
    pageId: number,
    page: object.isRequired,
    posts: object.isRequired,
    fetchPage: func.isRequired,
    fetchAllPosts: func.isRequired,
    fetchAllMedia: func.isRequired,
  }

  static defaultProps = {
    pageId: 0,
  }

  componentDidMount() {
    const { pageId, fetchPage, fetchAllPosts, fetchAllMedia } = this.props

    if (pageId) {
      fetchPage(pageId)
    }
    fetchAllPosts()
    fetchAllMedia({
      categories: HOME_CAROUSEL_CATEGORY_ID,
    })
  }

  render() {
    const { posts, page } = this.props
    const { content } = page
    const isEmpty = Object.keys(posts).length === 0

    return (
      <div className="App container">
        <div className="App-header">
          <Carousel autoplay>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
          </Carousel>
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
