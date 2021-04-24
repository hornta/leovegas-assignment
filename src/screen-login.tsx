import React, { FC, useEffect, useState } from "react";
import { BASE_PATH } from "./constants.js";
import { makeTmdbPath } from "./utils.js";

type CreateRequestTokenResponse = {
	request_token: string;
};

export const ScreenLogin = () => {
	const [requestToken, setRequestToken] = useState<string>();

	const handleLogin = async (): void => {
		try {
			const response = await fetch(makeTmdbPath("/authentication/token/new"));
			const {
				request_token,
			} = (await response.json()) as CreateRequestTokenResponse;
			setRequestToken(request_token);
		} catch {
			// make better error handling
			alert("Something failed!");
		}
	};

	useEffect(() => {
		if (requestToken) {
			location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${BASE_PATH}`;
		}
	}, [requestToken]);

	return (
		<button type="button" onClick={handleLogin}>
			Login with TMDB
		</button>
	);
};
