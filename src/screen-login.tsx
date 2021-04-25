import React, { useEffect, useState } from "react";
import { Button, ButtonVariant } from "./button.jsx";
import { makeTmdbPath } from "./utils.js";
import "./screen-login.css";

type CreateRequestTokenResponse = {
	request_token: string;
};

export const ScreenLogin = () => {
	const [requestToken, setRequestToken] = useState<string>();

	const handleLogin = async () => {
		try {
			const response = await fetch(makeTmdbPath("/authentication/token/new"));
			const {
				request_token,
			} = (await response.json()) as CreateRequestTokenResponse;
			setRequestToken(request_token);
		} catch {
			// handle error
			alert("Something failed!");
		}
	};

	useEffect(() => {
		if (requestToken) {
			location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${
				// this could probably be typed somewhere else
				import.meta.env.SNOWPACK_PUBLIC_BASE_PATH as string
			}`;
		}
	}, [requestToken]);

	return (
		<main className="screen-login">
			<p>Authentication is required in order to maintain your own lists.</p>
			<Button variant={ButtonVariant.PRIMARY} onClick={handleLogin}>
				Login with TMDB
			</Button>
		</main>
	);
};
