import { AuthModuleHooksCallback } from "./types";
import { HookConfiguration } from "@override/open-press-interfaces";
import { makeHook } from "@override/utility/server";

/**
 * This function creates a hook configuration object.
 *
 * @param {keyof AuthModuleHooksCallback} K The type of the hook, which is a key of the AuthModuleHooksCallback type.
 * @param {AuthModuleHooksCallback[K]} C type of the callback, automatically inferred from the hook.
 *
 * @param {K} hook The hook to create a configuration for.
 * @param {C} callback The callback to create a configuration for.
 * @returns {HookConfiguration<K, C>}
 */
export const makeAuthModuleHook = <K extends keyof AuthModuleHooksCallback, C extends AuthModuleHooksCallback[K] = AuthModuleHooksCallback[K]>(
	hook: K,
	callback: C,
): HookConfiguration<K, C> => {
	return makeHook(hook, callback);
};

export const authModuleHookFactory = makeAuthModuleHook;