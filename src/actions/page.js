import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import * as actionTypes from '../constants/actionTypes'
import { API_ROUTES } from '../constants/urls'

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchPages = options => ({
  [CALL_API]: {
    type: actionTypes.FETCH_PAGES,
    endpoint: `${API_ROUTES.basic}/pages`,
    schema: Schemas.PAGE_ARRAY,
    options,
  },
})

export const fetchSinglePage = (id, options) => ({
  [CALL_API]: {
    type: actionTypes.FETCH_SINGLE_PAGE,
    endpoint: `${API_ROUTES.basic}/pages/${id}`,
    schema: Schemas.PAGE,
    options,
  },
})
