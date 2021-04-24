import PropTypes, { InferProps } from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./movie-listing.css";
import { useAuth } from "./utils.js";
import { addToWatchLaterList } from "./actions.js";
import { MovieListItem } from "./movie-list-item.jsx";

type MovieListingProps = {
	movies: MovieListItem[];
};

type MovieListingProperties = InferProps<typeof MovieListingPropTypes>;

export const MovieListing: React.FC<MovieListingProperties> = ({
	movies,
}: MovieListingProps) => {
	const dispatch = useDispatch();
	const authenticated = useAuth();
	const history = useHistory();

	const handleAddToWatchlist = (movieId: number) => {
		if (authenticated) {
			dispatch(addToWatchLaterList(movieId));
		} else {
			history.push("/login");
		}
	};

	const handleFavorite = (movieId: number) => {
		if (authenticated) {
			dispatch();
		} else {
			history.push("/login");
		}
	};

	return (
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
