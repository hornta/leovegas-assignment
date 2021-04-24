import React, { FocusEvent, FormEvent, KeyboardEvent } from "react";
import { useSelector } from "react-redux";
import { selectIsFetching } from "./selectors.ts";
import "./search-form.css";

export type SearchFormChangeHandler = (searchTerm: string) => void;

type SearchFormProps = {
	onSearch: () => void;
	onChange: SearchFormChangeHandler;
	searchTerm: string;
};

const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
	event.currentTarget.select();
};

export const SearchForm: React.FC = ({
	onSearch,
	onChange,
	searchTerm,
}: SearchFormProps): JSX.Element => {
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

	const disableSubmit = useSelector(selectIsFetching);

	return (
		<form role="search" onSubmit={handleSubmit}>
			<input
				type="text"
				value={searchTerm}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				onChange={handleInputChange}
				required
			/>
			<button type="submit" disabled={disableSubmit}>
				Search
			</button>
		</form>
	);
};
