import type { MovieListItem } from "./movie-list-item.js";

type MovieList = {
	page: number;
	results: MovieListItem[];
	total_pages: number;
	total_results: number;
};
