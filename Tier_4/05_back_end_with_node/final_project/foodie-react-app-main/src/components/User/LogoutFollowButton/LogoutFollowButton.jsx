import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToFollowingThunk, removeFromFollowingThunk } from 'store/auth/operations';
import { updateFollowStatus } from 'store/auth/slice';
import { Modal } from 'components/UI';
import { LogoutModal } from 'components/User';
import css from './LogoutFollowButton.module.css';

const LogoutFollowButton = ({ isOwnProfile, isFollowing, targetUserId }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFollowToggle = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await dispatch(removeFromFollowingThunk(targetUserId)).unwrap();
        dispatch(updateFollowStatus({ userId: targetUserId, isFollowing: false }));
      } else {
        await dispatch(addToFollowingThunk(targetUserId)).unwrap();
        dispatch(updateFollowStatus({ userId: targetUserId, isFollowing: true }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isOwnProfile) {
    return (
      <>
        <button className={css.userButton} onClick={() => setModalOpen(true)}>
          LOG OUT
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <LogoutModal onCancel={() => setModalOpen(false)} />
        </Modal>
      </>
    );
  }

  return (
    <button className={css.userButton} onClick={handleFollowToggle} disabled={loading}>
      {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
    </button>
  );
};

export default LogoutFollowButton;
