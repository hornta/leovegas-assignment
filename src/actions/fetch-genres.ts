import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Genres } from "../types/genres.js";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "../utils.js";

interface MovieGenreResponse {
	id: number;
	name: string;
}

interface MovieGenreListResponse {
	genres: MovieGenreResponse[];
}

export const fetchGenres = createAsyncThunk("fetchGenres", async () => {
	const response = await fetch(makeTmdbPath("/genre/movie/list"));
	ensureSuccessfulHttpStatus(response.status);
	const jsonResponse = (await response.json()) as MovieGenreListResponse;
	const genres: Genres = {};
	for (const genre of jsonResponse.genres) {
		genres[genre.id] = genre.name;
	}

	return genres;
});
