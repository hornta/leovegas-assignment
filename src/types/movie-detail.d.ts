interface MovieDetailGenre {
	id: number;
	name: string;
}

interface ProductionCompany {
	name: string;
	id: number;
	logo_path: null | string;
	origin_country: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	iso_639_1: string;
	name: string;
}

enum MovieDetailStatus {
	RUMORED = "Rumored",
	PLANNED = "Planned",
	IN_PRODUCTION = "In Production",
	POST_PRODUCTION = "Post Production",
	RELEASED = "Released",
	CANCELED = "Canceled",
}

export interface MovieDetail {
	adult: boolean;
	backdrop_path: null | string;
	belongs_to_collection: null | Record<string, unknown>;
	budget: number;
	genres: MovieDetailGenre[];
	homepage: null | string;
	id: number;
	imdb_id: null | string;
	original_language: string;
	original_title: string;
	overview: null | string;
	popularity: number;
	poster_path: null | string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: null | number;
	spoken_languages: SpokenLanguage[];
	status: MovieDetailStatus;
	tagline: null | string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
