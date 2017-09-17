import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Layout, Popover, Icon } from 'antd'

import TopNavMenu from './TopNavMenu'
import './index.css'

const { Header } = Layout

class HeaderComp extends PureComponent {
  static propTypes = {
    site: object.isRequired,
    router: object.isRequired,
    updateTopMenuVisible: func.isRequired,
  }

  handleVisibleChange = visible => {
    const { updateTopMenuVisible } = this.props

    updateTopMenuVisible(visible)
  }

  render() {
    const { site, router } = this.props
    const { topMenu, topMenuVisible } = site
    const selectedKeys = [router.location && router.location.pathname.split('/')[1]]

    return (
      <Header className="app-header">
        <div className="container">
          <Row gutter={16}>
            <Col className="gutter-row app-header__logo" xs={24} md={8}>
              <Link to="/">
                <h1 className="app-header__title">
                  {site.name}
                  <small>{site.description}</small>
                </h1>
              </Link>
              <Popover
                overlayClassName="popover-menu"
                placement="bottomRight"
                trigger="click"
                visible={topMenuVisible}
                onVisibleChange={this.handleVisibleChange}
                content={
                  <TopNavMenu
                    mode="inline"
                    topMenu={topMenu}
                    selectedKeys={selectedKeys}
                  />
                }
              >
                <Icon
                  className="app-header__nav-icon"
                  type="menu"
                />
              </Popover>
            </Col>
            <Col className="gutter-row app-header__nav" xs={0} md={16}>
              <TopNavMenu
                mode="horizontal"
                topMenu={topMenu}
                selectedKeys={selectedKeys}
              />
            </Col>
          </Row>
        </div>
      </Header>
    )
  }
}

export default HeaderComp
