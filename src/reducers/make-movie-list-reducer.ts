import { AsyncThunk, createReducer, Reducer } from "@reduxjs/toolkit";
import type { MovieListItem } from "../types/movie-list-item.js";
import type { MovieList } from "../types/movie-list.js";

export type MovieListReducerState = {
	fetching: boolean;
	rejected: boolean;
	isLoadingMore: boolean;
	rejectedLoadMore: boolean;
	totalPages: number;
	totalResults: number;
	currentPage: number;
	results: MovieListItem[];
};

export const initialMovieListState: MovieListReducerState = {
	fetching: false,
	rejected: false,

	isLoadingMore: false,
	rejectedLoadMore: false,

	totalPages: 0,
	totalResults: 0,
	currentPage: 0,
	results: [] as MovieListItem[],
};

const handleFulfilledResults = (
	state: MovieListReducerState,
	movieList: MovieList
): void => {
	state.totalPages = movieList.total_pages;
	state.currentPage = movieList.page;
	state.totalResults = movieList.total_results;
};

export const makeMovieListReducer = (
	fetchListAction: AsyncThunk<MovieList, any, any>,
	loadMoreAction: AsyncThunk<MovieList, any, any>
): Reducer<MovieListReducerState> =>
	createReducer(initialMovieListState, (builder) => {
		builder
			.addCase(fetchListAction.pending, (state) => {
				state.fetching = true;
				state.rejected = false;
			})
			.addCase(loadMoreAction.pending, (state) => {
				state.isLoadingMore = true;
				state.rejectedLoadMore = false;
			})
			.addCase(fetchListAction.rejected, (state) => {
				state.fetching = false;
				state.rejected = true;
			})
			.addCase(loadMoreAction.rejected, (state) => {
				state.isLoadingMore = false;
				state.rejectedLoadMore = true;
			})
			.addCase(fetchListAction.fulfilled, (state, action) => {
				state.fetching = false;
				handleFulfilledResults(state, action.payload);
				state.results = action.payload.results;
			})
			.addCase(loadMoreAction.fulfilled, (state, action) => {
				state.isLoadingMore = false;
				state.results.push(...action.payload.results);
				handleFulfilledResults(state, action.payload);
			});
	});
