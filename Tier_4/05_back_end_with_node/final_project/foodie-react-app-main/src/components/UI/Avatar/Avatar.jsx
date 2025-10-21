import clsx from "clsx";
import React from "react";
import css from "./Avatar.module.css";

const Avatar = ({
  variant = "wrapper",
  src,
  srcSet = null,
  placeholder = "",
  children,
  className = "",
  ...props
}) => {
  const firstLetter = placeholder?.trim().charAt(0).toUpperCase();

  return (
    <div className={clsx(css[variant], className)} {...props}>
      {src ? (
        <img
          src={src}
          srcSet={srcSet || undefined}
          alt="avatar"
          className={css.avatar}
        />
      ) : (
        <div className={clsx(css.avatar, css.placeholder)}>{firstLetter}</div>
      )}
      <div className={css.placeholder}>{children}</div>
    </div>
  );
};

export default Avatar;
