import { ConfigType, registerAs } from "@nestjs/config";
import { IDatabaseConfig } from "@open-press/interfaces";
import { z } from "zod";

/* istanbul ignore file */

/**
 * @description This is the callback that will be used to load the config object in the ConfigModule.
 * @example
 * ConfigModule.forRoot({
 *      isGlobal: true,
 *      load: [
 *          databaseConfig,
 *      ]
 * })
 * @type {(() => IDatabaseConfig) & ConfigFactoryKeyHost<ReturnType<() => IDatabaseConfig>>}
 */
export const databaseConfig = registerAs("database", (): IDatabaseConfig => ({
	[DATABASE_CONNECTIONS.default]: {
		host:     process.env["DB_HOST"],
		port:     +(process.env["DB_PORT"] || "27017"),
		username: process.env["DB_USERNAME"],
		password: process.env["DB_PASSWORD"],
		database: process.env["DB_DATABASE"],
	},
}));

/**
 * @description A list of all the connections that are available.
 */
export type DatabaseConnections = keyof DatabaseConfig;

export const DATABASE_CONNECTIONS = {
	default: "default",
} as const;

/**
 * @description This is the key that will be used to inject the config object in modules.
 * @example
 * constructor(
 *   \@Inject(DATABASE_CONFIG_KEY)
 *   private dbConfig: DatabaseConfig,
 * ) {}
 * @type {string}
 */
export const DATABASE_CONFIG_KEY = databaseConfig.KEY;

/**
 * @description This is the type of the config object that will be injected in modules.
 * @example
 * constructor(
 *   \@Inject(DATABASE_CONFIG_KEY)
 *   private dbConfig: DatabaseConfig,
 * ) {}
 */
export type DatabaseConfig = ConfigType<typeof databaseConfig>;

/**
 * @description This is the validation schema that will be used to validate the environment.
 */
export const validationSchema = z.object({
	DB_HOST:     z.string().min(1),
	DB_PORT:     z.coerce.number().min(1024).max(65535).optional(),
	DB_USERNAME: z.string().min(1),
	DB_PASSWORD: z.string().min(1),
	DB_DATABASE: z.string().min(1),
});