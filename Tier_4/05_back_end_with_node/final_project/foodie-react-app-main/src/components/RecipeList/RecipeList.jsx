import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipeList.module.css";
import clsx from "clsx";

const RecipeList = ({ recipes = [], className = "" }) => {
  return (
    <ul className={clsx(css.itemsSet, className)}>
      {recipes.map((recipe) => (
        <li key={recipe.id} className={css.item}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
