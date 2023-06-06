import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { AUTH_CONFIG_KEY, AuthConfig } from "@open-press/backend-config";
import { UserDocument, UserService } from "@open-press/models";
import { JwtPayload } from "jsonwebtoken";
import { PassportJwtStrategyEvents } from "../types";
import { NonUniformEventList } from "strongly-typed-events";
import { PASSPORT_JWT_STRATEGY_EVENTS } from "../constants";
import { tap } from "lodash";

@Injectable()
export class JwtStrategy
	extends PassportStrategy(Strategy) {
	private _events = new NonUniformEventList<JwtStrategy, PassportJwtStrategyEvents>();

	constructor(
		@Inject(AUTH_CONFIG_KEY)
		private readonly _auth_config: AuthConfig,
		private readonly _user_service: UserService,
	) {
		super({
			jwtFromRequest:   ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey:      _auth_config.jwt.encryption === "symmetric"
			                  ? _auth_config.jwt.secret
			                  : _auth_config.jwt.public_key,
			audience:         _auth_config.jwt.audience,
			issuer:           _auth_config.jwt.issuer,
		});
	}

	/**
	 * This event is emitted before the validation process is started.
	 * @returns {IEvent<JwtStrategy, PassportJwtStrategyEvents["hook.auth.validation.before"]>}
	 */
	get onBeforeValidation() {
		/* istanbul ignore next */
		return this._events.get(PASSPORT_JWT_STRATEGY_EVENTS.before_validation)
		           .asEvent();
	}

	/**
	 * This event is emitted when the validation process is successful.
	 * @returns {IEvent<JwtStrategy, PassportJwtStrategyEvents["hook.auth.validation.success"]>}
	 */
	get onValidationSuccess() {
		/* istanbul ignore next */
		return this._events.get(PASSPORT_JWT_STRATEGY_EVENTS.validation_success)
		           .asEvent();
	}

	/**
	 * This event is emitted when the validation process is failed.
	 * @returns {IEvent<JwtStrategy, PassportJwtStrategyEvents["hook.auth.validation.failed"]>}
	 */
	get onValidationFailed() {
		/* istanbul ignore next */
		return this._events.get(PASSPORT_JWT_STRATEGY_EVENTS.validation_failed)
		           .asEvent();
	}

	/**
	 * This method is called by Passport when a JWT is provided.
	 * @param payload The payload of the JWT.
	 * @returns {Promise<UserDocument>} The user document.
	 */
	async validate(payload: JwtPayload): Promise<UserDocument | null> {
		this._events.get(PASSPORT_JWT_STRATEGY_EVENTS.before_validation)
		    .dispatch(this, { payload });

		if (payload.sub) {
			return tap(
				await this._user_service.find(payload.sub),
				(user) => this._events.get(PASSPORT_JWT_STRATEGY_EVENTS.validation_success)
				              .dispatch(this, { user }),
			);
		}

		this._events.get(PASSPORT_JWT_STRATEGY_EVENTS.validation_failed)
		    .dispatch(this, { payload });

		return null;
	}
}