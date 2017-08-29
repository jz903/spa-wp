import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'

class CommonPage extends PureComponent {
  static propTypes = {
    page: object.isRequired,
    featuredMedia: object.isRequired,
    fetchMedia: func.isRequired,
  }

  componentDidMount() {
    const { fetchMedia, page: { featuredMedia } } = this.props

    if (featuredMedia) {
      fetchMedia(featuredMedia)
    }
  }

  render() {
    const { page, featuredMedia } = this.props
    const { sourceUrl, altText } = featuredMedia

    return (
      <div className="page page-template">
        <h1>{page.title.rendered}</h1>
        <img src={sourceUrl} alt={altText} />
        <div className="content" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </div>
    )
  }
}

export default CommonPage
