import { CALL_API } from '../middleware/api'
import * as actionTypes from '../constants/actionTypes'
import { API_ROUTES } from '../constants/urls'

export const fetchTopMenu = (options = {}) => ({ // eslint-disable-line
  [CALL_API]: {
    type: actionTypes.FETCH_TOP_MENU,
    endpoint: `${API_ROUTES.menu}/menu-locations/top`,
    options: {
      ...options,
    },
  },
})
