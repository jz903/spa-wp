import React, { PureComponent } from 'react'
import { number, object, func } from 'prop-types'

import BlogPage from '../../containers/BlogPage'
import ContactPage from '../../containers/ContactPage'
import { isBrowser } from '../../utils'
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

    if (isBrowser) {
      window.document.body.scrollTop = 0
    }
  }

  render() {
    const { pageId, page } = this.props
    const { slug, content, betterFeaturedImage = {}, wpsSubtitle } = page
    const pageTitle = page.title && page.title.rendered
    const desktopBg = betterFeaturedImage.sourceUrl

    return (
      <div className="app-page">
        <div
          className="app-page__hero"
          style={{
            backgroundImage: (isBrowser && desktopBg) && `url(${desktopBg})`,
          }}
        >
          <div className="app-page__title">
            {pageTitle && <h1>{pageTitle}</h1>}
            {wpsSubtitle && <h3>{wpsSubtitle}</h3>}
          </div>
        </div>
        <div
          className="app-page__content container"
          dangerouslySetInnerHTML={{ __html: content && content.rendered }} // eslint-disable-line
        />
        {slug === 'blog' && <BlogPage />}
        {slug === 'contact' && <ContactPage pageId={pageId} />}
      </div>
    )
  }
}

export default PageTemplate
