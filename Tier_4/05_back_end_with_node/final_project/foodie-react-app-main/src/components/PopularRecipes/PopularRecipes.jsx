import React, { useEffect } from 'react';
import css from './PopularRecipes.module.css';
import PopularRecipeCard from '../PopularRecipeCard/PopularRecipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipeToFavoriteThunk, getPopularRecipesThunk, removeRecipeFromFavoriteThunk } from '../../store/recipes/operations';
import { selectPopularRecipes } from '../../store/recipes/selectors';
import { setModalLoginOpen } from '../../store/modal/operations';
import { useNavigate } from 'react-router-dom';
export default function PopularRecipes({ isLoggedIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipes = useSelector(selectPopularRecipes);

  const handleFavorite = (id, isFavorite) => {
    if (!isLoggedIn) {
      dispatch(setModalLoginOpen(true));
    } else {
      if (isFavorite) {
        dispatch(removeRecipeFromFavoriteThunk(id));
      } else {
        dispatch(addRecipeToFavoriteThunk(id));
      }
    }
  };

  useEffect(() => {
    dispatch(getPopularRecipesThunk());
  }, [isLoggedIn]);

  return (
    <section className={css.card}>
      <h2 className={css.title}>Popular recipes</h2>
      <div className={css.items}>
        {recipes.map(recipe => (
          <PopularRecipeCard key={recipe?.id} recipe={recipe} onChangeFavorite={handleFavorite} isLoggedIn={isLoggedIn} />
        ))}
      </div>
    </section>
  );
}
