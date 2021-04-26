import PropTypes from "prop-types";
import React from "react";
import "./movie-listing.css";
import { MovieListItem } from "./movie-list-item.jsx";
import { Button, ButtonVariant } from "./button.jsx";
import type { MovieWithGenres } from "./types/movie-list-item.js";

type MovieListingProps = {
	movies: MovieWithGenres[];
	onLoadMore: () => void;
	hasMoreToLoad: boolean;
};

export const MovieListing = ({
	movies,
	onLoadMore,
	hasMoreToLoad,
}: MovieListingProps): JSX.Element => (
	<>
		<ul className="movie-list">
			{/* perf could be improved by using something like react-virtualized */}
			{movies.map((movie) => (
				<MovieListItem key={movie.id} movie={movie} />
			))}
		</ul>

		<div className="load-more-container">
			{hasMoreToLoad && (
				<Button variant={ButtonVariant.PRIMARY} onClick={onLoadMore}>
					Load more
				</Button>
			)}
		</div>
	</>
);

MovieListing.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			poster_path: PropTypes.string,
		}).isRequired
	),
	onLoadMore: PropTypes.func,
};
