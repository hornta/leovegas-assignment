import React, { useEffect } from "react";
import { fetchPopular, loadMorePopular } from "./actions/popular-actions.js";
import { MovieListing } from "./movie-listing.jsx";
import { selectHasMorePopularToLoad, selectPopular } from "./selectors.js";
import { useAppDispatch, useAppSelector } from "./store/store.js";
import "./screen-popular.css";
1;

export const ScreenPopular = () => {
	const movies = useAppSelector(selectPopular);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (movies.length === 0) {
			dispatch(fetchPopular());
		}
	}, [dispatch, movies.length]);

	const handleLoadMore = () => {
		dispatch(loadMorePopular());
	};

	const hasMoreToLoad = useAppSelector(selectHasMorePopularToLoad);

	return (
		<div className="screen-popular">
			<MovieListing
				movies={movies}
				onLoadMore={handleLoadMore}
				hasMoreToLoad={hasMoreToLoad}
			/>
		</div>
	);
};
