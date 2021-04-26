import { AnyAction, isRejected, Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../../reducers/index.js";

export const errorLoggerMw: Middleware<
	Record<string, never>,
	RootState
> = () => (next) => (action: AnyAction) => {
	if (isRejected(action)) {
		console.error(action);
	}
	next(action);
};
