import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootReducerState } from "../reducers/index.js";
import type { AccountDetails } from "../types/account-details.js";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "../utils.js";

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
