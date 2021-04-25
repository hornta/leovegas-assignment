import { createReducer } from "@reduxjs/toolkit";
import { searchMovies } from "../actions/search-actions.js";

export type SearchTermReducerState = string;

export const searchTermReducer = createReducer("", (builder) => {
	builder.addCase(searchMovies.pending, (state, action) => action.meta.arg);
});
