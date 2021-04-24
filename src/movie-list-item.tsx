import React from "react";
import { IconButton } from "./icon-button.jsx";
import { RiTimeLine, RiStarLine } from "react-icons/ri";

export type MovieListItem = {
	id: number;
	title: string;
	poster_path: string;
};

interface MovieListItemProps extends MovieListItem {
	onFavorite: (movieId: number) => void;
	onWatchLater: (movieId: number) => void;
}

export const MovieListItem = ({
	id,
	title,
	poster_path,
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
			/>
			<div className="movie-list-item-details">
				<h2>{title}</h2>
				<IconButton onClick={handleWatchLater} icon={RiTimeLine} />
				<IconButton onClick={handleFavorite} icon={RiStarLine} />
			</div>
		</li>
	);
};
