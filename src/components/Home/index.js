import React, { PureComponent } from 'react'
import { number, object, array, func } from 'prop-types'

import CarouselTemplate from '../CarouselTemplate'
import SectionTemplate from '../SectionTemplate'
import './index.css'

class Home extends PureComponent {
  static propTypes = {
    pageId: number,
    posts: object.isRequired,
    homeCarousel: array.isRequired,
    pageSection: array.isRequired,
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
        <CarouselTemplate carousel={homeCarousel} />
        <div className="home-content">
          {
            pageSection.map((section, index) =>
              (<SectionTemplate
                key={index} // eslint-disable-line
                className={`section_${index + 1}`}
                section={section}
              />),
            )
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
