import clsx from "clsx";
import styles from "./Section.module.css";

const Section = ({ children, className = "", ...rest }) => {
  return (
    <section className={clsx(styles.section, className)} {...rest}>
      {children}
    </section>
  );
};

export default Section;
