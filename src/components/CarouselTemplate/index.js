import React from 'react'
import { array } from 'prop-types'
import { Carousel } from 'antd'

import './index.css'

const CarouselTemplate = ({
  carousel,
}) => (
  carousel.length > 0 &&
  <Carousel
    draggable
    autoplay
    autoplaySpeed="5000"
  >
    {carousel.map((media, index) => (
      <div
        key={index} // eslint-disable-line
        style={{ backgroundImage: `url(${media.url})` }}
      >
        <div className="slogan">
          {media.title && <h1>{media.title}</h1>}
          {media.description && <h3>{media.description}</h3>}
        </div>
      </div>
    ))}
  </Carousel>
)

CarouselTemplate.propTypes = {
  carousel: array.isRequired,
}

export default CarouselTemplate
