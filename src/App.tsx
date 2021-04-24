import React, { useEffect, useState } from "react";
import { ScreenPopular } from "./screen-popular.js";
import { ScreenSearch } from "./screen-search.jsx";
import { Route, useLocation, useHistory } from "react-router-dom";
import { ScreenMovie } from "./screen-movie.jsx";
import { useDispatch } from "react-redux";
import { createSession, logout } from "./actions.js";
import { ScreenLogin } from "./screen-login.jsx";
import { PrivateRoute } from "./private-route.jsx";
import { useAuth } from "./utils.js";
import { TopNav } from "./top-nav.jsx";
import { AuthBar } from "./auth-bar.jsx";

const useSession = () => {
	const location = useLocation();
	const history = useHistory();
	const isAuthenticated = useAuth();
	const [requestToken, setRequestToken] = useState<string>();
	const dispatch = useDispatch();

	useEffect(() => {
		const searchParameters = new URLSearchParams(location.search);
		if (
			searchParameters.has("request_token") &&
			searchParameters.has("approved") &&
			searchParameters.get("approved") === "true"
		) {
			searchParameters.delete("approved");
			const requestToken = searchParameters.get("request_token");
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

const Logout = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		dispatch(logout());
		history.push("/");
	}, [dispatch, history]);
	return null;
};

export const App = (): JSX.Element => {
	useSession();

	return (
		<>
			<PrivateRoute component={AuthBar} />
			<TopNav />
			<Route exact component={ScreenPopular} path="/" />
			<Route component={ScreenSearch} path="/search" />
			<PrivateRoute component={ScreenSearch} path="/watchlist" />
			<Route component={ScreenMovie} path="/movie/:id([0-9]+)" />
			<Route component={ScreenLogin} path="/login" />
			<PrivateRoute component={Logout} path="/logout" />
		</>
	);
};
