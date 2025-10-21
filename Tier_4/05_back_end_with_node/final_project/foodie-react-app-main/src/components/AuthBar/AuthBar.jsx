import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from '../LoginModal/LoginModal';
import SignupModal from '../SignupModal/SignupModal';
import css from './AuthBar.module.css';
import { clsx } from 'clsx';
import Btn from '../UI/Btn/Btn';
import { setModalLoginOpen, setModalSignupOpen } from '../../store/modal/operations';

const AuthBar = () => {
  const dispatch = useDispatch();
  const isLoginModalOpen = useSelector(state => state.modal.isLoginModalOpen);
  const isSignupModalOpen = useSelector(state => state.modal.isSignupModalOpen);

  const handleLoginModalOpen = () => {
    dispatch(setModalLoginOpen(true));
    dispatch(setModalSignupOpen(false));
  };

  const handleSignupModalOpen = () => {
    dispatch(setModalLoginOpen(false));
    dispatch(setModalSignupOpen(true));
  };

  const handleModalClose = () => {
    dispatch(setModalLoginOpen(false));
    dispatch(setModalSignupOpen(false));
  };

  return (
    <div className={clsx('container', css.wrapper)}>
      <Btn variant="login" className={css.btn} onClick={handleLoginModalOpen}>
        Sign In
      </Btn>
      <Btn variant="register" className={css.btn} onClick={handleSignupModalOpen}>
        Sign Up
      </Btn>
      {isLoginModalOpen && <LoginModal onClose={handleModalClose} onSwitchToRegister={handleSignupModalOpen} />}
      {isSignupModalOpen && <SignupModal onClose={handleModalClose} onSwitchToLogin={handleLoginModalOpen} />}
    </div>
  );
};

export default AuthBar;
