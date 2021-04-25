import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import "./movie-listing.css";
import { useAuth } from "./utils.js";
import { updateWatchList } from "./actions/actions.js";
import { MovieListItem } from "./movie-list-item.jsx";
import { Button, ButtonVariant } from "./button.jsx";
import { selectHasMoreToLoad } from "./selectors.js";
import { useAppDispatch, useAppSelector } from "./store.js";

type MovieListingProps = {
	movies: MovieListItem[];
	onLoadMore: () => void;
};

export const MovieListing = ({
	movies,
	onLoadMore,
}: MovieListingProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const authenticated = useAuth();
	const history = useHistory();

	const handleAddToWatchlist = (movieId: number) => {
		if (authenticated) {
			dispatch(updateWatchList({ movieId, add: true }));
		} else {
			history.push("/login");
		}
	};

	const handleFavorite = (movieId: number) => {
		if (authenticated) {
			// dispatch();
		} else {
			history.push("/login");
		}
	};

	const hasMoreToLoad = useAppSelector(selectHasMoreToLoad);

	return (
		<>
			<ul className="movie-list">
				{movies.map((movie) => (
					<MovieListItem
						key={movie.id}
						{...movie}
						onFavorite={handleFavorite}
						onWatchLater={handleAddToWatchlist}
					/>
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
};

MovieListing.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			poster_path: PropTypes.string.isRequired,
		}).isRequired
	),
	onLoadMore: PropTypes.func,
};
