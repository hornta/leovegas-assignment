import { createReducer } from "@reduxjs/toolkit";
import { loadMoreSearchResults, searchMovies } from "../actions.js";
import type { SearchResultItem } from "../types/search-result-item.js";
import type { SearchResult } from "../types/search-result.js";

export type SearchReducerState = {
	fetching: boolean;
	rejected: boolean;
	searchTerm: string;
	totalPages: number;
	totalResults: number;
	currentPage: number;
	results: SearchResultItem[];
};

const initialState: SearchReducerState = {
	fetching: false,
	rejected: false,

	isLoadingMore: false,
	rejectedLoadMore: false,

	searchTerm: "",
	totalPages: 0,
	totalResults: 0,
	currentPage: 0,
	results: [] as SearchResultItem[],
};

const handleFulfilledResults = (
	state: SearchReducerState,
	searchResult: SearchResult
): void => {
	state.totalPages = searchResult.total_pages;
	state.currentPage = searchResult.page;
	state.totalResults = searchResult.total_results;
};

export const searchReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(searchMovies.pending, (state, action) => {
			state.fetching = true;
			state.searchTerm = action.meta.arg;
			state.rejected = false;
		})
		.addCase(loadMoreSearchResults.pending, (state) => {
			state.isLoadingMore = true;
			state.rejectedLoadMore = false;
		})
		.addCase(searchMovies.rejected, (state) => {
			state.fetching = false;
			state.rejected = true;
		})
		.addCase(loadMoreSearchResults.rejected, (state) => {
			state.isLoadingMore = false;
			state.rejectedLoadMore = true;
		})
		.addCase(searchMovies.fulfilled, (state, action) => {
			state.fetching = false;
			handleFulfilledResults(state, action.payload);
			state.results = action.payload.results;
		})
		.addCase(loadMoreSearchResults.fulfilled, (state, action) => {
			state.isLoadingMore = false;
			state.results.push(...action.payload.results);
			handleFulfilledResults(state, action.payload);
		});
});
