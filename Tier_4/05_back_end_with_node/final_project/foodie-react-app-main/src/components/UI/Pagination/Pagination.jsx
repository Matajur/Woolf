import React from "react";
import css from "./Pagination.module.css";
import clsx from "clsx";

const Pagination = ({ total = 3, current = 1, onChange = () => {},  }) => {
  const getPagesToShow = () => {
    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 2) return [1, 2, 3];
    if (current >= total - 1) return [total - 2, total - 1, total];
    return [current - 1, current, current + 1];
  };
  return (
    <div className={css.pagination}>
      {getPagesToShow().map(page => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={clsx(css.pageBtn, {
            [css.active]: page === current,
          })}
          disabled={current === page}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
