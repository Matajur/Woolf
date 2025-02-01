import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./Navigation.module.css";

const generateClassNames = ({ isActive }) => {
  return clsx(isActive && styles.isActive);
};

export const Navigation = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink className={generateClassNames} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={generateClassNames} to="/movies">
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
