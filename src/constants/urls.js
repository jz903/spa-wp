export const BASE_URL = process.env.WP_URL || 'http://localhost:8888'
export const API_URL = `${BASE_URL}/wp-json`
export const API_ROUTES = {
  basic: '/wp/v2',
  menu: '/wp-api-menus/v2',
}
