import {
	AnyAction,
	configureStore,
	isRejected,
	Middleware,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createSession, logout } from "./actions/actions.js";
import { rootReducer, RootReducerState } from "./reducers/index.js";
import { SessionLocalStorageKey } from "./reducers/session-id-reducer.js";

const loggerMw: Middleware<Record<string, never>, RootReducerState> = () => (
	next
	// eslint-disable-next-line unicorn/consistent-function-scoping
) => (action: AnyAction) => {
	if (isRejected(action)) {
		console.error(action);
	}
	next(action);
};

const persistSessionMw: Middleware<
	Record<string, never>,
	RootReducerState
	// eslint-disable-next-line unicorn/consistent-function-scoping
> = () => (next) => (action: AnyAction) => {
	// eslint-disable-next-line unicorn/prefer-regexp-test
	if (createSession.fulfilled.match(action)) {
		localStorage.setItem(SessionLocalStorageKey, action.payload);
		// eslint-disable-next-line unicorn/prefer-regexp-test
	} else if (logout.match(action)) {
		localStorage.removeItem(SessionLocalStorageKey);
	}
	next(action);
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		loggerMw,
		persistSessionMw,
	],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
