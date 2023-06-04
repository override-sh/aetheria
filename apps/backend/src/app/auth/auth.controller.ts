import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { LocalAuthGuard } from "./guards";
import { AuthService } from "./auth.service";
import { UserDocument } from "@override/open-press-models";

@Controller("auth")
export class AuthController {
	constructor(private auth_service: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	async login(@Req() request: Request) {
		return this.auth_service.login(request.user as UserDocument);
	}
}
