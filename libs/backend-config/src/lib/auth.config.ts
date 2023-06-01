import { ConfigType, registerAs } from "@nestjs/config";
import * as Joi from "joi";
import { IAuthConfig } from "@override/open-press-interfaces";
import * as process from "process";

/* istanbul ignore file */

export const authConfig = registerAs("auth", (): IAuthConfig => ({
	hashing: {
		algorithm:  "bcrypt",
		iterations: +(process.env["BCRYPT_HASHING_ITERATION"] || "10"),
		version:    process.env["BCRYPT_ALGORITHM_VERSION"]?.toLowerCase()
		                                                   .startsWith("a") ? "a" : "b",
	},
}));

/**
 * @description This is the type of the config object that will be injected in modules.
 * @example
 * constructor(
 *   \@Inject(AUTH_CONFIG_KEY)
 *   private dbConfig: AuthConfig,
 * ) {}
 */
export const AUTH_CONFIG_KEY = authConfig.KEY;

/**
 * @description This is the type of the config object that will be injected in modules.
 * @example
 * constructor(
 *   \@Inject(AUTH_CONFIG_KEY)
 *   private dbConfig: AuthConfig,
 * ) {}
 */
export type AuthConfig = ConfigType<typeof authConfig>;

/**
 * @description This is the validation schema that will be used to validate the environment.
 * @type {Joi.ObjectSchema<any>}
 */
export const validationSchema = Joi.object({
	BCRYPT_HASHING_ITERATION: Joi.number()
	                             .min(1),
	BCRYPT_ALGORITHM_VERSION: Joi.string()
	                             .valid("a", "b"),
});