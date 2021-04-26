import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../reducers/index.js";
import type { MovieAccountStates } from "../types/movie-account-states.js";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "../utils.js";

export const fetchMovieAccountStates = createAsyncThunk<
	MovieAccountStates,
	number,
	{ state: RootState }
>("fetchMovieAccountStates", async (movieId: number, { getState }) => {
	const response = await fetch(
		makeTmdbPath(
			`/movie/${movieId}/account_states?session_id=${getState().session}`
		)
	);
	ensureSuccessfulHttpStatus(response.status);
	const movieAccountStates = (await response.json()) as MovieAccountStates;
	return movieAccountStates;
});
