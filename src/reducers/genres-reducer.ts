import { createReducer } from "@reduxjs/toolkit";
import { fetchGenres } from "../actions/fetch-genres.js";
import type { Genres } from "../types/genres.js";

export interface GenresReducerState {
	genres: Genres;
	fetching: boolean;
	rejected: boolean;
}

export const initialState: GenresReducerState = {
	genres: {},
	fetching: false,
	rejected: false,
};

export const genresReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(fetchGenres.pending, (state) => {
			state.fetching = true;
			state.rejected = false;
		})
		.addCase(fetchGenres.rejected, (state) => {
			state.fetching = false;
			state.rejected = true;
		})
		.addCase(fetchGenres.fulfilled, (state, action) => {
			state.fetching = false;
			state.genres = action.payload;
		});
});
