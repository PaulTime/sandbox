import { createSelector } from 'reselect'

const selectAuth = state => state.auth;

export const selectIsAuthorized = createSelector(
  selectAuth,
  (auth = {}) => auth.isAuthorized,
);
