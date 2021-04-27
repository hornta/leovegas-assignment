import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { ScreenSearch } from "./screen-search";
import userEvent from "@testing-library/user-event";
import { appRender, isTextSelected, resetUrl } from "../../test-utils.jsx";
import { expect } from "chai";

describe("<ScreenSearch>", () => {
	it("perform a search when pressing the enter key", () => {
		appRender(<ScreenSearch />);
		userEvent.type(screen.getByRole("searchbox"), "Marvel{enter}");
		screen.getByText("Loading movies...");
	});

	it("perform a search when clicking the search submit button", () => {
		appRender(<ScreenSearch />);
		userEvent.type(screen.getByRole("searchbox"), "Marvel");
		userEvent.click(screen.getByRole("button", { name: /search/i }));
		screen.getByText("Loading movies...");
	});

	it("performs an initial search when url contains a search term", () => {
		resetUrl({ search: { search_term: "matrix" } });
		appRender(<ScreenSearch />);
		screen.getByText("Loading movies...");
	});

	it("fills searchbox with search term from url", () => {
		resetUrl({ search: { search_term: "matrix" } });
		appRender(<ScreenSearch />);
		expect(screen.getByRole("searchbox").value).equal("matrix");
	});

	it("adds the search term in the url upon searching", () => {
		resetUrl();
		expect(location.search.includes("matrix")).equal(false);
		appRender(<ScreenSearch />);
		userEvent.type(screen.getByRole("searchbox"), "matrix{enter}");
		expect(location.search.includes("matrix")).equal(true);
	});

	it("focuses the searchbox value upon reciving focus", () => {
		resetUrl({ search: { search_term: "hulk" } });
		appRender(<ScreenSearch />);
		const searchbox = screen.getByRole("searchbox");
		fireEvent.focus(searchbox);
		expect(isTextSelected(searchbox)).equal(true);
	});
});
