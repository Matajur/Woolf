import React, { useEffect, useState } from 'react';
import css from './Recipes.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { selectLoading, selectError, selectRecipes, selectCategories, selectAreas, selectIngredients, selectPagination } from 'store/recipes/selectors';
import { fetchCategories, fetchAreas, fetchIngredients, fetchRecipes } from 'store/recipes/operations';
import { selectIsLoggedIn } from 'store/auth/selectors';

import PageTitle from '../PageTitle/PageTitle';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import { Pagination, Icon, AppLoader } from '../UI';
import useScrollToElement from '../../hooks/useScrollToElement';

const Recipes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollToElement = useScrollToElement();
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = useSelector(selectCategories);
  const rawAreas = useSelector(selectAreas);
  const rawIngredients = useSelector(selectIngredients);
  const recipes = useSelector(selectRecipes);
  const pagination = useSelector(selectPagination);
  const isLoading = useSelector(selectLoading);
  const hasError = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const activeCategory = categories.find(cat => cat?.name.toLowerCase().replace(/\s+/g, '_') === slug);

  const perPage = 12;
  const initialPage = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(initialPage);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
    dispatch(fetchAreas());
  }, [dispatch]);

  useEffect(() => {
    if (!rawAreas.length || !rawIngredients.length) return;

    const areaId = searchParams.get('area');
    const ingredientId = searchParams.get('ingredient');

    const area = rawAreas.find(opt => opt.value === areaId);
    const ingredient = rawIngredients.find(opt => opt.value === ingredientId);

    setFilters({
      ...(area ? { area } : {}),
      ...(ingredient ? { ingredient } : {}),
    });
  }, [rawAreas, rawIngredients, searchParams]);

  useEffect(() => {
    if (!activeCategory?.id || filters === null) return;

    const filtersValues = Object.fromEntries(
      Object.entries(filters)
        .filter(([_, option]) => option?.value != null)
        .map(([key, option]) => [key, option.value])
    );

    dispatch(
      fetchRecipes({
        category: activeCategory.id,
        limit: perPage,
        page,
        ...filtersValues,
      })
    );

    setTimeout(() => scrollToElement('homepage-categories'), 100);
  }, [filters, activeCategory?.id, page, dispatch, isLoggedIn]);

  const updateUrlParams = (newPage, newFilters = {}) => {
    const params = {
      page: newPage,
      ...Object.fromEntries(
        Object.entries(newFilters)
          .filter(([_, opt]) => opt?.value != null)
          .map(([key, opt]) => [key, opt.value])
      ),
    };
    setSearchParams(params);
  };

  const updateFilter = (key, option) => {
    const updatedFilters = { ...filters, [key]: option };
    setFilters(updatedFilters);
    setPage(1);
    updateUrlParams(1, updatedFilters);
  };

  const onPageChange = p => {
    setPage(p);
    updateUrlParams(p, filters);
  };

  const pageTitle = {
    title: activeCategory?.name,
    subtitle: 'Discover tasty recipes that fit your preferences!',
  };

  const isEmpty = !isLoading && !hasError && recipes?.length === 0;

  return (
    <>
      <button onClick={() => navigate('/')} className={css.backLink}>
        <Icon name="icon-arrow-left" size="12" />
        Back
      </button>
      <PageTitle {...pageTitle} />
      <div className={css.wrapper}>
        {filters && <RecipeFilters className={css.filters} areas={rawAreas} ingredients={rawIngredients} filters={filters} onChange={updateFilter} />}
        <div style={{ width: '100%' }}>
          {isLoading && <AppLoader />}
          {isEmpty && <p className="no-results">No recipes found for the selected category or filters.</p>}
          <RecipeList recipes={recipes} className={css.recipeList} />
          {pagination.totalPages > 1 && <Pagination total={pagination.totalPages} current={page} onChange={onPageChange} />}
        </div>
      </div>
    </>
  );
};

export default Recipes;
