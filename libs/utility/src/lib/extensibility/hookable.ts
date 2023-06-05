import { HookConfiguration, IHookable } from "@override/open-press-interfaces";

/**
 * @description This class is used to add hooks to a class.
 * @example
 * class MyClass extends Hookable {
 * 	    constructor() {
 * 	    	super();
 * 	    	this.on("myHook", () => {
 * 	    		console.log("myHook was called");
 * 	        });
 * 	        this.on("myHook", () => {
 * 	    		console.log("myHook was called again");
 * 	    	});
 * 	    }
 * 		public myFunction() {
 * 			this.fire("myHook");	
 * 			// myHook was called
 * 			// myHook was called again
 * 		}
 * 	}
 */
export abstract class Hookable<
	FunctionTypeObject extends {
		[key: string | number | symbol]: (data: any) => void
	},
	HookName extends keyof FunctionTypeObject = keyof FunctionTypeObject,
>
	implements IHookable<FunctionTypeObject, HookName> {
	protected hooks = {} as { [key in HookName]: (FunctionTypeObject[HookName])[] };

	/**
	 * @description This function will add a hook to the hookable object.
	 * @param {string} hook The hook to add.
	 * @param {Function} callback The callback to add.
	 * @returns {Hookable} The hookable object.
	 * @public
	 */
	public listen(
		{
			hook,
			callback,
		}: HookConfiguration<HookName, FunctionTypeObject[HookName]>,
	): Hookable<FunctionTypeObject, HookName> {
		// Initialize the hooks array if it doesn't exist
		if (!this.hooks[hook]) {
			this.hooks[hook] = [];
		}

		this.hooks[hook].push(callback);

		return this;
	}

	/**
	 * @description This function will return all listeners for the given hook.
	 * @param {string} hook The hook to get the listeners for.
	 * @returns {Function[]} The listeners for the given hook.
	 */
	public listeners(hook: HookName): (FunctionTypeObject[HookName])[] {
		if (!this.hooks[hook]) {
			return [];
		}

		return this.hooks[hook];
	}

	/**
	 * @description This function will add a hook to the hookable object that will only be called once.
	 * @param {string} hook The hook to add.
	 * @param {Function} callback The callback to add.
	 * @returns {Hookable} The hookable object.
	 */
	public once(
		{
			hook,
			callback,
		}: HookConfiguration<HookName, FunctionTypeObject[HookName]>,
	): Hookable<FunctionTypeObject, HookName> {
		const onceCallback = (args: object) => {
			callback(args);
			this.off({
				hook,
				callback: onceCallback as FunctionTypeObject[HookName],
			});
		};

		return this.listen({
			hook,
			callback: onceCallback as FunctionTypeObject[HookName],
		});
	}

	/**
	 * @description This function will remove a hook from the hookable object.
	 * @param {string} hook The hook to remove.
	 * @param {Function} callback The callback to remove.
	 * @returns {Hookable} The hookable object.
	 */
	public off(
		{
			hook,
			callback,
		}: HookConfiguration<HookName, FunctionTypeObject[HookName]>,
	): Hookable<FunctionTypeObject, HookName> {
		if (this.hooks[hook]) {
			this.hooks[hook] = this.hooks[hook].filter(cb => cb !== callback);
		}

		return this;
	}

	/**
	 * @description This function will trigger a named hook with the given arguments.
	 * @param {string} hook The hook to trigger.
	 * @param args The arguments to pass to the hook.
	 * @returns {Hookable} The hookable object.
	 */
	protected trigger(
		hook: HookName,
		args: object,
	): Hookable<FunctionTypeObject, HookName> {
		if (this.hooks[hook]) {
			this.hooks[hook].forEach(callback => callback(args));
		}

		return this;
	}
}