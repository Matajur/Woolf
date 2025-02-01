import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "reduxstore";

// Changing the component name, React only renders components whose names start with a capital letter
export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
