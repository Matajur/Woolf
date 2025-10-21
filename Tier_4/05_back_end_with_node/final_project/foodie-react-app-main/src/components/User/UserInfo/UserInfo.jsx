import UploadUserAvatar from '../../UploadUserAvatar/UploadUserAvatar.jsx';
import css from './UserInfo.module.css';
import defaultAvatar from 'images/avatar/default_avatar.jpg';

const UserInfo = ({ user, isOwnProfile }) => {
  if (!user?.id) return null;

  const { avatar, name, email, totalFavoriteRecipes = 0, totalFollowers = 0, totalFollowing = 0, totalRecipes = 0 } = user;
  const realAvatar = avatar ? avatar : defaultAvatar;

  return (
    <div className={css.userInfo}>
      {isOwnProfile ? <UploadUserAvatar avatar={realAvatar} /> : <img src={realAvatar} alt="User Avatar" className={css.avatar} />}
      <p className={css.name}>{name}</p>
      <ul className={css.stats}>
        <li className={css.statsItem}>
          Email: <strong className={css.userStats}>{email}</strong>
        </li>
        <li className={css.statsItem}>
          Added recipes: <strong className={css.userStats}>{totalRecipes}</strong>
        </li>
        {isOwnProfile && (
          <>
            <li className={css.statsItem}>
              Favorites: <strong className={css.userStats}>{totalFavoriteRecipes}</strong>
            </li>
            <li className={css.statsItem}>
              Followers: <strong className={css.userStats}>{totalFollowers}</strong>
            </li>
          </>
        )}
        <li className={css.statsItem}>
          Following: <strong className={css.userStats}>{totalFollowing}</strong>
        </li>
      </ul>
    </div>
  );
};

export default UserInfo;
