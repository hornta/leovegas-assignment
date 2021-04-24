import React from "react";
import { NavLink } from "react-router-dom";
import "./top-nav.css";
import { useAuth } from "./utils.js";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { NavExpander } from "./nav-expander.jsx";

export const TopNav = (): JSX.Element => {
	const isAuthenticated = useAuth();

	return (
		<nav className="top-nav">
			<NavLink exact to="/" activeClassName="top-menu-active-item">
				Popular
			</NavLink>
			<NavLink to="/search" activeClassName="top-menu-active-item">
				Search
			</NavLink>
			<NavLink to="/watchlist" activeClassName="top-menu-active-item">
				Watchlist
			</NavLink>
			<NavExpander />

			{isAuthenticated && (
				<NavLink to="/logout" activeClassName="top-menu-active-item">
					<RiLogoutBoxLine /> Logout
				</NavLink>
			)}

			{!isAuthenticated && (
				<NavLink to="/login" activeClassName="top-menu-active-item">
					<RiLoginBoxLine /> Login
				</NavLink>
			)}
		</nav>
	);
};
