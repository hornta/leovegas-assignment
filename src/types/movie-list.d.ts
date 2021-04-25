import type { Movie } from "./movie-list-item.js";

type MovieList = {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
};
