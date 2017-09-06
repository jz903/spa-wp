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
import { fetchTopMenu } from '../actions/menu'
import { getSlugFromUrl } from '../utils'


const { Content, Footer } = Layout

const PagesRoutes = ({
  topMenu,
}) => {
  if (topMenu.length > 0) {
    return (
      <div>
        {topMenu.map(menu => {
          const slug = getSlugFromUrl(menu.url)

          return slug === 'home' ?
            (
              <div key={menu.objectId}>
                <Route exact path="/" component={() => <Home pageId={menu.objectId} />} />
                <Route path={`/${slug}`} component={() => <Home pageId={menu.objectId} />} />
              </div>
            ) : <Route key={menu.objectId} path={`/${slug}`} component={() => <PageTemplate pageId={menu.objectId} />} />
        })}
      </div>
    )
  }

  return <Route exact path="/" component={Home} />
}

PagesRoutes.propTypes = {
  topMenu: array.isRequired,
}

class Root extends PureComponent {
  static propTypes = {
    store: object.isRequired,
    history: object.isRequired,
  }

  state = {
    topMenu: [],
  }

  componentDidMount() {
    const { store } = this.props

    store.dispatch(fetchSiteInfo())
    store.dispatch(fetchTopMenu())
      .then(({ response }) => {
        if (response) {
          this.setState({
            topMenu: response,
          })
        }
      })
  }

  render() {
    const { store, history } = this.props
    const { topMenu } = this.state

    return (
      <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <Layout className="layout">
            <Header />
            <Content>
              <PagesRoutes topMenu={topMenu} />
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
