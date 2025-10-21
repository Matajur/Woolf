import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './RecipePreview.module.css';
import { Icon } from 'components/UI';
import { removeRecipeThunk, removeRecipeFromFavoriteThunk } from 'store/recipes/operations';
import { removeRecipeLocally } from 'store/recipes/slice';
import placeholderImage from 'images/recipe/placeholder-recipe.jpg';
import { useState } from 'react';
import clsx from 'clsx';

const RecipePreview = ({ data, tab }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id, thumb, title, description } = data;

  const isDeletable = ['my-recipes', 'favorites'].includes(tab);

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (tab === 'my-recipes') {
        await dispatch(removeRecipeThunk(id)).unwrap();
        dispatch(removeRecipeLocally(id));
      } else if (tab === 'favorites') {
        await dispatch(removeRecipeFromFavoriteThunk(id)).unwrap();
      }
    } catch (error) {
      console.error('Failed to remove recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.card}>
      <Link to={`/recipe/${id}`} className={css.linkImage} title="View Recipe">
        <img src={thumb || placeholderImage} alt={title} className={css.image} />
      </Link>
      <div className={css.content}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.description} title={description}>
          {description}
        </p>
      </div>
      <div className={css.actions}>
        <Link to={`/recipe/${id}`} className={css.link} title="View Recipe">
          <Icon name="icon-arrow-up-right" size="18" />
        </Link>
        {isDeletable && (
          <button className={clsx(css.link, css.delete)} onClick={handleDelete} disabled={loading} title="Delete Recipe">
            <Icon name="icon-trash" size="18" className={css.trashIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipePreview;
