import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MovieDetail } from "../types/movie-detail.js";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "../utils.js";

export const fetchMovie = createAsyncThunk(
	"fetchMovie",
	async (movieId: number) => {
		const response = await fetch(makeTmdbPath(`/movie/${movieId}`));
		ensureSuccessfulHttpStatus(response.status);
		const movieDetail = (await response.json()) as MovieDetail;
		return movieDetail;
	}
);
