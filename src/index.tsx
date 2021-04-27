import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { App } from "./app";
import tmdbLogo from "./tmdb-logo.svg";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
		<a
			href="https://www.themoviedb.org/"
			target="_blank"
			className="data-provider-attribution"
			rel="noreferrer"
			title="Opens in new window"
		>
			Data from <img loading="lazy" alt="TMDB Logotype" src={tmdbLogo} />
		</a>
	</React.StrictMode>,
	document.querySelector("#root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
	import.meta.hot.accept();
}
