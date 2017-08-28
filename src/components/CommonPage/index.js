import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'

class CommonPage extends PureComponent {
  static propTypes = {
    page: object.isRequired,
    fetchMedia: func.isRequired,
  }

  componentDidMount() {
    const { fetchMedia, page } = this.props

    fetchMedia(page.featuredMedia)
  }

  render() {
    return (
      <h1>This is Page</h1>
    )
  }
}

export default CommonPage
