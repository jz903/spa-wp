import { createSelector } from 'reselect'
import { camelizeKeys } from 'humps'

const menuId = (state, ownProps) => ownProps.menuId
const menusSelector = state => state.entities.menus

export const getMenuDetail = createSelector(
  menuId,
  menusSelector,
  (id, menus) => ({
    ...menus[id],
  }),
)

const pageId = (state, id) => id
const pagesSelector = state => state.entities.pages

export const getPageDetail = createSelector(
  pageId,
  pagesSelector,
  (id, pages) => ({
    ...pages[id],
  }),
)

const featuredMediaId = createSelector(
  pageId,
  pagesSelector,
  (id, pages) => pages[id] && pages[id].featuredMedia,
)
const mediaSelector = state => state.entities.media

export const getFeaturedMedia = createSelector(
  featuredMediaId,
  mediaSelector,
  (id, media) => ({
    ...media[id],
  }),
)

const categoryId = (state, id) => id

export const filteredMediaByCategory = createSelector(
  categoryId,
  mediaSelector,
  (id, media) => Object.keys(media).map(key =>
    media[key].categories.indexOf(id) > -1 && {
      ...media[key],
    },
  ),
)

export const getPageContentByCatId = createSelector(
  categoryId,
  pagesSelector,
  (catId, pages) =>
    camelizeKeys(
      Object.keys(pages)
        .filter(key => pages[key].categories.indexOf(catId) > -1)
        .reduce((obj, id) => ({
          ...obj,
          [pages[id].slug]: {
            ...pages[id],
          },
        }), {}),
    ),
)
