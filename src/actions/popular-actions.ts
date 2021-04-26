import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../reducers/index.js";
import type { MovieList } from "../types/movie-list.js";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "../utils.js";

const fetchPopularApi = async (
	sessionId: string,
	page: number
): Promise<MovieList> => {
	const response = await fetch(
		makeTmdbPath(
			`/discover/movie?page=${page}&session_id=${sessionId}&sort_by=popularity.desc`
		)
	);
	ensureSuccessfulHttpStatus(response.status);
	return response.json() as Promise<MovieList>;
};

export const fetchPopular = createAsyncThunk<
	MovieList,
	void,
	{ state: RootState }
>("popular/fetch", (_, { getState }) => fetchPopularApi(getState().session, 1));

export const loadMorePopular = createAsyncThunk<
	MovieList,
	void,
	{ state: RootState }
>("popular/loadMore", async (_, { getState }) =>
	fetchPopularApi(getState().session, getState().popular.currentPage + 1)
);
