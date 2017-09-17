import React, { PureComponent } from 'react'
import { number, object, func } from 'prop-types'

import './index.css'

class PageTemplate extends PureComponent {
  static propTypes = {
    pageId: number.isRequired,
    page: object.isRequired,
    fetchSinglePage: func.isRequired,
  }

  componentDidMount() {
    const { pageId, page, fetchSinglePage } = this.props

    if (Object.keys(page).length === 0) {
      fetchSinglePage(pageId)
    }

    document.body.scrollTop = 0
  }

  render() {
    const { page } = this.props
    const { title, content, betterFeaturedImage } = page
    const { sourceUrl, altText } = betterFeaturedImage || {}

    return (
      <div className="app-page">
        <h1>{title && title.rendered}</h1>
        <img src={sourceUrl} alt={altText} />
        <div
          className="app-page__content"
          dangerouslySetInnerHTML={{ __html: content && content.rendered }} // eslint-disable-line
        />
      </div>
    )
  }
}

export default PageTemplate
