import { tap } from "./tap";

describe("tap", () => {
	it("should call the function with the value", () => {
		const value = "value";
		const fn = jest.fn();
		tap(value, fn);
		expect(fn)
			.toHaveBeenCalledWith(value);
	});
});