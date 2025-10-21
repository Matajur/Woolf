import React from "react";
import { Link } from "react-router-dom";
import styles from "./PathInfo.module.css";

const PathInfo = ({ pages }) => {
  return (
    <nav className={styles.breadcrumb}>
      {pages.map((page, index) => (
        <span key={index} className={styles.breadcrumbItem}>
          {index !== pages.length - 1 ? (
            <Link to={page.path} className={styles.breadcrumbLink}>
              {page.name}
            </Link>
          ) : (
            <span className={styles.current}>{page.name}</span>
          )}
          {index !== pages.length - 1 && (
            <span className={styles.separator}>/</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default PathInfo;
