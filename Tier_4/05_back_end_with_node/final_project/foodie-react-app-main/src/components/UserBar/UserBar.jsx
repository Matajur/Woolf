import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './UserBar.module.css';
import { clsx } from 'clsx';

import LoginModal from '../LoginModal/LoginModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Btn from '../UI/Btn/Btn';
import { logoutThunk } from '../../store/auth/operations';
import { setModalLoginOpen } from '../../store/modal/operations';
import { Avatar, Icon } from '../UI/index.js';
import useOutsideClick from '../../hooks/useOutsideClick.jsx';

const UserBar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const isLoginModalOpen = useSelector(state => state.modal.isLoginModalOpen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLoginModalClose = () => {
    dispatch(setModalLoginOpen(false));
  };

  const handleLogout = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(logoutThunk());
    setIsConfirmModalOpen(false);
  };

  const cancelLogout = () => {
    setIsConfirmModalOpen(false);
  };

  const handleSwitchToRegister = () => {
    dispatch(setModalLoginOpen(false));
    dispatch(setModalSignupOpen(true));
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  return (
    <div className={css.userWrapper} ref={menuRef}>
      <Avatar variant="menu" src={currentUser?.avatarURL} placeholder={currentUser?.name} onClick={toggleMenu}>
        <span>{currentUser?.name || 'User'}</span>
        <Icon className={css.arrowIcon} name={isMenuOpen ? 'icon-chevron-up' : 'icon-chevron-down'}></Icon>
      </Avatar>
      <div className={clsx(css.menu, isMenuOpen && css.menuVisible)}>
        <Link to={`/user/${currentUser?.id}`} className={css.profileLink}>
          Profile
        </Link>
        <Btn variant="logoutInHead" onClick={handleLogout}>
          Log Out <Icon name="icon-arrow-up-right" className={css.logoutIcon} />
        </Btn>
      </div>
      {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} onSwitchToRegister={handleSwitchToRegister} />}
      {isConfirmModalOpen && <ConfirmModal onConfirm={confirmLogout} onCancel={cancelLogout} message="Are you logging out?" />}
    </div>
  );
};

export default UserBar;
