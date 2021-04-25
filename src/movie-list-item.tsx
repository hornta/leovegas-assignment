import React from "react";
import { IconButton } from "./icon-button.jsx";
import { RiTimeLine, RiStarLine } from "react-icons/ri";
import "./movie-list-item.css";
import type { MovieWithGenres } from "./types/movie-list-item.js";
import { MovieGenres } from "./movie-genres.jsx";

interface MovieListItemProps {
	movie: MovieWithGenres;
	onFavorite: (movieId: number) => void;
	onWatchLater: (movieId: number) => void;
}

export const MovieListItem = ({
	movie,
	onFavorite,
	onWatchLater,
}: MovieListItemProps): JSX.Element => {
	const handleFavorite = () => {
		onFavorite(movie.id);
	};

	const handleWatchLater = () => {
		onWatchLater(movie.id);
	};

	return (
		<li key={movie.id} className="movie-list-item">
			<img
				src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
				alt={`Poster of ${movie.title}`}
				loading="lazy"
				width="120"
				height="180"
			/>
			<div className="movie-list-item-details">
				<h2>{movie.title}</h2>
				<time className="movie-list-item-release">{movie.release_date}</time>
				<MovieGenres genres={movie.genre_names} />
				<IconButton
					onClick={handleWatchLater}
					icon={RiTimeLine}
					aria-label="Add to watchlist"
				/>
				<IconButton
					onClick={handleFavorite}
					icon={RiStarLine}
					aria-label="Mark as favorite"
				/>
			</div>
		</li>
	);
};
