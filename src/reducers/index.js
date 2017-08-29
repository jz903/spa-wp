import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { message } from 'antd'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = {
  menus: {},
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
  entities,
  system,
  router: routerReducer,
})

export default rootReducer
