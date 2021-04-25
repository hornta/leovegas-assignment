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

const cutHex = (h: string) => (h.charAt(0) == "#" ? h.slice(1, 7) : h);
const hexToR = (h: string) => Number.parseInt(cutHex(h).slice(0, 2), 16);
const hexToG = (h: string) => Number.parseInt(cutHex(h).slice(2, 4), 16);
const hexToB = (h: string) => Number.parseInt(cutHex(h).slice(4, 6), 16);

// stolen from https://codepen.io/davidhalford/pen/ywEva?editors=0010
export const getForegroundColor = (hex: string) => {
	const threshold = 130;

	const hRed = hexToR(hex);
	const hGreen = hexToG(hex);
	const hBlue = hexToB(hex);

	const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
	return cBrightness > threshold ? "#000000" : "#ffffff";
};
