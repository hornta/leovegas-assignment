import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer, RootState } from "../reducers/index.js";
import { errorLoggerMw } from "./middlewares/error-logger-mw.js";
import { persistSessionMw } from "./middlewares/persist-session-mw.js";

export const makeStore = (preloadedState?: RootState) =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => [
			...getDefaultMiddleware(),
			errorLoggerMw,
			persistSessionMw,
		],
		preloadedState,
	});

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
