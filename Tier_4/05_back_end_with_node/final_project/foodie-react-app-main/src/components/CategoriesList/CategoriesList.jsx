import css from './CategoriesList.module.css';
import CategoryItem from 'components/CategoryItem/CategoryItem';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from 'store/recipes/selectors';
import { fetchCategories } from 'store/recipes/operations';
import { useParams, useSearchParams } from 'react-router-dom';
import PageTitle from '../PageTitle/PageTitle';

const CategoriesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const rawCategories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const [isShowAll, setIsShowAll] = useState(false);
  const categories = isShowAll ? rawCategories : [...rawCategories].slice(0, 11);
  const [activeCategory, setActiveCategory] = useState(null);

  const setCategory = id => {
    const category = categories.find(cat => cat.id === id);
    if (category) {
      setActiveCategory({ id: category.id, name: category.name });
      setTimeout(() => scrollToElement('homepage-categories'), 100);
    } else {
      setActiveCategory(null);
    }
  };

  const onClickCategory = async id => {
    const resultAction = await dispatch(
      fetchRecipes({
        category: id,
        limit: 12,
        page: 1,
      })
    );

    if (resultAction.meta.requestStatus === 'fulfilled') {
      setCategory(id);
    } else {
      const errorMessage = resultAction.payload || 'Something went wrong';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const pageTitle = {
    title: 'Categories',
    subtitle:
      'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.',
  };

  return (
    <>
      <PageTitle {...pageTitle} />
      <ul className={css.itemsSet}>
        {categories.map((category, index) => {
          return (
            <li key={category.id} className={clsx(css.item, css[`item_${(index % 12) + 1}`] ?? '')}>
              <CategoryItem onClick={onClickCategory} category={category}></CategoryItem>
            </li>
          );
        })}
        {!isShowAll && (
          <li className={clsx(css.item, css.showAll)} onClick={setIsShowAll(true)}>
            All categories
          </li>
        )}
      </ul>
    </>
  );
};

export default CategoriesList;
