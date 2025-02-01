import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "reduxstore";

import styles from "./UserMenu.module.css";

export const UserMenu = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.userMenu}>
      <p>Welcome, {user.name}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
