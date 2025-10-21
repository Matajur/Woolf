import styles from "./Container.module.css";

const Container = ({ children, className, dataTheme }) => {
  return (
    <div className={`${styles.container} ${className || ""}`} data-theme={dataTheme || ""}>{children}</div>
  );
};

export default Container;
