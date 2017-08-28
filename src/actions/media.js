import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import * as actionTypes from '../constants/actionTypes'

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchAllMedia = () => ({
  [CALL_API]: {
    type: actionTypes.FETCH_MEDIA,
    endpoint: '/media',
    schema: Schemas.MEDIA_ARRAY,
  },
})

export const fetchMedia = id => ({
  [CALL_API]: {
    type: actionTypes.FETCH_MEDIA,
    endpoint: `/media/${id}`,
    schema: Schemas.MEDIA,
    id,
  },
})
