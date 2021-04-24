import { createSelector } from "@reduxjs/toolkit";
import type { RootReducerState } from "./reducers/index.js";

export const selectIsFetching = (state: RootReducerState): boolean =>
	state.search.fetching;
export const selectSearchResults = (
	state: RootReducerState
): SearchResultItem[] => state.search.results;
export const selectKeyword = (state: RootReducerState): string =>
	state.search.searchTerm;
export const selectTotalResults = (state: RootReducerState): number =>
	state.search.totalResults;
const selectTotalPages = (state: RootReducerState) => state.search.totalPages;
export const selectCurrentPage = (state: RootReducerState): number =>
	state.search.currentPage;
export const selectHasMoreToLoad = createSelector(
	selectTotalPages,
	selectCurrentPage,
	(totalPages, currentPage) => totalPages > currentPage
);
export const selectSession = (state: RootReducerState): string => state.session;
