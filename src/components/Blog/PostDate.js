import React from 'react'
import { string } from 'prop-types'

import { formatDate } from '../../utils'

const PostDate = ({
  date,
}) => (
  <p className="app-blog__date">
    <span>{formatDate(date).date}</span>
    <span>{formatDate(date).time}</span>
  </p>
)

PostDate.propTypes = {
  date: string.isRequired,
}

export default PostDate
