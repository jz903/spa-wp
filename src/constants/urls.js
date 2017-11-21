export const BASE_URL = process.env.REACT_APP_WP_URL || 'http://47.95.217.134:8083'
export const API_URL = `${BASE_URL}/wp-json`
export const API_ROUTES = {
  basic: '/wp/v2',
  menu: '/wp-api-menus/v2',
}
