import { createSelector } from 'reselect'

const currentUserSelector = state => state.user
const usersSelector = state => state.entities.users

export const getCurrentUser = createSelector(
  currentUserSelector,
  usersSelector,
  (currUser, users) => ({
    id: currUser.id,
    ...users[currUser.id],
  }),
)

const pageId = (state, ownProps) => ownProps.pageId
const pageSelector = state => state.entities.pages

export const getCurrentPage = createSelector(
  pageId,
  pageSelector,
  (id, pages) => ({
    ...pages[id],
  }),
)
