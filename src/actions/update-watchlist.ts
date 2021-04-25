import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootReducerState } from "../reducers/index.js";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "../utils.js";

export const updateWatchList = createAsyncThunk<
	void,
	{ movieId: number; add: boolean },
	{ state: RootReducerState }
>("watchlist/add", async ({ movieId, add }, { getState }) => {
	const response = await fetch(
		makeTmdbPath(
			`/account/${getState().account.account.id}/watchlist?session_id=${
				getState().session
			}`
		),
		{
			method: "POST",
			body: JSON.stringify({
				media_type: "movie",
				media_id: movieId,
				watchlist: add,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	ensureSuccessfulHttpStatus(response.status);
});
