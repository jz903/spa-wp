import React, { PureComponent } from 'react'
import { number, object, array, func } from 'prop-types'
import Loadable from 'react-loadable'

import Loading from '../Loading'
import './index.css'

const CarouselTemplate = Loadable({
  loader: () => import('../CarouselTemplate'),
  loading: Loading,
})

const SectionTemplate = Loadable({
  loader: () => import('../SectionTemplate'),
  loading: Loading,
})

class Home extends PureComponent {
  static propTypes = {
    pageId: number,
    page: object.isRequired,
    homeCarousel: array.isRequired,
    pageSection: array.isRequired,
    fetchSinglePage: func.isRequired,
  }

  static defaultProps = {
    pageId: 0,
  }

  componentDidMount() {
    const { pageId, page, fetchSinglePage } = this.props

    if (pageId && Object.keys(page).length === 0) {
      fetchSinglePage(pageId)
    }
  }

  render() {
    const { pageSection, homeCarousel } = this.props

    return (
      <div className="app-home">
        <CarouselTemplate carousel={homeCarousel} />
        <div className="app-home__content">
          {
            pageSection.map((section, index) =>
              (<SectionTemplate
                key={index} // eslint-disable-line
                className={`app-section_${index + 1}`}
                section={section}
              />),
            )
          }
        </div>
      </div>
    )
  }
}

export default Home
