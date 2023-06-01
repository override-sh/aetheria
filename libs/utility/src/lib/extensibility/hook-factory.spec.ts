import { Hookable } from "./hookable";
import { hookFactory, makeHook } from "./hook-factory";

describe("hookable", () => {
	let cls: Hookable<{ [x: string]: (value: any) => void }> & {
		fake_fire: (
			hook: string,
			value: any,
		) => void
	};

	beforeEach(() => {
		cls = new class
			extends Hookable<{ [x: string]: (value: any) => void }> {
			public constructor() {
				super();
			}

			public fake_fire(
				hook: string,
				value: any,
			) {
				super.fire(hook, value);
			}
		}();
	});

	it("should call the hook when registered with make method", () => {
		const hook = jest.fn();

		cls.on(makeHook("myHook", hook));
		cls.fake_fire("myHook", "value");

		expect(hook)
			.toHaveBeenCalledWith("value");
	});

	it("should call the hook when registered with factory method", () => {
		const hook = jest.fn();

		cls.listen(hookFactory("myHook", hook));
		cls.fake_fire("myHook", "value");

		expect(hook)
			.toHaveBeenCalledWith("value");
	});
});