import { Icon } from "components/UI";
import css from "./Chip.module.css";
import clsx from "clsx";

const Chip = ({ icon, label, className = "", children }) => {
  return (
    <div className={clsx(css.chip, className)}>
      {children ? (
        children
      ) : (
        <>
          {!!icon && <Icon style={{ marginRight: 8 }} name={icon} size="20" />}
          {label}
        </>
      )}
    </div>
  );
};

export default Chip;
