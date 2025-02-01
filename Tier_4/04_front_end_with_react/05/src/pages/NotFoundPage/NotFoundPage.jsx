import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css"

const NotFoundPage = () => (
  <div>
    <h1 className={styles.pageHeader}>404 - Page Not Found</h1>
    <Link to="/">Go back to Home page</Link>
  </div>
);

export default NotFoundPage;
