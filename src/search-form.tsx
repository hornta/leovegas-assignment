import React, { FocusEvent, FormEvent, KeyboardEvent } from "react";
import "./search-form.css";
import { selectIsFetching } from "./selectors.js";
import { useAppSelector } from "./store/store.js";

export type SearchFormChangeHandler = (searchTerm: string) => void;

type SearchFormProps = {
	onSearch: () => void;
	onChange: SearchFormChangeHandler;
	searchTerm: string;
};

const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
	event.currentTarget.select();
};

export const SearchForm = ({
	onSearch,
	onChange,
	searchTerm,
}: SearchFormProps): JSX.Element => {
	const disableSubmit = useAppSelector(selectIsFetching);

	const handleSubmit = (event: FormEvent): void => {
		event.preventDefault();
		onSearch();
	};

	const handleInputChange = (
		event: React.FormEvent<HTMLInputElement>
	): void => {
		onChange(event.currentTarget.value);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === "Enter") {
			event.currentTarget.blur();
			onSearch();
		}
	};

	return (
		<form role="search" onSubmit={handleSubmit}>
			<input
				type="text"
				value={searchTerm}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				onChange={handleInputChange}
				required
				placeholder="Example: Iron Man"
			/>
			<button type="submit" disabled={disableSubmit}>
				Search
			</button>
		</form>
	);
};
