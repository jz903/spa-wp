export const isBrowser = (typeof window !== 'undefined')
export const toQueryString = paramsObj =>
  Object
    .keys(paramsObj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObj[key])}`)
    .join('&')

export const getSlugFromUrl = url => url.match(/[^/]*(?=(\/)?$)/)[0]

const addZero = num => (num < 10 ? `0${num}` : num)

export const formatDate = d => {
  const date = new Date(d)
  const year = date.getFullYear()
  const month = addZero(date.getMonth())
  const day = addZero(date.getDate())
  const hour = addZero(date.getHours())
  const min = addZero(date.getMinutes())

  return {
    date: `${year}-${month}-${day}`,
    time: `${hour}:${min}`,
  }
}
