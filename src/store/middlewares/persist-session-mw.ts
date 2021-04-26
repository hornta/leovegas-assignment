import type { AnyAction, Middleware } from "@reduxjs/toolkit";
import { logout } from "../../actions/actions.js";
import { createSession } from "../../actions/create-session.js";
import { SessionLocalStorageKey } from "../../reducers/session-id-reducer.js";

export const persistSessionMw: Middleware = () => (next) => (
	action: AnyAction
) => {
	if (createSession.fulfilled.match(action)) {
		localStorage.setItem(SessionLocalStorageKey, action.payload);
	} else if (logout.match(action)) {
		localStorage.removeItem(SessionLocalStorageKey);
	}
	next(action);
};
