import * as React from "react";
import { render } from "@testing-library/react";
import { expect } from "chai";
import { App } from "./app_temp.jsx";

describe("<App>", () => {
	it("renders learn react link", () => {
		const { getByText } = render(<App />);
		const linkElement = getByText(/learn react/i);
		expect(document.body.contains(linkElement));
	});
});
