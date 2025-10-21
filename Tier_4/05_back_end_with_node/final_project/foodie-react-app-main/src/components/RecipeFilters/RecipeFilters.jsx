import React from 'react';
import { Dropdown } from '../UI';
import clsx from 'clsx';

const RecipeFilters = ({ areas, ingredients, filters = {}, onChange, className = '' }) => {
  return (
    <div className={clsx(className)}>
      <Dropdown options={areas} value={filters.area} onChange={val => onChange('area', val)} placeholder="Select area" clearable={true} />
      <Dropdown
        options={ingredients}
        value={filters.ingredient}
        onChange={val => onChange('ingredient', val)}
        placeholder="Select ingredients"
        clearable={true}
      />
    </div>
  );
};

export default RecipeFilters;
