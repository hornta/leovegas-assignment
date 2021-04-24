import { combineReducers } from "@reduxjs/toolkit";
import { listReducer, ListReducerState } from "./list-reducer.js";
import { searchReducer, SearchReducerState } from "./search-reducer.js";
import { sessionReducer, SessionReducerState } from "./session-id-reducer.js";

export type RootReducerState = {
	search: SearchReducerState;
	lists: ListReducerState;
	session: SessionReducerState;
};

export const rootReducer = combineReducers({
	search: searchReducer,
	lists: listReducer,
	session: sessionReducer,
});
