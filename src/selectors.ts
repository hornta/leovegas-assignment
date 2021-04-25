import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store/store.js";

export const selectIsFetching = (state: RootState) => state.search.fetching;
export const selectSearchResults = (state: RootState) => state.search.results;
export const selectSearchTerm = (state: RootState) => state.searchTerm;
export const selectTotalResults = (state: RootState) =>
	state.search.totalResults;
const selectTotalPagesSearch = (state: RootState) => state.search.totalPages;

export const selectCurrentPageSearch = (state: RootState) =>
	state.search.currentPage;
export const selectHasMoreSearchResultsToLoad = createSelector(
	selectTotalPagesSearch,
	selectCurrentPageSearch,
	(totalPages, currentPage) => totalPages > currentPage
);

const selectTotalPagesWatchlist = (state: RootState) =>
	state.watchlist.totalPages;
export const selectCurrentPageWatchlist = (state: RootState) =>
	state.watchlist.currentPage;
export const selectHasMoreWatchlistToLoad = createSelector(
	selectTotalPagesWatchlist,
	selectCurrentPageWatchlist,
	(totalPages, currentPage) => totalPages > currentPage
);

const selectTotalPagesPopular = (state: RootState) => state.popular.totalPages;
export const selectCurrentPagePopular = (state: RootState) =>
	state.popular.currentPage;
export const selectHasMorePopularToLoad = createSelector(
	selectTotalPagesPopular,
	selectCurrentPagePopular,
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
export const selectPopular = (state: RootState) => state.popular.results;
