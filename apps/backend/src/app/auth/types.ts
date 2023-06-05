import { AUTH_MODULE_HOOKS } from "./constants";
import { LocalStrategy } from "./strategies";
import { UserDocument } from "@override/open-press-models";

type AuthHookLoginBeforeCallback = (
	data: {
		caller: LocalStrategy,
		email: string,
		password: string
	},
) => void;

type AuthHookLoginSuccessCallback = (
	data: {
		caller: LocalStrategy,
		user: UserDocument
	},
) => void;

type AuthHookLoginFailedCallback = (
	data: {
		caller: LocalStrategy
		email: string
		password: string
	},
) => void;

/////////////
// Exports //
/////////////

/**
 * @description This type contains the hook callbacks that are emitted by the AuthModule.
 */
export type AuthModuleHooksCallback = {
	[AUTH_MODULE_HOOKS.login_before]: AuthHookLoginBeforeCallback
	[AUTH_MODULE_HOOKS.login_success]: AuthHookLoginSuccessCallback
	[AUTH_MODULE_HOOKS.login_failed]: AuthHookLoginFailedCallback
}