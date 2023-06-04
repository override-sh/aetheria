import { Injectable } from "@nestjs/common";
import { UserDocument, UserService } from "@override/open-press-models";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validate(
		email: string,
		psw: string,
	) {
		try {
			return await this.usersService.findByEmailAndPassword(email, psw);
		}
		catch (e) {
			// if the user is not found, fallback to returning null as the strategy will appropriately handle it
		}

		return null;
	}

	async login(user: UserDocument) {
		return {
			access_token: this.jwtService.sign({}, {
				subject: user.id,
			}),
		};
	}
}
