import { createSelector } from "@reduxjs/toolkit";

export const selectPopularRecipes = (state) => state.recipes.popularRecipes ?? [];
export const selectSingleRecipe = (state) => state.recipes.singleRecipe;
export const selectPagination = (state) => state.recipes.pagination;
export const selectLoading = (state) => state.recipes.isLoading;
export const selectError = (state) => state.recipes.error;
export const selectRecipes = (state) => state.recipes.recipes ?? [];
export const selectTotalRecipes = (state) => state.recipes.total;
export const selectCategories = (state) => state.recipes.categories ?? [];
const areasSelector = (state) => state.recipes.areas;
export const selectAreas = createSelector([areasSelector], (areas) =>
  (areas ?? [])
    .map((item) => ({
      ...item,
      value: item.id,
      label: item.name,
    }))
    .toSorted((a, b) => a.label.localeCompare(b.label, "en"))
);
const ingredientsSelector = (state) => state.recipes.ingredients;
export const selectIngredients = createSelector(
  [ingredientsSelector],
  (ingredients) =>
    (ingredients ?? [])
      .map((item) => ({
        ...item,
        value: item.id,
        label: item.name,
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label, "en"))
);
