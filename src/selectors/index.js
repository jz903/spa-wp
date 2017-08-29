import { createSelector } from 'reselect'

const pageId = (state, ownProps) => ownProps.pageId
const pageSelector = state => state.entities.pages

export const getPageDetail = createSelector(
  pageId,
  pageSelector,
  (id, pages) => ({
    ...pages[id],
  }),
)

const featuredMediaId = createSelector(
  pageId,
  pageSelector,
  (id, pages) => pages[id].featuredMedia,
)
const mediaSelector = state => state.entities.media

export const getFeaturedMedia = createSelector(
  featuredMediaId,
  mediaSelector,
  (id, media) => ({
    ...media[id],
  }),
)
