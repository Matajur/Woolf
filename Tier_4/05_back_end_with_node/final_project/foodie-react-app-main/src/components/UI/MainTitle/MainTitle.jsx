import React from "react";
import css from "./MainTitle.module.css";

import { clsx } from "clsx";

const MainTitle = ({ children, className = "" }) => {
  return <h2 className={clsx(css.title, className)}>{children}</h2>;
};

export default MainTitle;
