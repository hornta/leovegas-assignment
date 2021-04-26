import React, { useEffect, useState, useContext, CSSProperties } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./screen-movie.css";
import {
	selectIsFetchingMovie,
	selectMovie,
	selectMovieAccountStates,
} from "./selectors.js";
import { useAppDispatch, useAppSelector } from "./store/store.js";
import { makeTmdbImagePath, useAuth } from "./utils.js";
import useResizeObserver from "@react-hook/resize-observer";
import { IconButton } from "./icon-button";
import { HeaderContext } from "./app.jsx";
import { RiStarLine, RiTimeLine, RiStarFill, RiTimeFill } from "react-icons/ri";
import { PageWrapper } from "./page-wrapper.jsx";
import { MovieGenres } from "./movie-genres.jsx";
import { updateWatchList } from "./actions/update-watchlist.js";
import { markAsFavorite } from "./actions/mark-as-favorite.js";
import { fetchMovieAccountStates } from "./actions/fetch-movie-account-states.js";
import { fetchMovie } from "./actions/fetch-movie.js";

const useHeaderHeight = () => {
	const header = useContext(HeaderContext);

	const [height, setHeight] = useState(() => {
		if (header) {
			header.getBoundingClientRect().height;
		}
		return 0;
	});

	useResizeObserver(header, (entry) => setHeight(entry.contentRect.height));
	return height;
};

const useFadein = (element: HTMLElement | undefined) => {
	useEffect(() => {
		if (element) {
			element.classList.add("screen-movie-fade");
		}
		return () => {
			if (element) {
				element.classList.remove("screen-movie-fade");
			}
		};
	}, [element]);
};

const useFullPageHeight = (element: HTMLElement | undefined) => {
	const headerHeight = useHeaderHeight();
	useEffect(() => {
		if (element) {
			element.style.minHeight = `calc(100vh - ${headerHeight}px)`;
		}
	}, [element, headerHeight]);
};

export const ScreenMovie = (): any => {
	const { movieId } = useParams<{ movieId: string }>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const numericMovieId = Number(movieId);
		dispatch(fetchMovie(numericMovieId));
		dispatch(fetchMovieAccountStates(numericMovieId));
	}, [dispatch, movieId]);

	const authenticated = useAuth();
	const history = useHistory();
	const movieAccountStates = useAppSelector(selectMovieAccountStates);

	const movie = useAppSelector(selectMovie);

	const [mainElement, setMainElement] = useState<HTMLElement>();
	useFadein(mainElement);
	useFullPageHeight(mainElement);

	const isFetchingMovie = useAppSelector(selectIsFetchingMovie);

	if (isFetchingMovie || !movie) {
		return <PageWrapper>Loading movie...</PageWrapper>;
	}

	const styles: CSSProperties = {};
	if (movie.backdrop_path) {
		styles.backgroundImage = `url(${makeTmdbImagePath(
			`/w1280${movie.backdrop_path}`
		)})`;
	}

	const handleAddToWatchlist = () => {
		if (authenticated) {
			dispatch(
				updateWatchList({
					movieId: movie.id,
					add: !movieAccountStates?.watchlist,
				})
			);
		} else {
			history.push("/login");
		}
	};

	const handleFavorite = () => {
		if (authenticated) {
			dispatch(
				markAsFavorite({
					movieId: movie.id,
					favorite: !movieAccountStates?.favorite,
				})
			);
		} else {
			history.push("/login");
		}
	};

	return (
		<main
			className="screen-movie-container"
			style={styles}
			ref={(node) => {
				if (node) {
					setMainElement(node);
				}
			}}
		>
			<PageWrapper className="screen-movie-wrapper">
				<div className="screen-movie">
					<div className="screen-movie-heading">
						<div>
							<h1>{movie.title}</h1>
							<MovieGenres genres={movie.genres.map((genre) => genre.name)} />
						</div>
						<div className="screen-movie-list-actions">
							{movieAccountStates && (
								<>
									<IconButton
										onClick={handleAddToWatchlist}
										icon={
											movieAccountStates.watchlist ? RiTimeFill : RiTimeLine
										}
										aria-label="Add to watchlist"
										title="Add to watchlist"
									/>
									<IconButton
										onClick={handleFavorite}
										icon={movieAccountStates.favorite ? RiStarFill : RiStarLine}
										aria-label="Mark as favorite"
										title="Mark as favorite"
									/>
								</>
							)}
						</div>
					</div>
					<p>{movie.overview}</p>
				</div>
			</PageWrapper>
		</main>
	);
};
