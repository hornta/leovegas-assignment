import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store/store.js";
import PropTypes from "prop-types";
import { render, RenderOptions } from "@testing-library/react";
import type { RootState } from "./reducers/index.js";
import { BrowserRouter } from "react-router-dom";
import { accountReducer } from "./reducers/account-reducer.js";

interface AllProvidersProps {
	preloadedState?: RootState;
	children: ReactNode;
}

const AllProviders: FC<AllProvidersProps> = ({ preloadedState, children }) => {
	const store = makeStore(preloadedState);
	return (
		<BrowserRouter>
			<Provider store={store}>{children}</Provider>
		</BrowserRouter>
	);
};

AllProviders.propTypes = {
	preloadedState: PropTypes.any,
	children: PropTypes.node,
};

interface AppRenderOptions {
	testingLibraryOptions?: RenderOptions;
	providerProps?: AllProvidersProps;
}

export const appRender = (
	ui: React.ReactElement,
	options?: AppRenderOptions
) => {
	const Wrapper: FC = (props: any) => (
		<AllProviders {...props} {...options?.providerProps} />
	);

	render(ui, {
		wrapper: Wrapper,
		...options?.testingLibraryOptions,
	});
};

interface ResetUrlArguments {
	pathname?: string;
	search?: Record<string, string>;
}
export const resetUrl = ({ pathname, search }: ResetUrlArguments = {}) => {
	const url = new URL(pathname ?? "/", window.location.origin);
	for (const [key, value] of Object.entries(search ?? {})) {
		url.searchParams.set(key, value);
	}
	history.pushState({}, "", url.toString());
};
export const isTextSelected = (input: HTMLInputElement) => {
	if (typeof input.selectionStart == "number") {
		return (
			input.selectionStart == 0 && input.selectionEnd == input.value.length
		);
	}
};
