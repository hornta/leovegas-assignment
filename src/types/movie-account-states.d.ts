interface MovieRating {
	value: number;
}
export interface MovieAccountStates {
	id: number;
	favorite: boolean;
	rated: boolean | MovieRating;
	watchlist: boolean;
}
