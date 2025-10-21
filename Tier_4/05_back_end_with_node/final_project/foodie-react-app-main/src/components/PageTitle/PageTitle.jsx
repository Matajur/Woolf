import React from "react";
import css from "./PageTitle.module.css";

import { clsx } from "clsx";
import { MainTitle, Subtitle } from "components/UI";

const PageTitle = ({ title, subtitle, className = "" }) => {
  return (
    <div className={clsx(css.wrapper, className)}>
      <MainTitle>{title}</MainTitle>
      <Subtitle>{subtitle}</Subtitle>
    </div>
  );
};

export default PageTitle;
