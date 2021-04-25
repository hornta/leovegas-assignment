import React from "react";
import { IconButton } from "./icon-button.jsx";
import { RiTimeLine, RiStarLine } from "react-icons/ri";
import "./movie-list-item.css";

export type MovieListItem = {
	id: number;
	title: string;
	poster_path: string;
	release_date: string;
};

interface MovieListItemProps extends MovieListItem {
	onFavorite: (movieId: number) => void;
	onWatchLater: (movieId: number) => void;
}

export const MovieListItem = ({
	id,
	title,
	poster_path,
	release_date,
	onFavorite,
	onWatchLater,
}: MovieListItemProps): JSX.Element => {
	const handleFavorite = () => {
		onFavorite(id);
	};

	const handleWatchLater = () => {
		onWatchLater(id);
	};

	return (
		<li key={id} className="movie-list-item">
			<img
				src={`https://image.tmdb.org/t/p/w300${poster_path}`}
				alt={`Poster of ${title}`}
				loading="lazy"
				width="120"
				height="180"
			/>
			<div className="movie-list-item-details">
				<h2>{title}</h2>
				<time className="movie-list-item-release">{release_date}</time>
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
