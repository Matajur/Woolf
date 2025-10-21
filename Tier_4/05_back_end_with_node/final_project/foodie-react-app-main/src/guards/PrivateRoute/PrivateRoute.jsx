import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/auth/selectors.js';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { openLoginModal } from '../../store/modal/slice.js';

const PrivateRoute = ({ component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
    }
  }, [isLoggedIn, dispatch]);
  return isLoggedIn ? component : <Navigate to={location.state?.from ? location.state?.from : redirectTo} replace />;
};
export default PrivateRoute;
