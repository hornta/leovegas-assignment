import { createReducer } from "@reduxjs/toolkit";
import { fetchMovieAccountStates } from "../actions/fetch-movie-account-states.js";
import { fetchMovie } from "../actions/fetch-movie.js";
import { markAsFavorite } from "../actions/mark-as-favorite.js";
import { updateWatchList } from "../actions/update-watchlist.js";
import type { MovieAccountStates } from "../types/movie-account-states.js";
import type { MovieDetail } from "../types/movie-detail.js";

type MovieReducerState = {
	movie: MovieDetail | null;
	movieAccountStates: MovieAccountStates | null;
	fetchingMovie: boolean;
};

const initialState: MovieReducerState = {
	movie: null,
	movieAccountStates: null,
	fetchingMovie: false,
};

export const movieReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(fetchMovie.pending, (state) => {
			state.fetchingMovie = true;
		})
		.addCase(fetchMovie.rejected, (state) => {
			state.fetchingMovie = false;
		})
		.addCase(fetchMovie.fulfilled, (state, action) => {
			state.fetchingMovie = false;
			state.movie = action.payload;
		})
		.addCase(fetchMovieAccountStates.fulfilled, (state, action) => {
			state.movieAccountStates = action.payload;
		})
		.addCase(markAsFavorite.fulfilled, (state, action) => {
			if (state.movieAccountStates) {
				state.movieAccountStates.favorite = action.meta.arg.favorite;
			}
		})
		.addCase(updateWatchList.fulfilled, (state, action) => {
			if (state.movieAccountStates) {
				state.movieAccountStates.watchlist = action.meta.arg.add;
			}
		});
});
