import { ConfigType, registerAs } from "@nestjs/config";
import { IAuthConfig } from "@override/open-press-interfaces";
import * as process from "process";
import { z } from "zod";

/* istanbul ignore file */

export const authConfig = registerAs("auth", (): IAuthConfig => ({
	hashing: {
		algorithm:  "bcrypt",
		iterations: +(process.env["BCRYPT_HASHING_ITERATION"] || "10"),
		version:    process.env["BCRYPT_ALGORITHM_VERSION"]?.toLowerCase().startsWith("a") ? "a" : "b",
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
 */
export const validationSchema = z
	.object({
		BCRYPT_HASHING_ITERATION: z.number().min(1).optional(),
		BCRYPT_ALGORITHM_VERSION: z.enum(["a", "b"]).optional(),

		JWT_ENCRYPTION:  z.enum([
			"symmetric", "asymmetric",
		]),
		JWT_SECRET:      z.string().optional(),
		JWT_PUBLIC_KEY:  z.string().optional(),
		JWT_PRIVATE_KEY: z.string().optional(),
		JWT_ALGORITHM:   z.enum([
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
			],
		).optional(),
		JWT_AUDIENCE:    z.string().optional(),
		JWT_EXPIRES_IN:  z.string().optional(),
		JWT_ISSUER:      z.string().optional(),
	})
	.superRefine((
		obj,
		ctx,
	): obj is Omit<typeof obj, "JWT_PUBLIC_KEY" | "JWT_PRIVATE_KEY"> & {
		JWT_PUBLIC_KEY: string,
		JWT_PRIVATE_KEY: string,
	} => {
		if (obj.JWT_ENCRYPTION !== "asymmetric") {
			return false;
		}

		if (!obj.JWT_PUBLIC_KEY || !obj.JWT_PRIVATE_KEY) {
			ctx.addIssue({
				code:     "invalid_type",
				message:  "You must provide a public and private key for asymmetric encryption.",
				path:     ["JWT_PUBLIC_KEY", "JWT_PRIVATE_KEY"],
				expected: "string",
				received: "undefined",
			});
			return false;
		}

		return true;
	})
	.superRefine((
			obj,
			ctx,
		): obj is Omit<typeof obj, "JWT_SECRET"> & {
			JWT_SECRET: string,
		} => {
			if (obj.JWT_ENCRYPTION !== "symmetric") {
				return false;
			}
			if (!obj.JWT_SECRET) {
				ctx.addIssue({
					code:     "invalid_type",
					message:  "You must provide a secret for symmetric encryption.",
					path:     ["JWT_SECRET"],
					expected: "string",
					received: "undefined",
				});
				return false;
			}
			return true;
		},
	);