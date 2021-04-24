import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadMoreSearchResults, searchMovies } from "./actions.js";
import { SearchResultsListing } from "./search-results-listing.jsx";
import { SearchForm } from "./search-form.tsx";
import type { SearchFormChangeHandler } from "./search-form.jsx";
import { selectCurrentPage } from "./selectors.js";
import "./screen-search.css";

const useSearchTerm = () =>
	useState<string>(() => {
		const search = new URLSearchParams(location.search);
		if (search.has("search_term")) {
			return search.get("search_term");
		}
		return "";
	});

const useInitialFetch = (searchTerm: string) => {
	const currentPage = useSelector(selectCurrentPage);

	const dispatch = useDispatch();
	useEffect(() => {
		if (currentPage === 0 && searchTerm.length > 0) {
			dispatch(searchMovies(searchTerm));
		}
		// perform initial search when user lands on search page with a search term
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, currentPage]);
};

export const ScreenSearch = (): JSX.Element => {
	const [searchTerm, setSearchTerm] = useSearchTerm();
	const dispatch = useDispatch();
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
			<SearchForm onSearch={performSearch} onChange={handleChangeSearchTerm} />
			<SearchResultsListing onLoadMore={handleLoadMore} />
		</div>
	);
};
