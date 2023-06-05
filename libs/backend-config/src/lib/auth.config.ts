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
	jwt:     {
		encryption:  process.env["JWT_ENCRYPTION"]?.toLowerCase() === "asymmetric" ? "asymmetric" : "symmetric",
		secret:      process.env["JWT_SECRET"],
		public_key:  process.env["JWT_PUBLIC_KEY"],
		private_key: process.env["JWT_PRIVATE_KEY"],
		algorithm:   process.env["JWT_ALGORITHM"] as any || "HS512",
		audience:    process.env["JWT_AUDIENCE"] || "open-press",
		expires_in:  process.env["JWT_EXPIRES_IN"] || "2h",
		issuer:      process.env["JWT_ISSUER"] || "open-press",
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

	JWT_ENCRYPTION: Joi.string()
	                   .required()
	                   .valid("symmetric", "asymmetric"),
	JWT_SECRET:     Joi.string()
	                   .when("JWT_ENCRYPTION", {
		                   is:   "symmetric",
		                   then: Joi.required(),
	                   }),
	JWT_PUBLIC_KEY: Joi.string()
	                   .when("JWT_ENCRYPTION", {
		                   is:   "asymmetric",
		                   then: Joi.required(),
	                   }),
	private_key:    Joi.string()
	                   .when("JWT_ENCRYPTION", {
		                   is:   "asymmetric",
		                   then: Joi.required(),
	                   }),
	JWT_ALGORITHM:  Joi.string()
	                   .valid(
		                   "HS256",
		                   "HS384",
		                   "HS512",
		                   "RS256",
		                   "RS384",
		                   "RS512",
		                   "ES256",
		                   "ES384",
		                   "ES512",
		                   "PS256",
		                   "PS384",
		                   "PS512",
	                   ),
	JWT_AUDIENCE:   Joi.string(),
	JWT_EXPIRES_IN: Joi.string(),
	JWT_ISSUER:     Joi.string(),
});