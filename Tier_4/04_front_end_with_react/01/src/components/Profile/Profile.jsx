import styles from "./Profile.module.css";

const Profile = ({ name, tag, location, image, stats }) => (
  <div className={styles.userCard}>
    <div>
      <img src={image} alt="User avatar" />
      <p>{name}</p>
      <p>@{tag}</p>
      <p>{location}</p>
    </div>

    <ul className={styles.statsList}>
      <li className={styles.statsItem}>
        <span>Followers</span>
        <span>{stats.followers}</span>
      </li>
      <li className={styles.statsItem}>
        <span>Views</span>
        <span>{stats.views}</span>
      </li>
      <li className={styles.statsItem}>
        <span>Likes</span>
        <span>{stats.likes}</span>
      </li>
    </ul>
  </div>
);

export default Profile;
