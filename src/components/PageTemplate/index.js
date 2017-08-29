import React, { PureComponent } from 'react'
import { number, object, func } from 'prop-types'

class PageTemplate extends PureComponent {
  static propTypes = {
    pageId: number.isRequired,
    page: object.isRequired,
    featuredMedia: object.isRequired,
    fetchPage: func.isRequired,
    fetchMedia: func.isRequired,
  }

  componentDidMount() {
    const { pageId, fetchPage } = this.props

    fetchPage(pageId)
  }

  componentWillReceiveProps(nextProps) {
    const { fetchMedia, page: { featuredMedia } } = this.props
    const { page: { featuredMedia: newFeaturedMedia } } = nextProps

    if (newFeaturedMedia && newFeaturedMedia !== featuredMedia) {
      fetchMedia(newFeaturedMedia)
    }
  }

  render() {
    const { page, featuredMedia } = this.props
    const { title, content } = page
    const { sourceUrl, altText } = featuredMedia

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
