import { openLoginModal, closeLoginModal, openSignupModal, closeSignupModal } from './slice';

export const setModalLoginOpen = isOpen => {
  return dispatch => {
    if (isOpen) {
      dispatch(openLoginModal());
    } else {
      dispatch(closeLoginModal());
    }
  };
};

export const setModalSignupOpen = isOpen => {
  return dispatch => {
    if (isOpen) {
      dispatch(openSignupModal());
    } else {
      dispatch(closeSignupModal());
    }
  };
};
