import { Injectable } from "@nestjs/common";
import { UserDocument, UserService } from "@override/open-press-models";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UserService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * This method validates the user's credentials.
	 * @param {string} email The user's email.
	 * @param {string} psw The user's password.
	 * @returns {Promise<null | UserDocument>}
	 */
	async validate(
		email: string,
		psw: string,
	): Promise<null | UserDocument> {
		try {
			return await this.usersService.findByEmailAndPassword(email, psw);
		}
		catch (e) {
			// if the user is not found, fallback to returning null as the strategy will appropriately handle it
		}

		return null;
	}

	/**
	 * This method generates a JWT token for the user.
	 * @param {UserDocument} user The user document.
	 * @returns {Promise<{access_token: string}>} The JWT token.
	 */
	async login(user: UserDocument) {
		return {
			access_token: this.jwtService.sign({}, {
				subject: user.id,
			}),
		};
	}
}
