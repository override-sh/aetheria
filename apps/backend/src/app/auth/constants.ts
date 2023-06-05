/**
 * @description This object contains the hook names that are emitted by the Passport local strategy.
 */
export const PASSPORT_LOCAL_STRATEGY_EVENTS = {
	before_validation:  "hook.auth.validation.before",
	validation_success: "hook.auth.validation.success",
	validation_failed:  "hook.auth.validation.failed",
} as const;

/**
 * @description This object contains the hook names that are emitted by the Auth service.
 * @type {{validation_success: "hook.auth.validation.success", user_logged_in: "hook.auth.user.logged_in",
 *     before_validation: "hook.auth.validation.before", validation_failed: "hook.auth.validation.failed"}}
 */
export const AUTH_SERVICE_EVENTS = {
	before_validation:  "hook.auth.validation.before",
	validation_success: "hook.auth.validation.success",
	validation_failed:  "hook.auth.validation.failed",
	user_logged_in:     "hook.auth.user.logged_in",
} as const;

/**
 * @description This object contains the hook names that are emitted by the Auth controller.
 * @type {{before_login: "hook.auth.login.before", before_profile: "hook.auth.profile.before", after_profile:
 *     "hook.auth.profile.after", after_login: "hook.auth.login.after"}}
 */
export const AUTH_CONTROLLER_EVENTS = {
	before_validation: "hook.auth.login.before",
	after_login:       "hook.auth.login.after",
	before_profile:    "hook.auth.profile.before",
	after_profile:     "hook.auth.profile.after",
} as const;

export const PASSPORT_JWT_STRATEGY_EVENTS = {
	before_validation:  "hook.auth.validation.before",
	validation_success: "hook.auth.validation.success",
	validation_failed:  "hook.auth.validation.failed",
} as const;

