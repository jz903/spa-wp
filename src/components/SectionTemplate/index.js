import React from 'react'
import { string, object } from 'prop-types'
import classNames from 'classnames'

import './index.css'

const SectionTemplate = ({
  section,
  className,
}) => {
  const { content, bg } = section
  const isBg = !!bg
  const sectionClass = classNames(
    'app-section',
    {
      'app-banner': isBg,
      [className]: className,
    },
  )

  return (
    <section
      className={sectionClass}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="container"
        dangerouslySetInnerHTML={ // eslint-disable-line
          { __html: content }
        }
      />
    </section>
  )
}

SectionTemplate.propTypes = {
  className: string,
  section: object.isRequired,
}

SectionTemplate.defaultProps = {
  className: '',
}

export default SectionTemplate
