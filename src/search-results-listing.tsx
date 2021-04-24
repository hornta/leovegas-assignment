import React from "react";
import { useSelector } from "react-redux";
import { MovieListing } from "./movie-listing.jsx";
import { selectHasMoreToLoad } from "./selectors.js";
import {
	selectIsFetching,
	selectKeyword,
	selectSearchResults,
	selectTotalResults,
} from "./selectors.ts";
import "./search-results-listing.css";
import { Button, ButtonVariant } from "./button.jsx";

type SearchResultsListingProps = {
	onLoadMore: () => void;
};

export const SearchResultsListing: React.FC = ({
	onLoadMore,
}: SearchResultsListingProps) => {
	const searchResults = useSelector(selectSearchResults);
	const keyword = useSelector(selectKeyword);
	const totalResults = useSelector(selectTotalResults);
	const isFetching = useSelector(selectIsFetching);
	const hasMoreToLoad = useSelector(selectHasMoreToLoad);

	if (keyword.length === 0) {
		return null;
	}

	if (isFetching) {
		return "Loading movies...";
	}

	return (
		<>
			<div className="search-results-listing">
				{totalResults} results for <strong>&quot;{keyword}&quot;</strong> found
			</div>
			<MovieListing movies={searchResults} />
			<div className="load-more-container">
				{hasMoreToLoad && (
					<Button variant={ButtonVariant.PRIMARY} onClick={onLoadMore}>
						Load more
					</Button>
				)}
			</div>
		</>
	);
};
