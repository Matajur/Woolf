import React from 'react';
import css from './RecipeIngredients.module.css';
import { X } from 'lucide-react';

export default function RecipeIngredients({ ingredients, onRemove, hideTitle }) {
  return (
    <div className={css.card}>
      {!hideTitle && <h2 className={css.title}>Ingredients</h2>}
      <div className={css.items}>
        {ingredients?.map(ingredient => (
          <div key={ingredient?.id} className={css.item}>
            <div className={css.imgContainer}>
              <img className={css.img} src={ingredient?.img} alt="" />
            </div>

            <div className={css.itemContent}>
              <span className={css.name} title={ingredient?.name}>
                {ingredient?.name}
              </span>
              <span className={css.amount} title={ingredient?.measure}>
                {ingredient?.measure}
              </span>
            </div>
            {onRemove && (
              <button className={css.deleteBtn} onClick={() => onRemove(ingredient.id)}>
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
