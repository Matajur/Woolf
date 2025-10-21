import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isLoginModalOpen: false,
    isSignupModalOpen: false,
  },
  reducers: {
    openLoginModal: state => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: state => {
      state.isLoginModalOpen = false;
    },
    openSignupModal: state => {
      state.isSignupModalOpen = true;
    },
    closeSignupModal: state => {
      state.isSignupModalOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal, openSignupModal, closeSignupModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
