import React, { useEffect } from "react";
import { getAccountDetails } from "./actions/get-account-details.js";
import "./auth-bar.css";
import { PageWrapper } from "./page-wrapper.jsx";
import {
	selectAccountName,
	selectFetchingAccount,
	selectRejectedAccount,
} from "./selectors.js";
import { useAppDispatch, useAppSelector } from "./store/store.js";

export const AuthBar = (): JSX.Element => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getAccountDetails());
	}, [dispatch]);

	const fetching = useAppSelector(selectFetchingAccount);
	const rejected = useAppSelector(selectRejectedAccount);
	const name = useAppSelector(selectAccountName);

	let text;
	if (rejected) {
		text = "Failed to fetch account.";
	} else if (fetching) {
		text = "Fetching account...";
	} else {
		text = `Welcome, ${name}`;
	}

	return (
		<div className={`auth-bar${rejected ? " auth-bar-error" : ""}`}>
			<PageWrapper>{text}</PageWrapper>
		</div>
	);
};
