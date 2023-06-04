import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { AUTH_CONFIG_KEY, AuthConfig } from "@override/backend-config";
import { UserService } from "@override/open-press-models";

@Injectable()
export class JwtStrategy
	extends PassportStrategy(Strategy) {
	constructor(
		@Inject(AUTH_CONFIG_KEY)
		private readonly auth_config: AuthConfig,
		private readonly user_service: UserService,
	) {
		super({
			jwtFromRequest:   ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey:      auth_config.jwt.encryption === "symmetric"
			                  ? auth_config.jwt.secret
			                  : auth_config.jwt.public_key,
			audience:         auth_config.jwt.audience,
			issuer:           auth_config.jwt.issuer,
		});
	}

	async validate(payload: any) {
		return this.user_service.find(payload.sub);
	}
}