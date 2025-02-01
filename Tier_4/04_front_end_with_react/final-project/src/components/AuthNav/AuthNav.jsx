import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./AuthNav.module.css";

const generateClassNames = ({ isActive }) => {
  return clsx(isActive && styles.isActive);
};

export const AuthNav = () => {
  return (
    <ul className={styles.authList}>
      <li>
        <NavLink className={generateClassNames} to="/register">
          Register
        </NavLink>
      </li>
      <li>
        <NavLink className={generateClassNames} to="/login">
          Log In
        </NavLink>
      </li>
    </ul>
  );
};
