import { Hookable } from "./hookable";

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
				super.trigger(hook, value);
			}
		}();
	});

	it("should call the hook when registered with listen", () => {
		const hook = jest.fn();

		cls.listen({
			hook:     "myHook",
			callback: hook,
		});
		cls.fake_fire("myHook", "value");

		expect(hook)
			.toHaveBeenCalledWith("value");
	});

	it("should call return all registered listeners", () => {
		const hook = jest.fn();

		cls.listen({
			hook:     "myHook",
			callback: hook,
		});

		expect(cls.listeners("myHook"))
			.toEqual([hook]);

		expect(cls.listeners("non-existent-hook"))
			.toEqual([]);
	});

	it("should call the hook only once", () => {
		const hook = jest.fn();

		cls.once({
			hook:     "myHook",
			callback: hook,
		});
		cls.fake_fire("myHook", "value");
		cls.fake_fire("myHook", "value");

		expect(hook)
			.toHaveBeenCalledTimes(1);
	});

	it("should disable the registered hook", () => {
		const hook = jest.fn();

		cls.listen({
			hook:     "myHook",
			callback: hook,
		});

		expect(cls.listeners("myHook"))
			.toEqual([hook]);

		cls.off({
			hook:     "myHook",
			callback: hook,
		});

		expect(cls.listeners("myHook"))
			.toEqual([]);
	});
});