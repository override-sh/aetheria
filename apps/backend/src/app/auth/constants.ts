/**
 * @description This object contains the hook names that are emitted by the AuthModule.
 */
export const AUTH_MODULE_HOOKS = {
	login_before:  "hook.auth.login.before",
	login_success: "hook.auth.login.success",
	login_failed:  "hook.auth.login.failed",
} as const;