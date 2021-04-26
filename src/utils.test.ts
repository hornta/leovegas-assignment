import { expect } from "chai";
import { getForegroundColor } from "./utils.js";

describe("utils", () => {
	it("given a dark bg color -> white", () => {
		expect(getForegroundColor("#010101")).equal("#ffffff");
	});

	it("given a light bg color -> black", () => {
		expect(getForegroundColor("#e5e5e2")).equal("#000000");
	});
});
