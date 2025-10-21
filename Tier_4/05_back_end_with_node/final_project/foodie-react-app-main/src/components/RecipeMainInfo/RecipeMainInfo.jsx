import React from "react";
import css from "./RecipeMainInfo.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModalLoginOpen } from "../../store/modal/operations";
import { Section } from "../UI";
import defaultAvatar from 'images/avatar/default_avatar.jpg';

export default function RecipeMainInfo({ recipe, isLoggedIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (isLoggedIn) {
      navigate(`/user/${recipe?.ownerId}`);
    } else {
      dispatch(setModalLoginOpen(true));
    }
  };
  return (
    <div className={css.card}>
      <h2 className={css.title}>{recipe?.title}</h2>
      <div className={css.infos}>
        <span className={css.info}>{recipe?.category}</span>
        <span className={css.info}>{`${recipe?.time} min`}</span>
      </div>
      <p className={css.text}>{recipe?.description}</p>
      <button className={css.userContainer} onClick={handleClick}>
        <img
          className={css.userAvatar}
          src={`${
            recipe?.ownerAvatar || defaultAvatar
          }`}
          alt=""
        />
        <div className={css.userDetails}>
          <span className={css.userDetailName}>Created by:</span>
          <span className={css.userDetailValue}>{recipe?.ownerName}</span>
        </div>
      </button>
    </div>
  );
}
