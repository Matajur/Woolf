import React from "react";
import css from "./Subtitle.module.css";

import { clsx } from "clsx";

const Subtitle = ({ children, className = "" }) => {
  return <p className={clsx(css.subtitle, className)}>{children}</p>;
};

export default Subtitle;
