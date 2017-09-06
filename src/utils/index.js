export const toQueryString = paramsObj =>
  Object
    .keys(paramsObj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObj[key])}`)
    .join('&')

export const getSlugFromUrl = url => url.match(/[^/]*(?=(\/)?$)/)[0]
