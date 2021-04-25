import { createReducer } from "@reduxjs/toolkit";
import { getAccountDetails } from "../actions/actions.js";
import type { AccountDetails } from "../types/account-details.js";

export interface AccountReducerState {
	account: AccountDetails;
	fetching: boolean;
	rejected: boolean;
}

const initialState: AccountReducerState = {
	account: {
		avatar: {
			gravatar: {
				hash: "",
			},
		},
		id: 0,
		include_adult: false,
		iso_3166_1: "",
		iso_639_1: "",
		name: "",
		username: "",
	},
	fetching: false,
	rejected: false,
};

export const accountReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(getAccountDetails.pending, (state) => {
			state.fetching = true;
			state.rejected = false;
		})
		.addCase(getAccountDetails.rejected, (state) => {
			state.fetching = false;
			state.rejected = true;
		})
		.addCase(getAccountDetails.fulfilled, (state, action) => {
			state.fetching = false;
			state.account = action.payload;
		});
});
