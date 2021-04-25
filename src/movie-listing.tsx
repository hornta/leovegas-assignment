import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import "./movie-listing.css";
import { useAuth } from "./utils.js";
import { MovieListItem } from "./movie-list-item.jsx";
import { Button, ButtonVariant } from "./button.jsx";
import { useAppDispatch } from "./store/store.js";
import { updateWatchList } from "./actions/update-watchlist.js";

type MovieListingProps = {
	movies: MovieListItem[];
	onLoadMore: () => void;
	hasMoreToLoad: boolean;
};

export const MovieListing = ({
	movies,
	onLoadMore,
	hasMoreToLoad,
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
			dispatch(updateWatchList({ movieId, add: true }));
		} else {
			history.push("/login");
		}
	};

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
			poster_path: PropTypes.string,
		}).isRequired
	),
	onLoadMore: PropTypes.func,
};
