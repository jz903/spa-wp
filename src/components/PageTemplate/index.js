import React, { PureComponent } from 'react'
import { number, object, func } from 'prop-types'

class PageTemplate extends PureComponent {
  static propTypes = {
    pageId: number.isRequired,
    page: object.isRequired,
    fetchPage: func.isRequired,
  }

  componentDidMount() {
    const { pageId, fetchPage } = this.props

    fetchPage(pageId)
  }

  render() {
    const { page } = this.props
    const { title, content, betterFeaturedImage } = page
    const { sourceUrl, altText } = betterFeaturedImage || {}

    return (
      <div className="page page-template">
        <h1>{title && title.rendered}</h1>
        <img src={sourceUrl} alt={altText} />
        <div className="content" dangerouslySetInnerHTML={{ __html: content && content.rendered }} />
      </div>
    )
  }
}

export default PageTemplate
