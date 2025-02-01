import { AuthNav, Navigation, UserMenu } from "components";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "reduxstore";

import styles from "./AppBar.module.css";

export const AppBar = () => {
  const isLoggedIn = useSelector(selectLoggedIn);
  return (
    <header className={styles.appBar}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
