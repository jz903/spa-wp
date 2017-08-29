export const toQueryString = paramsObj =>
  Object
    .keys(paramsObj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObj[key])}`)
    .join('&')

export default {
  toQueryString,
}
