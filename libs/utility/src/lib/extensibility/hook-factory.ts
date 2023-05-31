import { HookConfiguration } from "@override/open-press-interfaces";

/**
 * @description This function will create a hook configuration.
 * @type {K} The type of the hook.
 * @type {C} The type of the callback.
 * @param {K} hook The hook to create a configuration for.
 * @param {C} callback The callback to create a configuration for.
 * @returns {HookConfiguration<K, C>} The hook configuration.
 */
export const makeHook = <K, C>(
	hook: K,
	callback: C,
): HookConfiguration<K, C> => {
	return {
		hook,
		callback,
	};
};

export const hookFactory = makeHook;