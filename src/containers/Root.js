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

  state = {
    primaryMenu: [],
  }

  componentDidMount() {
    const { store } = this.props

    store.dispatch(fetchMenu(PRIMARY_MENU_ID))
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
