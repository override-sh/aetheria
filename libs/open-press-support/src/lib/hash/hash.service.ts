import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AUTH_CONFIG_KEY, AuthConfig } from "@override/backend-config";

@Injectable()
export class HashService {
	constructor(
		@Inject(AUTH_CONFIG_KEY) private readonly auth_config: AuthConfig,
	) {}

	/**
	 * Create a hash from a password
	 * @param {string} password - The password to hash
	 * @returns {Promise<string>} - The hashed password
	 */
	public async make(password: string): Promise<string> {
		return bcrypt.hash(
			password,
			await bcrypt.genSalt(
				this.auth_config.hashing.iterations,
				this.auth_config.hashing.version,
			),
		);
	}

	/**
	 * Compare a password to a hash
	 * @param {string} password - The password to compare
	 * @param {string} hash - The hash to compare
	 * @returns {Promise<boolean>} - Whether the password matches the hash
	 */
	public async compare(
		password: string,
		hash: string,
	): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
