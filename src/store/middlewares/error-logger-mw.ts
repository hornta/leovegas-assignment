import { AnyAction, isRejected, Middleware } from "@reduxjs/toolkit";

export const errorLoggerMw: Middleware = () => (next) => (
	action: AnyAction
) => {
	if (isRejected(action)) {
		console.error(action);
	}
	next(action);
};
