import { createReducer } from "@reduxjs/toolkit";
import { logout } from "../actions/actions.js";
import { createSession } from "../actions/create-session.js";

export type SessionReducerState = string;

export const SessionLocalStorageKey = "session_id";

const initialState: SessionReducerState =
	localStorage.getItem(SessionLocalStorageKey) ?? "";

export const sessionReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(createSession.fulfilled, (state, action) => action.payload)
		.addCase(logout, () => "");
});
