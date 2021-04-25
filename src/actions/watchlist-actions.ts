import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootReducerState } from "../reducers/index.js";
import type { MovieList } from "../types/movie-list.js";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "../utils.js";

const fetchWatchlistApi = async (
	sessionId: string,
	page: number
): Promise<MovieList> => {
	const response = await fetch(
		makeTmdbPath(
			`/account/0/watchlist/movies?page=${page}&session_id=${sessionId}`
		)
	);
	ensureSuccessfulHttpStatus(response.status);
	return response.json() as Promise<MovieList>;
};

export const fetchWatchlist = createAsyncThunk<
	MovieList,
	void,
	{ state: RootReducerState }
>("watchlist/fetch", (_, { getState }) =>
	fetchWatchlistApi(getState().session, 1)
);

export const loadMoreWatchlist = createAsyncThunk<
	MovieList,
	void,
	{ state: RootReducerState }
>("watchlist/loadMore", async (_, { getState }) =>
	fetchWatchlistApi(getState().session, getState().watchlist.currentPage + 1)
);