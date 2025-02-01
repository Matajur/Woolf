import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div>
      <Oval
        className={styles.iconLoader}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
