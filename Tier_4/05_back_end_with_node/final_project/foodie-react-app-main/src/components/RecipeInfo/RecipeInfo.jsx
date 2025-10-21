import React from 'react';
import css from './RecipeInfo.module.css';
import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipePreparation from '../RecipePreparation/RecipePreparation';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipeToFavoriteThunk, removeRecipeFromFavoriteThunk } from '../../store/recipes/operations';

export default function RecipeInfo({ recipe, isLoggedIn, onChangeFavorite }) {
  const dispatch = useDispatch();

  return (
    <div className={css.card}>
      <img className={css.recipeImage} src={recipe?.thumb} alt="" />
      <div className={css.content}>
        <RecipeMainInfo recipe={recipe} isLoggedIn={isLoggedIn} />
        <RecipeIngredients ingredients={recipe?.ingredients} />
        <RecipePreparation id={recipe?.id} instructions={recipe?.instructions} isFavorite={recipe?.isFavorite} onChangeFavorite={onChangeFavorite} />
      </div>
    </div>
  );
}
