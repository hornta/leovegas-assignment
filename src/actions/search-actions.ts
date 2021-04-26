import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../reducers/index.js";
import type { MovieList } from "../types/movie-list.js";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "../utils.js";

const searchMoviesApi = async (
	page: number,
	searchTerm: string
): Promise<MovieList> => {
	const response = await fetch(
		makeTmdbPath(`/search/movie?query=${searchTerm}&page=${page}`)
	);
	ensureSuccessfulHttpStatus(response.status);
	return response.json() as Promise<MovieList>;
};

export const searchMovies = createAsyncThunk(
	"search/fetch",
	(searchTerm: string) => searchMoviesApi(1, searchTerm)
);

export const loadMoreSearchResults = createAsyncThunk<
	MovieList,
	unknown,
	{ state: RootState }
>("search/loadMore", async (_, { getState }) =>
	searchMoviesApi(getState().search.currentPage + 1, getState().searchTerm)
);
