import { lazy } from 'react';
import PrivateRoute from './guards/PrivateRoute/PrivateRoute.jsx';
import { useLocation } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RecipePage = lazy(() => import('./pages/RecipePage/RecipePage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage/RecipeDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const AddRecipePage = lazy(() => import('./pages/AddRecipePage/AddRecipePage'));
const CategoriesList = lazy(() => import('./components/CategoriesList/CategoriesList'));
const Recipes = lazy(() => import('./components/Recipes/Recipes'));

const routes = [
  {
    path: '/',
    element: <HomePage />,
    title: 'Home',
    isNav: true,
    handle: { routeName: 'home', layoutClass: 'home' },
    children: [
      {
        index: true,
        element: <CategoriesList />,
        handle: { routeName: 'home', layoutClass: 'home' },
      },
      {
        path: 'category/:slug',
        element: <Recipes />,
        handle: { routeName: 'home', layoutClass: 'home' },
      },
    ],
  },
  {
    path: '/recipe',
    element: <RecipePage />,
    title: 'Recipe page',
    isNav: false,
    handle: { routeName: 'recipe_page' },
  },
  {
    path: '/user/:id',
    element: <PrivateRoute component={<UserPage />}/>,
    title: 'User page',
    isNav: false,
    handle: { routeName: 'user_page' },
  },
  {
    path: '/recipe/:id', //
    element: <RecipeDetailPage />,
    handle: { routeName: 'recipe_detail' },
  },
  {
    path: '/recipe/add',
    element: <PrivateRoute component={<AddRecipePage />} />,
    title: 'Add Recipe',
    isNav: true,
    handle: { routeName: 'add_recipe' },
  },
  {
    path: '*',
    element: <NotFoundPage />,
    handle: { routeName: 'not_found' },
  },
];

const ComponentsPage = process.env.NODE_ENV === 'development' ? lazy(() => import('./pages/ComponentsPage/ComponentsPage')) : null;

if (ComponentsPage) {
  routes.push({ path: '/components', element: <ComponentsPage /> });
}

export default routes;
