import React, { useEffect } from "react";

import {
	fetchWatchlist,
	loadMoreWatchlist,
} from "./actions/watchlist-actions.js";
import { MovieListing } from "./movie-listing.jsx";
import "./screen-watchlist.css";
import { selectWatchlist } from "./selectors.js";
import { useAppDispatch, useAppSelector } from "./store.js";

export const ScreenWatchlist = (): JSX.Element => {
	const movies = useAppSelector(selectWatchlist);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchWatchlist());
	}, [dispatch]);

	const handleLoadMore = () => {
		dispatch(loadMoreWatchlist());
	};

	return (
		<div className="screen-watchlist">
			<MovieListing movies={movies} onLoadMore={handleLoadMore} />
		</div>
	);
};
