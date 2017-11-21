import React, { PureComponent } from 'react'
import { string } from 'prop-types'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

class PageContent extends PureComponent {
  static propTypes = {
    content: string.isRequired,
  }

  state = {
    players: 0,
  }

  componentDidMount() {
    this.initVideos()
  }

  componentWillUnmount() {
    const { players } = this.state

    if (players > 0) {
      for (let i = 0; i < players; i += 1) {
        this[`player-${i}`].dispose()
      }
    }
  }

  initVideos = () => {
    const videos = document.getElementsByClassName('wp-video-shortcode')

    if (videos.length > 0) {
      this.setState({
        players: videos.length,
      })

      for (let i = 0; i < videos.length; i += 1) {
        const video = videos[i]
        const parent = video.parentElement
        const id = `video-js-${i}`

        video.id = id
        video.className = 'wp-video-shortcode video-js vjs-fluid vjs-big-play-centered'
        video.preload = 'auto'
        video.removeAttribute('width')
        video.removeAttribute('height')
        video.childNodes
        parent.className = 'video-wrapper'
        parent.removeAttribute('style')

        this[`player-${i}`] = videojs(id)
      }
    }
  }

  render() {
    const { content } = this.props

    return (
      <div
        className="app-page__content container"
        dangerouslySetInnerHTML={{ __html: content }} // eslint-disable-line
      />
    )
  }
}

export default PageContent
