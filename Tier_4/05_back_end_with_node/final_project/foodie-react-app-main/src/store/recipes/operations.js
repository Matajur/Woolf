import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setToken } from '../../api/configApi.js';
import { API_ROUTES } from '../../api/constants/API_ROUTES.js';

export const fetchCategories = createAsyncThunk('recipes/fetchCatogories', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`/categories`);
    return response.data;
  } catch (e) {
    const backendMessage = e.response?.data?.message;
    return rejectWithValue(backendMessage || e.message);
  }
});

export const fetchAreas = createAsyncThunk('recipes/fetchAreas', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`/areas`);
    return response.data;
  } catch (e) {
    const backendMessage = e.response?.data?.message;
    return rejectWithValue(backendMessage || e.message);
  }
});

export const fetchIngredients = createAsyncThunk('recipes/fetchIngredients', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`/ingredients`);
    return response.data;
  } catch (e) {
    const backendMessage = e.response?.data?.message;
    return rejectWithValue(backendMessage || e.message);
  }
});

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (params, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  setToken(token);
  const query = new URLSearchParams(params).toString();
  try {
    const response = await api.get(`/recipes/?${query}`);
    return response.data;
  } catch (e) {
    const backendMessage = e.response?.data?.message;
    return rejectWithValue(backendMessage || e.message);
  }
});

export const getRecipeByIdThunk = createAsyncThunk('recipes/getById', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data } = await api.get(API_ROUTES.RECIPES.RECIPE_WITH_ID(id));
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getPopularRecipesThunk = createAsyncThunk('recipes/getPopularRecipes', async (limit = 4, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data } = await api.get(API_ROUTES.RECIPES.POPULAR, {
      params: { limit },
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addRecipeThunk = createAsyncThunk('recipes/addRecipe', async (body, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data } = await api.post(API_ROUTES.RECIPES.RECIPES, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.message);
  }
});

export const removeRecipeThunk = createAsyncThunk('recipes/removeRecipe', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data } = await api.delete(API_ROUTES.RECIPES.RECIPE_WITH_ID(id));
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getOwnRecipesThunk = createAsyncThunk('recipes/getUserOwnRecipes', async ({ id, page = 1, limit = 5 }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data } = await api.get(API_ROUTES.RECIPES.OWN_RECIPES(id), {
      params: {
        page,
        limit,
      },
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getFavoriteRecipesThunk = createAsyncThunk('recipes/getFavoriteRecipes', async ({ id, page = 1, limit = 5 }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data } = await api.get(API_ROUTES.RECIPES.FAVORITE(id), {
      params: {
        page,
        limit,
      },
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addRecipeToFavoriteThunk = createAsyncThunk('recipes/addToFavorite', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data } = await api.post(API_ROUTES.RECIPES.FAVORITE(id));
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const removeRecipeFromFavoriteThunk = createAsyncThunk('recipes/removeFromFavorite', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data } = await api.delete(API_ROUTES.RECIPES.FAVORITE(id));
    return { id };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
