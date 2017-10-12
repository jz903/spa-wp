import React from 'react'
import { bool } from 'prop-types'
import { Spin } from 'antd'

import './index.css'

const Loading = ({
  isLoading,
}) => isLoading && (
  <div className="loading">
    <Spin tip="Loading..." />
  </div>
)

Loading.propTypes = {
  isLoading: bool,
}

Loading.defaultProps = {
  isLoading: false,
}

export default Loading
