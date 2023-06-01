import { explodeClasses } from "./explode-classes";

describe("explodeClasses", () => {
	it("explodes classes into an array of classes", () => {
		expect(explodeClasses("foo bar baz"))
			.toEqual([
				"foo",
				"bar",
				"baz",
			]);
	});
});