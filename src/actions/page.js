import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import * as actionTypes from '../constants/actionTypes'

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchAllPages = () => ({
  [CALL_API]: {
    type: actionTypes.FETCH_ALL_PAGES,
    endpoint: '/pages',
    schema: Schemas.PAGE_ARRAY,
  },
})

export const fetchPage = id => ({
  [CALL_API]: {
    type: actionTypes.FETCH_PAGE,
    endpoint: `/pages/${id}`,
    schema: Schemas.PAGE,
  },
})
