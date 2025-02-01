import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice";
import { contactsReducer } from "./contacts/slice";
import { filtersReducer } from "./filters/slice";

const authPersistConfig = {
  key: "token", // Key for localStorage
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const rootReducer = {
  auth: persistedAuthReducer,
  contacts: contactsReducer,
  filters: filtersReducer,
};
