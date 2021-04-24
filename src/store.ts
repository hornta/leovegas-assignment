import {
	AnyAction,
	AsyncThunkAction,
	configureStore,
	isRejected,
	Middleware,
	ThunkAction,
} from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { createSession, logout } from "./actions.js";
import { rootReducer, RootReducerState } from "./reducers/index.js";
import { SessionLocalStorageKey } from "./reducers/session-id-reducer.js";

const loggerMw: Middleware<Record<string, never>, RootReducerState> = () => (
	next
) => (action: ThunkAction) => {
	if (isRejected(action)) {
		console.error(action);
	}
	next(action);
};

const persistSessionMw: Middleware<
	Record<string, never>,
	RootReducerState
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
