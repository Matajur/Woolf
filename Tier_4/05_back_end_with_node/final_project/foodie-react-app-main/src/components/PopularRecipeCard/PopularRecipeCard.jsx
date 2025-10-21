import React from 'react';
import css from './PopularRecipeCard.module.css';
import { useNavigate } from 'react-router-dom';
import Btn from '../UI/Btn/Btn';
import Icon from '../UI/Icon/Icon';
import clsx from 'clsx';
import defaultAvatar from 'images/avatar/default_avatar.jpg';
import { useDispatch } from 'react-redux';
import { setModalLoginOpen } from '../../store/modal/operations';

export default function PopularRecipeCard({ recipe, onChangeFavorite,isLoggedIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate(`/user/${recipe?.ownerId}`);
    } else {
      dispatch(setModalLoginOpen(true));
    }
  };

  const handleClick = () => {
    navigate(`/recipe/${recipe?.id}`);
  };

  return (
    <div className={css.card}>
      <img className={css.image} src={recipe?.thumb} alt="" />
      <div className={css.content}>
        <h2 className={css.title}>{recipe?.title}</h2>
        <p className={css.description}>{recipe?.description}</p>
        <div className={css.bottomMenu}>
          <button className={css.userDetails} onClick={handleUserClick}>
            <img className={css.avatar} src={recipe?.ownerAvatar || defaultAvatar} alt="User avatar" />
            <span className={css.name}>{recipe?.ownerName}</span>
          </button>
          <div className={css.buttons}>
            <Btn
              className={css.btn}
              variant="btn-icon"
              onClick={() => {
                onChangeFavorite(recipe?.id, recipe?.isFavorite);
              }}
            >
              <Icon name="icon-heart" size="18" className={clsx(css.iconFav, recipe?.isFavorite && css.iconIsFav)} />
            </Btn>
            <Btn className={css.btn} variant="btn-icon" onClick={handleClick}>
              <Icon name="icon-arrow-up-right" size="18" color="#000" />
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
