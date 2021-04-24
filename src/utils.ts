import { useSelector } from "react-redux";
import { TMDB_API_KEY } from "./constants.js";
import { selectSession } from "./selectors.js";

export const ensureSuccessfulHttpStatus = (status: number): void => {
	const isSuccessful = status >= 200 && status < 300;
	if (!isSuccessful) {
		throw new Error("Bad http status");
	}
};

export const makeTmdbPath = (subPath: string): string => {
	const apiKeyQuery = `api_key=${TMDB_API_KEY}`;
	let path = `https://api.themoviedb.org/3${subPath}`;
	path += path.includes("?") ? `&${apiKeyQuery}` : `?${apiKeyQuery}`;
	return path;
};

export const useAuth = (): boolean => {
	const sessionId = useSelector(selectSession);
	return sessionId === "" ? false : true;
};
