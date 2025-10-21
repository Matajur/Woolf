import css from './RecipeDetailPage.module.css';
import PathInfoElement from '../../components/PathInfoElement/PathInfoElement';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectSingleRecipe } from '../../store/recipes/selectors';
import { addRecipeToFavoriteThunk, getRecipeByIdThunk, removeRecipeFromFavoriteThunk } from '../../store/recipes/operations';
import { selectIsLoggedIn } from '../../store/auth/selectors';
import { AppLoader } from '../../components/UI';
import { setModalLoginOpen } from '../../store/modal/operations';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(selectSingleRecipe);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectLoading);

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
    dispatch(getRecipeByIdThunk(id));
    window.scrollTo(0,0);
  }, [id, isLoggedIn]);


  return (
    <div className={css.main}>
      {isLoading && <AppLoader />}
      <PathInfoElement activePath={recipe?.title} />
      <RecipeInfo recipe={recipe} isLoggedIn={isLoggedIn} onChangeFavorite={handleFavorite} />
      <PopularRecipes isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default RecipeDetailPage;
