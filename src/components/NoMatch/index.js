import React from 'react'
import { bool } from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import './index.css'

const NoMatch = ({
  isLoading,
}) => !isLoading && (
  <div className="page-nomatch">
    <h1>404</h1>
    <h3>This page doesn{"'"}t exist</h3>
    <Link to="/">
      <Button type="primary" ghost>Back to home</Button>
    </Link>
  </div>
)

NoMatch.propTypes = {
  isLoading: bool.isRequired,
}

export default NoMatch
