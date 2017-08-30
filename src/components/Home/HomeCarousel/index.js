import React from 'react'
import { array, object } from 'prop-types'
import { Carousel } from 'antd'

import './index.css'

const HomeCarousel = ({
  site,
  carousel,
}) => (
  carousel.length > 0 &&
  <Carousel
    draggable
    autoplay
    autoplaySpeed="5000"
  >
    {carousel.map(media => (
      <div key={media.id} style={{ backgroundImage: `url(${media.sourceUrl})` }}>
        <div className="slogan">
          <h1>{site.name}</h1>
          <h3>{site.description}</h3>
        </div>
      </div>
    ))}
  </Carousel>
)

HomeCarousel.propTypes = {
  site: object.isRequired,
  carousel: array.isRequired,
}

export default HomeCarousel
