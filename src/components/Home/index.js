import React, { PureComponent } from 'react'
import { number, object, array, func } from 'prop-types'

import HomeCarousel from './HomeCarousel'
import HomeSection from './HomeSection'
import { HOME_CAROUSEL_CATEGORY_ID } from '../../constants/site'
import './index.css'

class Home extends PureComponent {
  static propTypes = {
    pageId: number,
    site: object.isRequired,
    pageSection: object.isRequired,
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

    fetchSinglePage(pageId)
    fetchPosts()
    fetchMedia({
      categories: HOME_CAROUSEL_CATEGORY_ID,
    })
  }

  render() {
    const { site, posts, pageSection, homeCarouselMedia } = this.props
    const isEmpty = Object.keys(posts).length === 0

    return (
      <div className="home">
        <HomeCarousel carousel={homeCarouselMedia} site={site} />
        <div className="home-content container">
          {Object.keys(pageSection).map(key => <HomeSection key={key} className={key} content={pageSection[key]} />)}
          <div>
            {isEmpty && 'There is no posts yet.'}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
