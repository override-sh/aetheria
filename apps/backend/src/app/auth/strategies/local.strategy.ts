import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy
	extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: "email",
			session:       false,
		});
	}

	async validate(
		username: string,
		password: string,
	) {
		const user = await this.authService.validate(username, password);
		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}