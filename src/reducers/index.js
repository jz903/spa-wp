import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { message } from 'antd'
import { merge } from 'lodash'

import { FETCH_SITE_INFO, FETCH_TOP_MENU, UPDATE_TOP_MENU_VISIBLE } from '../constants/actionTypes'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = {
  pages: {},
  posts: {},
  media: {},
}, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

const site = (
  state = {
    topMenu: [],
  },
  { type, response = {}, visible },
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
    case UPDATE_TOP_MENU_VISIBLE:
      return {
        ...state,
        topMenuVisible: visible,
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
  const { suppressError, error, success, isLoading = false } = action

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
