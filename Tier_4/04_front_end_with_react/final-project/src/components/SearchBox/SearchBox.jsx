import { useDispatch } from "react-redux";

import { changeFilter } from "reduxstore";

import styles from "./SearchBox.module.css";

export const SearchBox = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="search">Find contacts by name</label>
      <input
        type="text"
        id="search"
        placeholder="Search contacts"
        onChange={handleChange}
        className={styles.box}
      />
    </div>
  );
};
