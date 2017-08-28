import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Layout, Menu } from 'antd'

import './index.css'

const { Header } = Layout

class HeaderComp extends PureComponent {
  static propTypes = {
    pages: object.isRequired,
    router: object.isRequired,
  }

  render() {
    const { pages, router } = this.props
    const selectedKeys = [router.location.pathname.split('/')[1]]

    return (
      <Header className="app-header">
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <h1 className="header-title">
              <Link to="/">WP SPA</Link>
            </h1>
          </Col>
          <Col className="gutter-row header-nav header-nav__right" span={16}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedKeys}
              onSelect={this.handleFilterChange}
            >
              {Object.keys(pages).length > 0 && Object.keys(pages).map(id => (
                <Menu.Item key={pages[id].slug}>
                  <Link to={`/${pages[id].slug}`}>{pages[id].title.rendered}</Link>
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
