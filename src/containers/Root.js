import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

import { fetchSiteInfo, updateTopMenuVisible } from '../actions/site'
import { fetchTopMenu } from '../actions/menu'
import App from './App'


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
    const { site } = store.getState()

    if (!site.name) {
      store.dispatch(fetchSiteInfo())
    }

    if (site.topMenu.length === 0) {
      store.dispatch(fetchTopMenu())
        .then(({ response }) => {
          if (response) {
            this.setState({
              topMenu: response,
            })
          }
        })
    } else {
      this.setState({ // eslint-disable-line
        topMenu: site.topMenu,
      })
    }
  }

  render() {
    const { store, history } = this.props
    const { topMenu } = this.state

    // When the route changes, clear Alerts.
    history.listen(() => {
      // hide top menu on mobile when route changes
      store.dispatch(updateTopMenuVisible(false))
    })

    return (
      <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <LocaleProvider locale={enUS}>
            <App topMenu={topMenu} />
          </LocaleProvider>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root
