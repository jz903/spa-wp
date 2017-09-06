import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Layout, Menu } from 'antd'

import { getSlugFromUrl } from '../../utils'
import './index.css'

const { Header } = Layout

class HeaderComp extends PureComponent {
  static propTypes = {
    site: object.isRequired,
    router: object.isRequired,
  }

  render() {
    const { site, router } = this.props
    const { topMenu } = site
    const selectedKeys = [router.location.pathname.split('/')[1]]

    return (
      <Header className="app-header">
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <h1 className="app-header__title">
              <Link to="/">{site.name}</Link>
            </h1>
          </Col>
          <Col className="gutter-row app-header__nav app-header__right" span={16}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedKeys}
              onSelect={this.handleFilterChange}
            >
              {topMenu.length > 0 && topMenu.map(menu => (
                <Menu.Item key={menu.id}>
                  <Link to={`/${getSlugFromUrl(menu.url)}`}>{menu.title}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default HeaderComp
