import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import * as actionTypes from '../constants/actionTypes'

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchAllMenus = () => ({
  [CALL_API]: {
    type: actionTypes.FETCH_ALL_MENUS,
    endpoint: '/menus',
    schema: Schemas.MENU_ARRAY,
  },
})

export const fetchMenu = id => ({
  [CALL_API]: {
    type: actionTypes.FETCH_MENU,
    endpoint: `/menus/${id}`,
    schema: Schemas.MENU,
  },
})
