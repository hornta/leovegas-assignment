import { combineReducers } from "@reduxjs/toolkit";
import { fetchPopular, loadMorePopular } from "../actions/popular-actions.js";
import {
	loadMoreSearchResults,
	searchMovies,
} from "../actions/search-actions.js";
import {
	fetchWatchlist,
	loadMoreWatchlist,
} from "../actions/watchlist-actions.js";
import { accountReducer } from "./account-reducer.js";
import { genresReducer } from "./genres-reducer.js";
import { makeMovieListReducer } from "./make-movie-list-reducer.js";
import { movieReducer } from "./movie-reducer.js";
import { searchTermReducer } from "./search-term-reducer.js";
import { sessionReducer } from "./session-id-reducer.js";

const search = makeMovieListReducer(searchMovies, loadMoreSearchResults);
const watchlist = makeMovieListReducer(fetchWatchlist, loadMoreWatchlist);
const popular = makeMovieListReducer(fetchPopular, loadMorePopular);

export const rootReducer = combineReducers({
	search,
	watchlist,
	popular,
	searchTerm: searchTermReducer,
	session: sessionReducer,
	account: accountReducer,
	genres: genresReducer,
	movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
