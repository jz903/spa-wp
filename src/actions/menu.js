import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import * as actionTypes from '../constants/actionTypes'
import { API_ROUTES } from '../constants/urls'

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchMenus = options => ({
  [CALL_API]: {
    type: actionTypes.FETCH_MENUS,
    endpoint: `${API_ROUTES.menu}/menus`,
    schema: Schemas.MENU_ARRAY,
    options,
  },
})

export const fetchSingleMenu = (id, options) => ({
  [CALL_API]: {
    type: actionTypes.FETCH_SINGLE_MENU,
    endpoint: `${API_ROUTES.menu}/menus/${id}`,
    schema: Schemas.MENU,
    options,
  },
})
