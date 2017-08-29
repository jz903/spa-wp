import { schema } from 'normalizr'

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where pages and posts are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

export const menuSchema = new schema.Entity('menus', {}, {
  idAttribute: menu => menu.id,
})

export const pageSchema = new schema.Entity('pages', {}, {
  idAttribute: page => page.id,
})

export const postSchema = new schema.Entity('posts', {}, {
  idAttribute: post => post.id,
})

export const mediaSchema = new schema.Entity('media', {}, {
  idAttribute: media => media.id,
})

// Schemas for API responses.
export const Schemas = {
  MENU: menuSchema,
  MENU_ARRAY: [menuSchema],
  PAGE: pageSchema,
  PAGE_ARRAY: [pageSchema],
  POST: postSchema,
  POST_ARRAY: [postSchema],
  MEDIA: mediaSchema,
  MEDIA_ARRAY: [mediaSchema],
}
