import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { PASSPORT_LOCAL_STRATEGY_EVENTS } from "../constants";
import { PassportLocalStrategyEvents } from "../types";
import { UserDocument } from "@override/open-press-models";
import { NonUniformEventList } from "strongly-typed-events";

@Injectable()
export class LocalStrategy
	extends PassportStrategy(Strategy) {
	private _events = new NonUniformEventList<LocalStrategy, PassportLocalStrategyEvents>();

	constructor(
		private readonly _auth_service: AuthService,
	) {
		super({
			usernameField: "email",
			session:       false,
		});
	}


	/**
	 * This event is emitted before the validation process is started.
	 * @returns {IEvent<LocalStrategy, PassportLocalStrategyEvents["hook.auth.login.before"]>}
	 */
	get onBeforeValidation() {
		/* istanbul ignore next */
		return this._events.get(PASSPORT_LOCAL_STRATEGY_EVENTS.before_validation)
		           .asEvent();
	}

	/**
	 * This event is emitted when the validation process is successful.
	 * @returns {IEvent<LocalStrategy, PassportLocalStrategyEvents["hook.auth.login.success"]>}
	 */
	get onValidationSuccess() {
		/* istanbul ignore next */
		return this._events.get(PASSPORT_LOCAL_STRATEGY_EVENTS.validation_success)
		           .asEvent();
	}

	/**
	 * This event is emitted when the validation process is failed.
	 * @returns {IEvent<LocalStrategy, PassportLocalStrategyEvents["hook.auth.login.failed"]>}
	 */
	get onValidationFailed() {
		/* istanbul ignore next */
		return this._events.get(PASSPORT_LOCAL_STRATEGY_EVENTS.validation_failed)
		           .asEvent();
	}

	/**
	 * This function will validate the given username and password.
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<UserDocument>}
	 * @throws {UnauthorizedException}
	 */
	async validate(
		email: string,
		password: string,
	): Promise<UserDocument> {
		this._events.get(PASSPORT_LOCAL_STRATEGY_EVENTS.before_validation)
		    .dispatch(
			    this,
			    {
				    email,
				    password,
			    },
		    );

		const user = await this._auth_service.validate(email, password);
		if (!user) {
			this._events.get(PASSPORT_LOCAL_STRATEGY_EVENTS.validation_failed)
			    .dispatch(
				    this,
				    {
					    email,
					    password,
				    },
			    );

			throw new UnauthorizedException();
		}

		this._events.get(PASSPORT_LOCAL_STRATEGY_EVENTS.validation_success)
		    .dispatch(
			    this,
			    {
				    user,
			    },
		    );

		return user;
	}
}