import "server-only";

/**
 * @description This is the interface of the config object that will be loaded in the ConfigModule.
 */
export interface IDatabaseConfig {
	/**
	 * @description The host of the database.
	 */
	host?: string;

	/**
	 * @description The port of the database.
	 */
	port: number;

	/**
	 * @description The username of the database.
	 */
	username?: string;

	/**
	 * @description The password of the database.
	 */
	password?: string;

	/**
	 * @description The name of the database.
	 */
	database?: string;
}