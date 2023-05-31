import { EnvValidationHooksCallback } from "./types";
import { HookConfiguration } from "@override/open-press-interfaces";
import { makeHook } from "@override/utility/server";

/**
 * This function creates a hook configuration object.
 *
 * @typeParam K The type of the hook, which is a key of the EnvValidationHooksCallback type.
 * @param <C> The type of the callback, automatically inferred from the hook.
 *
 * @param {K} hook The hook to create a configuration for.
 * @param {C} callback The callback to create a configuration for.
 * @returns {HookConfiguration<K, C>}
 */
export const makeEnvHook = <K extends keyof EnvValidationHooksCallback, C extends EnvValidationHooksCallback[K] = EnvValidationHooksCallback[K]>(
	hook: K,
	callback: C,
): HookConfiguration<K, C> => {
	return makeHook(hook, callback);
};

export const envHookFactory = makeEnvHook;