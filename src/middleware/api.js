import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import fetch from 'isomorphic-fetch'

import { API_URL } from '../constants/urls'
import { isBrowser, toQueryString } from '../utils'

const defaultHTTPHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
// Fetches an API response.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = ({ endpoint, method, payload, options = {} }, schema) => {
  const query = toQueryString(options)
  const apiUrl = isBrowser ? API_URL.replace('http:', '') : API_URL
  const url = `${apiUrl}${endpoint}${query ? '?' : ''}${query}`
  const config = {
    headers: defaultHTTPHeaders,
    method: method || 'GET',
    body: JSON.stringify(payload),
    credentials: 'include', // send a request with credentials included, send cookies to Passport to confirm session
  }

  if (config.method === 'GET' || config.method === 'DELETE') {
    config.body = undefined
  }

  return fetch(url, config)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        const camelizedJson = camelizeKeys(
          json,
          // if the key is all upperCase convert it to lowercase
          (key, convert) => (/^[A-Z0-9_]+$/.test(key) ? key.toLowerCase() : convert(key)),
        )

        const total = response.headers.get('X-WP-Total')
        const pages = response.headers.get('X-WP-TotalPages')

        return schema ? {
          meta: {
            total,
            pages,
          },
          data: {
            ...normalize(camelizedJson, schema),
          },
        } : {
          data: camelizedJson,
        }
      }),
    )
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, type, suppressError } = callAPI
  const types = [
    type,
    `${type}_SUCCESS`,
    `${type}_FAILURE`,
  ]

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType, isLoading: true }))

  return callApi(callAPI, schema).then(
    response => next(actionWith({
      response: response.data,
      type: successType,
      meta: response.meta,
      success: response.success,
      isLoading: false,
    })),
    error => next(actionWith({
      suppressError,
      type: failureType,
      error: error.message || 'Something bad happened',
      isLoading: false,
    })),
  )
}
