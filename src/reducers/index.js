import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { message } from 'antd'

import { FETCH_SITE_INFO, FETCH_TOP_MENU, UPDATE_TOP_MENU_VISIBLE, FETCH_POSTS } from '../constants/actionTypes'

// Updates an entity cache in response to any action with response.entities.
// Updates an entity cache in response to any action with response.entities.
const entities = (state = {
  pages: {},
  pagesIds: [],
  posts: {},
  postsIds: [],
  media: {},
  mediaIds: [],
}, action) => {
  if (action.response && action.response.entities) {
    const { result, key } = action.response
    let data = {
      ...action.response.entities[key],
    }
    let ids = [...result]

    if (typeof result === 'number') {
      if (ids.indexOf(result) < 0) {
        // add new
        ids = [result, ...state[`${key}Ids`]]
      } else {
        // edit
        ids = [...state[`${key}Ids`]]
      }

      data = {
        ...state[key],
        ...action.response.entities[key],
      }
    }

    return {
      ...state,
      [key]: data,
      [`${key}Ids`]: ids,
    }
  }

  return state
}

const site = (
  state = {
    topMenu: [],
    postsMeta: {
      current: 1,
      total: 0,
      pages: 0,
    },
  },
  { type, response = {}, meta, visible },
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
    case `${FETCH_POSTS}_SUCCESS`:
      return {
        ...state,
        postsMeta: {
          ...state.postsMeta,
          total: +meta.total,
          pages: +meta.pages,
        },
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
