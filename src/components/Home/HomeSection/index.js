import React from 'react'
import { object } from 'prop-types'

const HomeSection = ({
  content,
}) => (
  <section
    className="section"
    dangerouslySetInnerHTML={
      { __html: content }
    }
  />
)

HomeSection.propTypes = {
  content: object.isRequired,
}

export default HomeSection
