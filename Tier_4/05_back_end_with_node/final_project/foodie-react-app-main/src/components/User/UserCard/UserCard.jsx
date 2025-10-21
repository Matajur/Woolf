import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowersThunk, getFollowingThunk, addToFollowingThunk, removeFromFollowingThunk } from '../../../store/auth/operations';
import css from './UserCard.module.css';
import placeholderImage from 'images/avatar/default_avatar.jpg';
import { Link } from 'react-router-dom';
import Icon from '../../UI/Icon/Icon';
import Btn from '../../UI/Btn/Btn';

const UserCard = ({ user, tab }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(state => state.auth);
  const { id, name, avatar, totalRecipes, following, ownedRecipes } = user;

  const handleFollow = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (tab === 'following' || following == 1) {
        await dispatch(removeFromFollowingThunk(id)).unwrap();
      } else {
        await dispatch(addToFollowingThunk(id)).unwrap();
      }
      if (tab === 'followers') {
        dispatch(getFollowersThunk({ id: currentUser.id }));
      } else if (tab === 'following') {
        dispatch(getFollowingThunk({ id: currentUser.id }));
      }
    } catch (error) {
      console.error('Failed to follow/unfollow user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.userCardWrapper} id={id}>
      <div className={css.userCard}>
        <Link to={`/user/${id}?tab=recipes`} title="View User">
          <img src={avatar || placeholderImage} alt={name} className={css.userCard__avatar} />
        </Link>
        <div className={css.userCard_actions}>
          <div className={css.userCard_info}>
            <span className={css.userCard__name}>{name || 'User'}</span>
            <span className={css.userCard__recipesCount}>Own recipes: {totalRecipes}</span>
          </div>
          <Btn variant="outlined" className={css.userCard__followBtn} onClick={handleFollow} disabled={loading}>
            {(following == 1 && tab === 'followers') || tab === 'following' ? 'Following' : 'Follow'}
          </Btn>
        </div>
      </div>
      <ul className={css.userCardRecipes}>
        {ownedRecipes?.map(recipe => (
          <li key={recipe.id} className={css.userCardRecipes__item}>
            <Link to={`/recipe/${recipe.id}`} className={css.linkImage} title="View Recipe">
              <img src={recipe.thumb} alt={`Recipe ${recipe.id}`} className={css.userCardRecipes__thumb} />
            </Link>
          </li>
        ))}
      </ul>
      <Link to={`/user/${id}?tab=recipes`} className={css.userCard__link} title="View User">
        <Icon name="icon-arrow-up-right" size="18" />
      </Link>
    </div>
  );
};

export default UserCard;
