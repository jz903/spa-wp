import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Layout } from 'antd'

import Header from './Header'
import Loading from './Loading'
import Home from './HomePage'
import PageTemplate from './PageTemplate'
import { fetchMenu } from '../actions/menu'
import { PRIMARY_MENU_ID } from '../constants/menu'

const { Content, Footer } = Layout

class Root extends PureComponent {
  static propTypes = {
    store: object.isRequired,
    history: object.isRequired,
  }

  componentDidMount() {
    const { store } = this.props

    store.dispatch(fetchMenu(PRIMARY_MENU_ID))
  }

  render() {
    const { store, history } = this.props
    const menus = store.getState().entities.menus
    const primaryMenu = (menus[PRIMARY_MENU_ID] && menus[PRIMARY_MENU_ID].items) || []
    const pagesRoutes = primaryMenu.length > 0 && primaryMenu.map(item => (
      item.objectSlug !== 'home' &&
      <Route key={item.objectId} path={`/${item.objectSlug}`} component={() => <PageTemplate pageId={item.objectId} />} />
    ))

    return (
      <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <Layout className="layout">
            <Header menuId={PRIMARY_MENU_ID} />
            <Content>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              {pagesRoutes}
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
