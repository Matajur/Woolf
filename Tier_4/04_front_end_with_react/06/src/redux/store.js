import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { contactsReducer } from './contactsSlice';
import { filtersReducer } from './filtersSlice';

const persistConfig = {
    key: 'contacts',
    storage,
    whitelist: ['items']
};

const rootReducer = combineReducers({
    contacts: persistReducer(persistConfig, contactsReducer),
    filters: filtersReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types from redux-persist to avoid serializability warning
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)
