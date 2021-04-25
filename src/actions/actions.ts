import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootReducerState } from "../reducers/index.js";
import type { AccountDetails } from "../types/account-details.js";
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
		ensureSuccessfulHttpStatus(response.status);
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

export const getAccountDetails = createAsyncThunk<
	AccountDetails,
	undefined,
	{ state: RootReducerState }
>("getAccountDetails", async (_, { getState }) => {
	const response = await fetch(
		makeTmdbPath(`/account?session_id=${getState().session}`)
	);
	ensureSuccessfulHttpStatus(response.status);
	return response.json() as Promise<AccountDetails>;
});

export const logout = createAction("logout");
