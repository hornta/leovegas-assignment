import React from "react";
import "./movie-list-item.css";
import type { MovieWithGenres } from "./types/movie-list-item.js";
import { MovieGenres } from "./movie-genres.jsx";
import { Link } from "react-router-dom";
import { makeTmdbImagePath } from "./utils.js";

interface MovieListItemProps {
	movie: MovieWithGenres;
}

export const MovieListItem = ({ movie }: MovieListItemProps): JSX.Element => (
	<li key={movie.id} className="movie-list-item">
		<Link to={`/movie/${movie.id}`} className="movie-item">
			<img
				src={makeTmdbImagePath(`/w300${movie.poster_path}`)}
				alt={`Poster of ${movie.title}`}
				loading="lazy"
				width="120"
				height="180"
			/>
			<div className="movie-list-item-details">
				<h2>{movie.title}</h2>
				<time className="movie-list-item-release">{movie.release_date}</time>
				<MovieGenres genres={movie.genre_names} />
			</div>
		</Link>
	</li>
);
