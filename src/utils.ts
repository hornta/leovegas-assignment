import { selectSession } from "./selectors.js";
import { useAppSelector } from "./store/store.js";

export const ensureSuccessfulHttpStatus = (status: number): void => {
	const isSuccessful = status >= 200 && status < 300;
	if (!isSuccessful) {
		throw new Error("Bad http status");
	}
};

export const makeTmdbPath = (subPath: string): string => {
	const apiKeyQuery = `api_key=${import.meta.env.SNOWPACK_PUBLIC_TMDB_API_KEY}`;
	let path = `https://api.themoviedb.org/3${subPath}`;
	path += path.includes("?") ? `&${apiKeyQuery}` : `?${apiKeyQuery}`;
	return path;
};

export const useAuth = (): boolean => {
	const sessionId = useAppSelector(selectSession);
	return sessionId === "" ? false : true;
};
