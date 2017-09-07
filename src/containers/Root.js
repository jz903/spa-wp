import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import { fetchSiteInfo } from '../actions/site'
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
          <App topMenu={topMenu} />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root
