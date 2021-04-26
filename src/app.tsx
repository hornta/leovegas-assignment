import React, { useEffect, useState, createContext } from "react";
import { ScreenPopular } from "./screen-popular.jsx";
import { ScreenSearch } from "./screen-search.jsx";
import { Route, useLocation, useHistory } from "react-router-dom";
import { ScreenLogin } from "./screen-login.jsx";
import { PrivateRoute } from "./private-route.jsx";
import { useAuth } from "./utils.js";
import { TopNav } from "./top-nav.jsx";
import { ScreenWatchlist } from "./screen-watchlist.jsx";
import { useAppDispatch } from "./store/store.js";
import { PageWrapper } from "./page-wrapper.jsx";
import { createSession } from "./actions/create-session.js";
import { logout } from "./actions/actions.js";
import { fetchGenres } from "./actions/fetch-genres.js";
import { ScreenMovie } from "./screen-movie.jsx";

const useSession = () => {
	const location = useLocation();
	const history = useHistory();
	const isAuthenticated = useAuth();
	const [requestToken, setRequestToken] = useState<string>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const searchParameters = new URLSearchParams(location.search);
		if (
			searchParameters.has("request_token") &&
			searchParameters.has("approved") &&
			searchParameters.get("approved") === "true"
		) {
			searchParameters.delete("approved");
			const requestToken = searchParameters.get("request_token") as string;
			searchParameters.delete("request_token");
			setRequestToken(requestToken);
			history.replace({
				search: searchParameters.toString(),
			});
		}
	}, [history, location]);

	useEffect(() => {
		if (requestToken && !isAuthenticated) {
			dispatch(createSession(requestToken));
		}
	}, [dispatch, requestToken, isAuthenticated]);
};

const useGenres = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);
};

const Logout = () => {
	const dispatch = useAppDispatch();
	const history = useHistory();
	useEffect(() => {
		dispatch(logout());
		history.push("/");
	}, [dispatch, history]);
	return null;
};

type HeaderContextValue = HTMLElement | null;
export const HeaderContext = createContext<HeaderContextValue>(null);

export const App = (): JSX.Element => {
	useSession();
	useGenres();

	const [headerElement, setHeaderElement] = useState<HeaderContextValue>(null);

	return (
		<>
			<TopNav
				ref={(node) => {
					if (node) {
						setHeaderElement(node);
					}
				}}
			/>
			<HeaderContext.Provider value={headerElement}>
				<PageWrapper>
					<Route exact component={ScreenPopular} path="/" />
					<Route component={ScreenSearch} path="/search" />
					<PrivateRoute component={ScreenWatchlist} path="/watchlist" />
					<Route component={ScreenLogin} path="/login" />
					<PrivateRoute component={Logout} path="/logout" />
				</PageWrapper>
				<Route component={ScreenMovie} path="/movie/:movieId([0-9]+)" />
			</HeaderContext.Provider>
		</>
	);
};
