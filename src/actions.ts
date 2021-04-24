import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootReducerState } from "./reducers/index.js";
import type { SearchResult } from "./types/search-result.js";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "./utils.js";

const searchMoviesHttp = async (
	page: number,
	searchTerm: string
): Promise<SearchResult> => {
	const response = await fetch(
		makeTmdbPath(`/search/movie?query=${searchTerm}&page=${page}`)
	);
	ensureSuccessfulHttpStatus(response.status);
	return response.json() as Promise<SearchResult>;
};

export const searchMovies = createAsyncThunk("search", (searchTerm: string) =>
	searchMoviesHttp(1, searchTerm)
);

type ThenArgument<T> = T extends Promise<infer U> ? U : T;

export const loadMoreSearchResults = createAsyncThunk<
	ThenArgument<ReturnType<typeof searchMoviesHttp>>,
	undefined,
	{ state: RootReducerState }
>("loadMoreSearchResults", async (_, { getState }) =>
	searchMoviesHttp(
		getState().search.currentPage + 1,
		getState().search.searchTerm
	)
);

// export const retrievePopular = createAsyncThunk(
// 	"retrievePopular",
// 	async ({ page }) => {
// 		const response = await fetch(makeTmdbPath('/disover/movie')
// 			`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&page=${page}`
// 		);
// 		ensureSuccessfulHttpStatus(response.status);
// 		return response.json();
// 	}
// );

const createWatchLaterList = () => {
	const path = makeTmdbPath("");
};

export const addToWatchLaterList = createAsyncThunk(
	"watchLater/add",
	(movieId, thunkAPI) => {
		// if(thunkAPI.)
	}
);

type CreateSessionResponse = {
	success: boolean;
	session_id: string;
};

export const createSession = createAsyncThunk(
	"createSession",
	async (requestToken: string) => {
		const response = await fetch(makeTmdbPath("/authentication/session/new"), {
			method: "POST",
			body: JSON.stringify({
				request_token: requestToken,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const {
			success,
			session_id,
		} = (await response.json()) as CreateSessionResponse;
		if (!success) {
			throw new Error("Failed to authenticate");
		}
		return session_id;
	}
);

export const logout = createAction("logout");
