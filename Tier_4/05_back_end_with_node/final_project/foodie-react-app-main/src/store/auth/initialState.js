export const initialState = {
  currentUser: {},
  fullUserDetails: {},
  followers: [],
  following: [],
  pagination: {
    page: 1,
    limit: 5,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};
