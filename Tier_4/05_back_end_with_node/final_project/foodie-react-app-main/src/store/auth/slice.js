import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initialState.js';
import {
  addToFollowingThunk,
  currentUserThunk,
  getFollowersThunk,
  getFollowingThunk,
  getFullUserDetailsThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  removeFromFollowingThunk,
  updateAvatarThunk,
} from './operations.js';

const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cleanPagination: state => {
      state.pagination = { ...initialState.pagination };
    },
    cleanFollowers: state => {
      state.followers = [];
    },
    cleanFollowing: state => {
      state.following = [];
    },
    cleanFullUserDetails: state => {
      state.fullUserDetails = {};
    },
    updateFollowStatus: (state, action) => {
      if (state.fullUserDetails && state.fullUserDetails.id === action.payload.userId) {
        state.fullUserDetails.isFollowing = action.payload.isFollowing;
      }
    },
    forceLogout: () => initialState,
  },
  extraReducers: builder =>
    builder
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(getFullUserDetailsThunk.fulfilled, (state, { payload }) => {
        state.fullUserDetails = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateAvatarThunk.fulfilled, (state, { payload }) => {
        state.currentUser.avatarURL = payload.avatarURL;
        state.fullUserDetails.avatar = payload.avatarURL;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addToFollowingThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeFromFollowingThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFollowersThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.followers = payload?.followers ?? [];
        state.total = payload?.totalItem;
        state.pagination.page = payload.page;
        state.pagination.limit = payload.limit;
        state.pagination.totalPages = payload.totalPage;
        state.pagination.hasNextPage = payload.hasNextPage;
        state.pagination.hasPreviousPage = payload.hasPreviousPage;
      })
      .addCase(getFollowingThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.following = payload?.following ?? [];
        state.total = payload?.totalItem;
        state.pagination.page = payload?.page;
        state.pagination.limit = payload.limit;
        state.pagination.totalPages = payload.totalPage;
        state.pagination.hasNextPage = payload.hasNextPage;
        state.pagination.hasPreviousPage = payload.hasPreviousPage;
      })
      .addMatcher(isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled, currentUserThunk.fulfilled), (state, { payload }) => {
        state.token = payload.token;
        state.currentUser = payload.user;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          logoutThunk.pending,
          currentUserThunk.pending,
          getFullUserDetailsThunk.pending,
          updateAvatarThunk.pending,
          addToFollowingThunk.pending,
          removeFromFollowingThunk.pending,
          getFollowersThunk.pending,
          getFollowingThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          logoutThunk.rejected,
          currentUserThunk.rejected,
          getFullUserDetailsThunk.rejected,
          updateAvatarThunk.rejected,
          addToFollowingThunk.rejected,
          removeFromFollowingThunk.rejected,
          getFollowersThunk.rejected,
          getFollowingThunk.rejected
        ),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      ),
});

export const {
  cleanPagination,
  cleanFollowers,
  cleanFollowing,
  cleanFullUserDetails,
  forceLogout,
  updateFollowStatus,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
