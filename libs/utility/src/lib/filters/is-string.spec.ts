import { isString } from "./is-string";

describe("isString", () => {
	it("should return true if value is string", () => {
		expect(isString("test"))
			.toBe(true);
	});
	it("should return false if value is not string", () => {
		expect(isString(1))
			.toBe(false);
	});
});