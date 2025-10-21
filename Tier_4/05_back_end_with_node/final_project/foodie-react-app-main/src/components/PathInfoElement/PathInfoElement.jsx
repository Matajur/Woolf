import React from "react";
import css from "./PathInfoElement.module.css";
import { Link } from "react-router-dom";
export default function PathInfo({ activePath = "Salmon Avocado Salad" }) {
  return (
    <ul className={css.card}>
      <li className={css.item}>
        <Link to="/">HOME</Link>
      </li>
      <li className={css.item}>/</li>
      <li className={css.item}>{activePath}</li>
    </ul>
  );
}
