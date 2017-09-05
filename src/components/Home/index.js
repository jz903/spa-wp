import React, { PureComponent } from 'react'
import { number, object, array, func } from 'prop-types'

import HomeCarousel from './HomeCarousel'
import HomeSection from './HomeSection'
import './index.css'

class Home extends PureComponent {
  static propTypes = {
    pageId: number,
    pageSection: object.isRequired,
    posts: object.isRequired,
    homeCarousel: array.isRequired,
    fetchSinglePage: func.isRequired,
    fetchPosts: func.isRequired,
  }

  static defaultProps = {
    pageId: 0,
  }

  componentDidMount() {
    const { pageId, fetchSinglePage, fetchPosts } = this.props

    if (pageId) {
      fetchSinglePage(pageId)
    }
    fetchPosts()
  }

  render() {
    const { posts, pageSection, homeCarousel } = this.props
    const isEmpty = Object.keys(posts).length === 0

    return (
      <div className="home">
        <HomeCarousel carousel={homeCarousel} />
        <div className="home-content container">
          {
            Object.keys(pageSection).map(key =>
              <HomeSection key={key} className={key} content={pageSection[key]} />)
          }
          <div>
            {isEmpty && 'There is no posts yet.'}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
