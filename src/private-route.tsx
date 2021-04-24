import { useAuth } from "./utils.js";
import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

export const PrivateRoute = ({
	component: Component,
	...routeProps
}: RouteProps): JSX.Element => {
	const isAuthenticated = useAuth();
	return (
		<Route
			{...routeProps}
			render={(props) => {
				if (isAuthenticated === true) {
					return <Component {...props} />;
				} else {
					return routeProps.path ? (
						<Redirect
							to={{ pathname: "/login", state: { from: props.location } }}
						/>
					) : null;
				}
			}}
		/>
	);
};
