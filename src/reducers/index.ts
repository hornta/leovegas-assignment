import { combineReducers } from "@reduxjs/toolkit";
import type { DefaultRootState } from "react-redux";
import {
	loadMoreSearchResults,
	searchMovies,
} from "../actions/search-actions.js";
import {
	fetchWatchlist,
	loadMoreWatchlist,
} from "../actions/watchlist-actions.js";
import { accountReducer, AccountReducerState } from "./account-reducer.js";
import {
	makeMovieListReducer,
	MovieListReducerState,
} from "./make-movie-list-reducer.js";
import {
	searchTermReducer,
	SearchTermReducerState,
} from "./search-term-reducer.js";
import { sessionReducer, SessionReducerState } from "./session-id-reducer.js";

export interface RootReducerState extends DefaultRootState {
	searchTerm: SearchTermReducerState;
	search: MovieListReducerState;
	watchlist: MovieListReducerState;
	session: SessionReducerState;
	account: AccountReducerState;
}

export const rootReducer = combineReducers({
	searchTerm: searchTermReducer,
	search: makeMovieListReducer(searchMovies, loadMoreSearchResults),
	watchlist: makeMovieListReducer(fetchWatchlist, loadMoreWatchlist),
	session: sessionReducer,
	account: accountReducer,
});
