import React from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'

const HomeSection = ({
  content,
  className,
}) => {
  const sectionClass = classNames(
    'section',
    {
      [className]: className,
    },
  )

  return (
    <section
      className={sectionClass}
      dangerouslySetInnerHTML={
        { __html: content }
      }
    />
  )
}

HomeSection.propTypes = {
  className: string,
  content: string.isRequired,
}

HomeSection.defaultProps = {
  className: '',
}

export default HomeSection
