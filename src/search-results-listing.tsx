import React from "react";
import { MovieListing } from "./movie-listing.jsx";
import {
	selectIsFetching,
	selectSearchTerm,
	selectTotalResults,
	selectHasMoreSearchResultsToLoad,
	selectSearchMovies,
} from "./selectors";
import "./search-results-listing.css";
import { useAppSelector } from "./store/store.js";

type SearchResultsListingProps = {
	onLoadMore: () => void;
};

export const SearchResultsListing = ({
	onLoadMore,
}: SearchResultsListingProps): any => {
	const searchResults = useAppSelector(selectSearchMovies);
	const searchTerm = useAppSelector(selectSearchTerm);
	const totalResults = useAppSelector(selectTotalResults);
	const isFetching = useAppSelector(selectIsFetching);
	const hasMoreToLoad = useAppSelector(selectHasMoreSearchResultsToLoad);

	if (searchTerm.length === 0) {
		return null;
	}

	if (isFetching) {
		return "Loading movies...";
	}

	return (
		<>
			<div className="search-results-listing">
				{totalResults} results for <strong>&quot;{searchTerm}&quot;</strong>{" "}
				found
			</div>
			<MovieListing
				movies={searchResults}
				onLoadMore={onLoadMore}
				hasMoreToLoad={hasMoreToLoad}
			/>
		</>
	);
};
