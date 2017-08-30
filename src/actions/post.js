import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import * as actionTypes from '../constants/actionTypes'
import { API_ROUTES } from '../constants/urls'

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchPosts = options => ({
  [CALL_API]: {
    type: actionTypes.FETCH_POSTS,
    endpoint: `${API_ROUTES.basic}/posts`,
    schema: Schemas.POST_ARRAY,
    options,
  },
})

export const fetchSinglePost = (id, options) => ({
  [CALL_API]: {
    type: actionTypes.FETCH_SINGLE_POST,
    endpoint: `${API_ROUTES.basic}/posts/${id}`,
    schema: Schemas.POST,
    options,
  },
})
