import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlices";

//conffig save state theme to localStorage
const persistConfig = {
	key: "theme",
	version: 1,
	storage,
	whitelist: ["theme"],
};

//redux reducer
const rootReducer = combineReducers({
	theme: themeReducer,
});

//persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//redux store
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
});

//persist store
export const persistor = persistStore(store);

const { dispatch, getState } = store;
export { store, dispatch, getState };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
