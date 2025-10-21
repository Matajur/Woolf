import React, { useEffect } from 'react';
import css from './RecipeCard.module.css';
import clsx from 'clsx';
import { Btn, Icon, Avatar } from 'components/UI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'store/auth/selectors';
import { setModalLoginOpen } from 'store/modal/operations';
import { addRecipeToFavoriteThunk, removeRecipeFromFavoriteThunk } from 'store/recipes/operations';
import { selectError, selectLoading } from '../../store/recipes/selectors';
import toast from 'react-hot-toast';

const RecipeCard = ({ recipe = {}, className = '' }) => {
  const { id, thumb, title, description, ownerId, ownerAvatar, ownerName, isFavorite } = recipe ?? {};

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickFav = async () => {
    if (!isLoggedIn) {
      dispatch(setModalLoginOpen(true));
      return;
    }

    try {
      if (isFavorite) {
        await dispatch(removeRecipeFromFavoriteThunk(id));
      } else {
        await dispatch(addRecipeToFavoriteThunk(id));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickAvatar = () => {
    isLoggedIn ? navigate(`/user/${ownerId}`) : dispatch(setModalLoginOpen(true));
  };

  return (
    <div className={clsx(css.card, className)}>
      <img src={thumb} alt={title} className={css.cardImage} />
      <div className={css.cardBody}>
        <p className={css.title}>{title}</p>
        <p className={css.text}>{description}</p>
      </div>
      <div className={css.actions}>
        <button className={css.profileBtn} onClick={handleClickAvatar}>
          <Avatar src={ownerAvatar} placeholder={ownerName}>
            {ownerName && <span>{ownerName}</span>}
          </Avatar>
        </button>
        <div className={css.actionBtns}>
          <Btn className={css.btn} variant="btn-icon" onClick={handleClickFav}>
            <Icon name="icon-heart" className={clsx(css.icon, css.iconFav, isFavorite && css.iconIsFav)} />
          </Btn>
          <Btn className={css.btn} variant="btn-icon" onClick={() => navigate(`/recipe/${id}`)}>
            <Icon name="icon-arrow-up-right" className={css.icon} />
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
