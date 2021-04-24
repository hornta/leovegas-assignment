import type { SearchResultItem } from "./search-result-item.js";

type SearchResult = {
	page: number;
	results: SearchResultItem[];
	total_pages: number;
	total_results: number;
};
