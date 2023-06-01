import { updateValueAtIndex } from "./update-value-at-index";

describe("updateValueAtIndex", () => {
	it("can update value at index", () => {
		const array = [
			1,
			2,
			3,
		];
		expect(updateValueAtIndex(array, 1, 4))
			.toEqual([
				1,
				4,
				3,
			]);
	});
});