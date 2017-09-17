import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import api from '../middleware/api'
import { isBrowser } from '../utils'

const composeEnhancers = (isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const isDev = process.env.NODE_ENV === 'development'
const preloadedState = isBrowser ? window.__PRELOADED_STATE__ : {}
const middlewares = [thunk, api]

if (isDev) {
  middlewares.push(createLogger())
}

const configureStore = history => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), ...middlewares),
    ),
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
