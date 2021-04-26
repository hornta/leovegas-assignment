import React from "react";
import { render, screen } from "@testing-library/react";
import { ScreenSearch } from "./screen-search";
import userEvent from "@testing-library/user-event";
import { makeStore } from "./store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("<ScreenSearch>", () => {
	it("perform a search", () => {
		const store = makeStore();
		render(
			<BrowserRouter>
				<Provider store={store}>
					<ScreenSearch />
				</Provider>
			</BrowserRouter>
		);
		userEvent.type(screen.getByRole("searchbox"), "Marvel{enter}");
		screen.getByText("Loading movies...");
		location.search.includes("Marvel");
	});
});
