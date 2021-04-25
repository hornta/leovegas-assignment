import React, { useEffect } from "react";

import {
	fetchWatchlist,
	loadMoreWatchlist,
} from "./actions/watchlist-actions.js";
import { MovieListing } from "./movie-listing.jsx";
import "./screen-watchlist.css";
import {
	selectHasMoreSearchResultsToLoad,
	selectHasMoreWatchlistToLoad,
	selectWatchlist,
} from "./selectors.js";
import { useAppDispatch, useAppSelector } from "./store/store.js";

export const ScreenWatchlist = (): JSX.Element => {
	const movies = useAppSelector(selectWatchlist);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (movies.length === 0) {
			dispatch(fetchWatchlist());
		}
	}, [dispatch, movies.length]);

	const handleLoadMore = () => {
		dispatch(loadMoreWatchlist());
	};

	const hasMoreToLoad = useAppSelector(selectHasMoreWatchlistToLoad);

	return (
		<div className="screen-watchlist">
			<MovieListing
				movies={movies}
				onLoadMore={handleLoadMore}
				hasMoreToLoad={hasMoreToLoad}
			/>
		</div>
	);
};
