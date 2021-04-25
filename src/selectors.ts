import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store.js";

export const selectIsFetching = (state: RootState) => state.search.fetching;
export const selectSearchResults = (state: RootState) => state.search.results;
export const selectSearchTerm = (state: RootState) => state.searchTerm;
export const selectTotalResults = (state: RootState) =>
	state.search.totalResults;
const selectTotalPages = (state: RootState) => state.search.totalPages;
export const selectCurrentPage = (state: RootState) => state.search.currentPage;
export const selectHasMoreToLoad = createSelector(
	selectTotalPages,
	selectCurrentPage,
	(totalPages, currentPage) => totalPages > currentPage
);
export const selectSession = (state: RootState) => state.session;
export const selectRejectedAccount = (state: RootState) =>
	state.account.rejected;
export const selectFetchingAccount = (state: RootState) =>
	state.account.fetching || state.account.account.id === 0;
export const selectAccountName = (state: RootState) =>
	state.account.account.name || state.account.account.username;
export const selectWatchlist = (state: RootState) => state.watchlist.results;
