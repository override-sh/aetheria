import { Algorithm } from "jsonwebtoken";

interface IHashConfig {
	/**
	 * The hashing algorithm used to hash the password.
	 */
	algorithm: "bcrypt";

	/**
	 * The number of iterations used to hash the password.
	 */
	iterations: number;

	/**
	 * The bcrypt algorithm version used to hash the password.
	 */
	version: "a" | "b";
}

interface IJwtConfig {
	/**
	 * The JWT encryption used to sign the token.
	 */
	encryption: "symmetric" | "asymmetric";

	/**
	 * The JWT secret used to sign the token.
	 * Required if encryption is symmetric.
	 */
	secret?: string;

	/**
	 * The JWT public key used to sign the token.
	 * Required if encryption is asymmetric.
	 */
	public_key?: string;

	/**
	 * The JWT private key used to sign the token.
	 * Required if encryption is asymmetric.
	 */
	private_key?: string;

	/**
	 * The JWT algorithm used to sign the token.
	 */
	algorithm: Algorithm;

	/**
	 * The JWT audience claim identifies the recipients that the JWT is intended for.
	 */
	audience: string;

	/**
	 * The time before which the JWT MUST NOT be accepted for processing, specified as seconds since Unix epoch.
	 * Expressed in seconds or a string describing a time span zeit/ms . Eg: 60, “2 days”, “10h”, “7d”
	 */
	expires_in: string;

	/**
	 * The JWT ID claim provides a unique identifier for the JWT.
	 */
	issuer: string;
}

export interface IAuthConfig {
	hashing: IHashConfig;
	jwt: IJwtConfig;
}