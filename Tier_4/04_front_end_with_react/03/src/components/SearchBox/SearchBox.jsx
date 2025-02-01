import styles from "./SearchBox.module.css";

export const SearchBox = ({ setFilter }) => {
  const handleChange = (e) => {
    setFilter(e.target.value);
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
