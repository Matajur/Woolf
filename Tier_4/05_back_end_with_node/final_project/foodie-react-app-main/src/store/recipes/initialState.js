export const initialState = {
  recipes: [],
  popularRecipes: [],
  singleRecipe: {},
  pagination: {
    page: 1,
    limit: 5,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  categories: [],
  areas: [],
  total: 0,
  isLoading: false,
  error: null,
  appendMode: false,
};
