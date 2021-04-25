import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store/store.js";
import type { Genres } from "./types/genres.js";
import type { Movie, MovieWithGenres } from "./types/movie-list-item.js";

export const selectIsFetching = (state: RootState) => state.search.fetching;
export const selectTotalResults = (state: RootState) =>
	state.search.totalResults;
export const selectSearchTerm = (state: RootState) => state.searchTerm;
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

const selectSearchResults = (state: RootState) => state.search.results;
const selectWatchlistResults = (state: RootState) => state.watchlist.results;
const selectPopularResults = (state: RootState) => state.popular.results;
const selectGenres = (state: RootState) => state.genres.genres;

const selectWithGenres = (movies: Movie[], genres: Genres) => {
	const moviesWithGenres: MovieWithGenres[] = [];
	for (const movie of movies) {
		const movieWithGenres: MovieWithGenres = { ...movie, genre_names: [] };
		for (const genreId of movie.genre_ids) {
			if (genres[genreId]) {
				movieWithGenres.genre_names.push(genres[genreId]);
			}
		}
		moviesWithGenres.push(movieWithGenres);
	}
	return moviesWithGenres;
};

export const selectSearchMovies = createSelector(
	selectSearchResults,
	selectGenres,
	selectWithGenres
);

export const selectWatchlistMovies = createSelector(
	selectWatchlistResults,
	selectGenres,
	selectWithGenres
);

export const selectPopularMovies = createSelector(
	selectPopularResults,
	selectGenres,
	selectWithGenres
);
