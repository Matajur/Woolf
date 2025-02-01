import { useDispatch } from "react-redux";

import { changeFilter } from "reduxx/filtersSlice";

import styles from "./SearchBox.module.css";

export const SearchBox = () => {
  const dispatch = useDispatch();

  const handleChangeFilter = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="search">Find contacts by name</label>
      <input
        type="text"
        id="search"
        placeholder="Search contacts"
        onChange={handleChangeFilter}
        className={styles.box}
      />
    </div>
  );
};
