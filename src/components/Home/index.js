import React, { PureComponent } from 'react'
import { number, object, array, func } from 'prop-types'

import HomeCarousel from './HomeCarousel'
import { HOME_CAROUSEL_CATEGORY_ID } from '../../constants/site'
import './index.css'
import logo from '../../assets/images/logo.svg'

class Home extends PureComponent {
  static propTypes = {
    pageId: number,
    site: object.isRequired,
    page: object.isRequired,
    posts: object.isRequired,
    homeCarouselMedia: array.isRequired,
    fetchSinglePage: func.isRequired,
    fetchPosts: func.isRequired,
    fetchMedia: func.isRequired,
  }

  static defaultProps = {
    pageId: 0,
  }

  componentDidMount() {
    const { pageId, fetchSinglePage, fetchPosts, fetchMedia } = this.props

    if (pageId) {
      fetchSinglePage(pageId)
    }
    fetchPosts()
    fetchMedia({
      categories: HOME_CAROUSEL_CATEGORY_ID,
    })
  }

  render() {
    const { site, posts, page, homeCarouselMedia } = this.props
    const { content } = page
    const isEmpty = Object.keys(posts).length === 0

    return (
      <div className="home">
        <HomeCarousel carousel={homeCarouselMedia} site={site} />
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
      </div>
    )
  }
}

export default Home
