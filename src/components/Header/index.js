import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Layout, Menu } from 'antd'

import './index.css'

const { Header } = Layout

class HeaderComp extends PureComponent {
  static propTypes = {
    site: object.isRequired,
    menu: object.isRequired,
    router: object.isRequired,
  }

  render() {
    const { site, menu, router } = this.props
    const menuItems = menu.items || []
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
              {menuItems.length > 0 && menuItems.map(item => (
                <Menu.Item key={item.objectSlug}>
                  <Link to={`/${item.objectSlug}`}>{item.title}</Link>
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
