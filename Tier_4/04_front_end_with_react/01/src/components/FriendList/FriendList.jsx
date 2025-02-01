import FriendListItem from "../FriendListItem/FriendListItem.jsx";
import styles from "./FriendList.module.css";

const FriendList = ({ friends }) => (
  <ul className={styles.friendsList}>
    {friends.map((friend) => (
      <li className={styles.friendCard} key={friend.id}>
        <FriendListItem
          name={friend.name}
          avatar={friend.avatar}
          isOnline={friend.isOnline}
        />
      </li>
    ))}
  </ul>
);

export default FriendList;
