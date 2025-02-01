import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import { AppBar, Footer } from "components";
import { PrivateRoute, RestrictedRoute } from "./guards";
import { ContactsPage, HomePage, LoginPage, RegistrationPage } from "pages";
import { refreshUser, selectIsRefreshing } from "reduxstore";

import styles from "./App.module.css";

const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing user...</p>
  ) : (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppBar />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
