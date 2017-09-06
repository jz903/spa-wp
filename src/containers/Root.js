import React, { PureComponent } from 'react'
import { array, object } from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Layout } from 'antd'

import Header from './Header'
import Loading from './Loading'
import Home from './HomePage'
import PageTemplate from './PageTemplate'
import { fetchSiteInfo } from '../actions/site'
import { fetchSingleMenu } from '../actions/menu'
import { PRIMARY_MENU_ID } from '../constants/site'


const { Content, Footer } = Layout

const PagesRoutes = ({
  primaryMenu,
}) => {
  if (primaryMenu.length > 0) {
    return (
      <div>
        {primaryMenu.map(item => (
          item.objectSlug === 'home' ?
            (
              <div key={item.objectId}>
                <Route exact path="/" component={() => <Home pageId={item.objectId} />} />
                <Route path={`/${item.objectSlug}`} component={() => <Home pageId={item.objectId} />} />
              </div>
            ) : <Route key={item.objectId} path={`/${item.objectSlug}`} component={() => <PageTemplate pageId={item.objectId} />} />
        ))}
      </div>
    )
  }

  return <Route exact path="/" component={Home} />
}

PagesRoutes.propTypes = {
  primaryMenu: array.isRequired,
}

class Root extends PureComponent {
  static propTypes = {
    store: object.isRequired,
    history: object.isRequired,
  }

  state = {
    primaryMenu: [],
  }

  componentDidMount() {
    const { store } = this.props

    store.dispatch(fetchSiteInfo())
    store.dispatch(fetchSingleMenu(PRIMARY_MENU_ID))
      .then(({ response }) => {
        if (response) {
          this.setState({
            primaryMenu: response.entities.menus[PRIMARY_MENU_ID].items,
          })
        }
      })
  }

  render() {
    const { store, history } = this.props
    const { primaryMenu } = this.state

    return (
      <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <Layout className="layout">
            <Header menuId={PRIMARY_MENU_ID} />
            <Content>
              <PagesRoutes primaryMenu={primaryMenu} />
            </Content>
            <Footer>
              Wordpress Single Page App ©2017 Chris Zhou
            </Footer>
            <Loading />
          </Layout>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root
