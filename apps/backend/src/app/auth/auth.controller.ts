import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard, LocalAuthGuard } from "./guards";
import { AuthService } from "./auth.service";
import { User, UserDocument, UserEntity } from "@override/open-press-models";
import { PublicEndpoint, RestUser } from "@override/open-press-support";

@PublicEndpoint()
@Controller("auth")
export class AuthController {
	constructor(private auth_service: AuthService) {}

	/**
	 * Authenticates a user with email and password then returns an access token.
	 * @param {e.Request} request
	 * @returns {Promise<{access_token: string}>}
	 */
	@UseGuards(LocalAuthGuard)
	@Post("login")
	async login(@Req() request: Request) {
		return this.auth_service.login(request.user as UserDocument);
	}

	/**
	 * Returns the user's profile.
	 * @param {UserDocument} user The user document.
	 * @returns {Promise<User>} The user profile.
	 */
	@PublicEndpoint(false)
	@UseGuards(JwtAuthGuard)
	@Get("profile")
	async profile(@RestUser() user: UserDocument): Promise<UserEntity> {
		return new UserEntity(user.toObject());
	}
}
