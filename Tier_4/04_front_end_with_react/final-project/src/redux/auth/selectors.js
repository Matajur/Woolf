export const selectUser = (state) => state.auth.user;
export const selectLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCredentialsError = (state) => state.auth.error;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
