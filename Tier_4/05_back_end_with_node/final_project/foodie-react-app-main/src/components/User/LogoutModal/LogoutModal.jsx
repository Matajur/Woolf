import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from 'store/auth/operations';
import css from './LogoutModal.module.css';

const LogoutModal = ({ onCancel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className={css.modalContent}>
      <h2 className={css.title}>LOG OUT</h2>
      <p className={css.description}>You can always log back in at my time.</p>
      <button onClick={handleLogout} className={css.logout}>
        LOGOUT
      </button>
      <button onClick={onCancel} className={css.cancel}>
        CANCEL
      </button>
    </div>
  );
};

export default LogoutModal;
