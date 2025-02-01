import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "reduxstore";
import clsx from "clsx";

import styles from "./Navigation.module.css";

const generateClassNames = ({ isActive }) => {
  return clsx(isActive && styles.isActive);
};

export const Navigation = () => {
  const isLoggedIn = useSelector(selectLoggedIn);
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink className={generateClassNames} to="/">
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink className={generateClassNames} to="/contacts">
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
