import React from "react";
import "./search-results-listing.css";
import { useAppSelector } from "../../store/store.js";
import {
	selectHasMoreSearchResultsToLoad,
	selectIsFetching,
	selectSearchMovies,
	selectSearchTerm,
	selectTotalResults,
} from "../../selectors.js";
import { MovieListing } from "../../movie-listing";

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
