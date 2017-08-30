import { createSelector } from 'reselect'

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

export const getPageAcf = createSelector(
  getPageDetail,
  page => ({
    ...page.acf,
  }),
)

export const getPageSection = createSelector(
  pageId,
  getPageAcf,
  (id, acf) => Object.keys(acf)
    .filter(key => key.indexOf('Section') > -1)
    .reduce((obj, key) => ({
      ...obj,
      [key]: acf[key],
    }), {}),
)
