import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Layout } from 'antd'

import Header from './Header'
import Loading from './Loading'
import Home from './HomePage'
import CommonPage from './CommonPage'
import { fetchPages } from '../actions/page'

const { Content, Footer } = Layout

class Root extends PureComponent {
  static propTypes = {
    store: object.isRequired,
    history: object.isRequired,
  }

  state = {
    pages: [],
  }

  componentDidMount() {
    const { store } = this.props

    store.dispatch(fetchPages())
      .then(({ response }) => {
        if (response) {
          this.setState({
            pages: response.entities.pages,
          })
        }
      })
  }

  render() {
    const { store, history } = this.props
    const { pages } = this.state
    const pagesRoutes = Object.keys(pages).map(id => (
      <Route key={id} path={`/${pages[id].slug}`} component={() => <CommonPage pageId={id} />} />
    ))

    return (
      <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <Layout className="layout">
            <Header />
            <Content>
              <Route exact path="/" component={Home} />
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
