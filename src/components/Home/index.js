import React, { PureComponent } from 'react'
import { number, object, array, func } from 'prop-types'

import HomeCarousel from './HomeCarousel'
import { HOME_CAROUSEL_CATEGORY_ID, HOME_CONTENT_CATEGORY_ID } from '../../constants/site'
import './index.css'
import logo from '../../assets/images/logo.svg'

class Home extends PureComponent {
  static propTypes = {
    site: object.isRequired,
    content: object.isRequired,
    posts: object.isRequired,
    homeCarouselMedia: array.isRequired,
    fetchPages: func.isRequired,
    fetchPosts: func.isRequired,
    fetchMedia: func.isRequired,
  }

  static defaultProps = {
    pageId: 0,
  }

  componentDidMount() {
    const { fetchPages, fetchPosts, fetchMedia } = this.props

    fetchPages({
      categories: HOME_CONTENT_CATEGORY_ID,
    })
    fetchPosts()
    fetchMedia({
      categories: HOME_CAROUSEL_CATEGORY_ID,
    })
  }

  render() {
    const { site, posts, content, homeCarouselMedia } = this.props
    const { home, faceIdentification } = content
    const isEmpty = Object.keys(posts).length === 0

    return (
      <div className="home">
        <HomeCarousel carousel={homeCarouselMedia} site={site} />
        <div className="home-content container">
          <section className="section face-identification" >
            <div className="section__header">
              <h2>{faceIdentification && faceIdentification.title.rendered}</h2>
            </div>
            <div
              className="section__body"
              dangerouslySetInnerHTML={
                { __html: faceIdentification && faceIdentification.content.rendered }
              }
            />
          </section>
          <div className="content" dangerouslySetInnerHTML={{ __html: home && home.content.rendered }} />
          <div>
            {isEmpty && 'There is no posts yet.'}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
