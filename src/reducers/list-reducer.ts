import { createReducer } from "@reduxjs/toolkit";
import { addToWatchLaterList } from "../actions.js";

enum ListType {
	WATCH_LATER = "watch_later",
	FAVORITES = "favorites",
}

const makeInitialState = () => {
	const initialState = {
		[ListType.WATCH_LATER]: 0,
		[ListType.FAVORITES]: 0,
	};

	const watchLater = Number(localStorage.getItem(ListType.WATCH_LATER));
	if (watchLater !== 0 && !Number.isNaN(watchLater)) {
		initialState[ListType.WATCH_LATER] = watchLater;
	}

	const favorites = Number(localStorage.getItem(ListType.FAVORITES));
	if (favorites !== 0 && !Number.isNaN(favorites)) {
		initialState[ListType.FAVORITES] = favorites;
	}

	return initialState;
};

export type ListReducerState = {
	[ListType.WATCH_LATER]: number;
	[ListType.FAVORITES]: number;
};

const initialState: ListReducerState = {
	...makeInitialState(),
};

export const listReducer = createReducer(initialState, (builder) => {
	builder.addCase(addToWatchLaterList.pending, () => {});
});
