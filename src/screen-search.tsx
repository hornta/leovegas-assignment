import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SearchResultsListing } from "./search-results-listing.jsx";
import { SearchForm } from "./search-form.jsx";
import type { SearchFormChangeHandler } from "./search-form.jsx";
import { selectCurrentPageSearch } from "./selectors.js";
import "./screen-search.css";
import { useAppDispatch, useAppSelector } from "./store/store.js";
import {
	loadMoreSearchResults,
	searchMovies,
} from "./actions/search-actions.js";

const useSearchTerm = () =>
	useState<string>(() => {
		const search = new URLSearchParams(location.search);
		if (search.has("search_term")) {
			return search.get("search_term") as string;
		}
		return "";
	});

const useInitialFetch = (searchTerm: string) => {
	const currentPage = useAppSelector(selectCurrentPageSearch);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (currentPage === 0 && searchTerm.length > 0) {
			dispatch(searchMovies(searchTerm));
		}
		// perform initial search when user lands on search page with a search term
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, currentPage]);
};

export const ScreenSearch = () => {
	const [searchTerm, setSearchTerm] = useSearchTerm();
	const dispatch = useAppDispatch();
	const history = useHistory();

	useInitialFetch(searchTerm);

	const performSearch = () => {
		dispatch(searchMovies(searchTerm));
		history.replace({
			search: `?search_term=${searchTerm}`,
		});
	};

	const handleLoadMore = () => {
		dispatch(loadMoreSearchResults(searchTerm));
	};

	const handleChangeSearchTerm: SearchFormChangeHandler = (
		searchTerm: string
	) => {
		setSearchTerm(searchTerm);
	};

	return (
		<div className="screen-search">
			<SearchForm
				onSearch={performSearch}
				searchTerm={searchTerm}
				onChange={handleChangeSearchTerm}
			/>
			<SearchResultsListing onLoadMore={handleLoadMore} />
		</div>
	);
};
