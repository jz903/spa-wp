import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { message } from 'antd'

import { FETCH_SITE_INFO, FETCH_TOP_MENU } from '../constants/actionTypes'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = {
  pages: {},
  posts: {},
  media: {},
}, action) => {
  if (action.response && action.response.entities) {
    return {
      ...state,
      ...action.response.entities,
    }
  }

  return state
}

const site = (
  state = {
    topMenu: [],
  },
  { type, response = {} },
) => {
  const { name, description, url, home } = response

  switch (type) {
    case `${FETCH_SITE_INFO}_SUCCESS`:
      return {
        ...state,
        name,
        description,
        url,
        home,
      }
    case `${FETCH_TOP_MENU}_SUCCESS`:
      return {
        ...state,
        topMenu: response,
      }
    default:
      return state
  }
}

const system = (
  state = {
    isLoading: false,
  },
  action,
) => {
  const { suppressError, error, success, isLoading } = action

  if (error && !suppressError) {
    message.error(error)
  }

  if (success) {
    message.success(success)
  }

  return {
    ...state,
    isLoading,
  }
}

const rootReducer = combineReducers({
  site,
  entities,
  system,
  router: routerReducer,
})

export default rootReducer
