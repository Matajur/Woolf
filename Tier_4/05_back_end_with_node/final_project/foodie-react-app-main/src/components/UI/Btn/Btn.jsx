import clsx from "clsx";
import css from "./Btn.module.css";

const Btn = ({
  variant = "main",
  className = "",
  children,
  onClick,
  disabled,
  type = "button",
  ...restProps
}) => {
  return (
    <button
      className={clsx(css[variant], className)}
      onClick={onClick}
      type={type} 
      {...restProps}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Btn;
