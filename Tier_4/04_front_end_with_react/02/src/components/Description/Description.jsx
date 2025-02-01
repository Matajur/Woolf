import styles from "./Description.module.css";

export const Description = () => {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.mainHeader}>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
    </div>
  );
};
