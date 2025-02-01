import clsx from "clsx";
import styles from "./FriendListItem.module.css";

const FriendListItem = ({ name, avatar, isOnline }) => (
  <div>
    <img src={avatar} alt="Avatar" width="48" />
    <p>{name}</p>
    <p
      className={clsx(styles.status, {
        [styles.online]: isOnline,
      })}
    >
      {isOnline ? "Online" : "Offline"}
    </p>
  </div>
);

export default FriendListItem;
