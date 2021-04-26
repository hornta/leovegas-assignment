import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../reducers/index.js";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "../utils.js";

type MarkAsFavoriteArgument = {
	movieId: number;
	favorite: boolean;
};

export const markAsFavorite = createAsyncThunk<
	void,
	MarkAsFavoriteArgument,
	{ state: RootState }
>("markAsFavorite", async ({ movieId, favorite }, { getState }) => {
	const response = await fetch(
		makeTmdbPath(
			`/account/${getState().account.account.id}/favorite?session_id=${
				getState().session
			}`
		),
		{
			method: "POST",
			body: JSON.stringify({
				media_type: "movie",
				media_id: movieId,
				favorite,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	ensureSuccessfulHttpStatus(response.status);
});
