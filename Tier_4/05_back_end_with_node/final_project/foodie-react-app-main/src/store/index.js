import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { recipesReducer } from "./recipes/slice";
import { testimonialsReducer } from "./testimonials/slice";
import { modalReducer } from "./modal/slice";
import { usersReducer } from "./auth/slice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { setupInterceptors } from '../api/setupInterceptors';


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "currentUser", "isLoggedIn"],
};

const rootReducer = combineReducers({
  recipes: recipesReducer,
  testimonials: testimonialsReducer,
  modal: modalReducer,
  auth: persistReducer(authPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE === "development",
});

setupInterceptors(store);
export const persistor = persistStore(store);