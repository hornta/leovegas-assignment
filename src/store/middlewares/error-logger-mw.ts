import { AnyAction, isRejected, Middleware } from "@reduxjs/toolkit";
import type { RootReducerState } from "../../reducers/index.js";

export const errorLoggerMw: Middleware<
	Record<string, never>,
	RootReducerState
> = () => (next) => (action: AnyAction) => {
	if (isRejected(action)) {
		console.error(action);
	}
	next(action);
};
