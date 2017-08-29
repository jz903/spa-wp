import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import * as actionTypes from '../constants/actionTypes'

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchAllPosts = () => ({
  [CALL_API]: {
    type: actionTypes.FETCH_ALL_POSTS,
    endpoint: '/posts',
    schema: Schemas.POST_ARRAY,
  },
})

export const fetchPost = id => ({
  [CALL_API]: {
    type: actionTypes.FETCH_POST,
    endpoint: `/posts/${id}`,
    schema: Schemas.POST,
  },
})
