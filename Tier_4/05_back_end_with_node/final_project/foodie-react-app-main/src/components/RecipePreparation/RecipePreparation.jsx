import React from 'react';
import css from './RecipePreparation.module.css';
export default function RecipePreparation({ id, instructions, isFavorite, onChangeFavorite }) {
  const paragraphs = instructions?.replace('\r\n\r\n','\r\n').split('\r\n').filter(t=>t!="");
  return (
    <div className={css.card}>
      <div className={css.preparation}>
        <h2 className={css.title}>Recipe Preparation</h2>
        <div className={css.contents}>
          {paragraphs?.map((para, index) => (
            <p key={index} className={css.content}>
              {para}
            </p>
          ))}
        </div>
      </div>
      <button
        className={css.button}
        onClick={() => {
          onChangeFavorite(id, isFavorite);
        }}
      >
        {isFavorite ? `REMOVE FROM FAVORITES` : `ADD TO FAVORITES`}
      </button>
    </div>
  );
}
