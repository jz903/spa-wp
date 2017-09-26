import { CALL_API } from '../middleware/api'
import * as actionTypes from '../constants/actionTypes'
import { API_ROUTES } from '../constants/urls'

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const submitComment = (options = {}) => ({ // eslint-disable-line
  [CALL_API]: {
    type: actionTypes.SUBMIT_COMMENT,
    endpoint: `${API_ROUTES.basic}/comments`,
    method: 'POST',
    options,
  },
})
