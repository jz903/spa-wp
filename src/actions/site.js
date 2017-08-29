import { CALL_API } from '../middleware/api'
import * as actionTypes from '../constants/actionTypes'

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchSiteInfo = () => ({
  [CALL_API]: {
    type: actionTypes.FETCH_SITE_INFO,
    endpoint: '/',
  },
})

export default {
  fetchSiteInfo,
}
