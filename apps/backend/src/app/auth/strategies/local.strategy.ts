import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { HookableService } from "@override/open-press-support";
import { HookConfiguration, IHookable } from "@override/open-press-interfaces";
import { AUTH_MODULE_HOOKS } from "../constants";
import { AuthModuleHooksCallback } from "../types";
import { UserDocument } from "@override/open-press-models";

type hooks = AuthModuleHooksCallback
type hooks_keys = keyof hooks

@Injectable()
export class LocalStrategy
	extends PassportStrategy(Strategy)
	implements IHookable<hooks, hooks_keys> {

	constructor(
		private readonly auth_service: AuthService,
		private readonly hookable_service: HookableService<hooks>,
	) {
		super({
			usernameField: "email",
			session:       false,
		});
	}

	/* istanbul ignore next */
	public listen(configuration: HookConfiguration<hooks_keys, hooks[hooks_keys]>): IHookable<hooks> {
		return this.hookable_service.listen(configuration);
	}

	/* istanbul ignore next */
	public listeners(hook: hooks_keys): hooks[hooks_keys][] {
		return this.hookable_service.listeners(hook);
	}

	/* istanbul ignore next */
	public off(
		{
			hook,
			callback,
		}: HookConfiguration<hooks_keys, hooks[hooks_keys]>,
	): IHookable<hooks> {
		return this.hookable_service.off({
			hook,
			callback,
		});
	}

	/* istanbul ignore next */
	public once(
		{
			hook,
			callback,
		}: HookConfiguration<hooks_keys, hooks[hooks_keys]>,
	): IHookable<hooks> {
		return this.hookable_service.once({
			hook,
			callback,
		});
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
		this.hookable_service.trigger(AUTH_MODULE_HOOKS.login_before, {
			this:   this,
			caller: this,
			email,
			password,
		});

		const user = await this.auth_service.validate(email, password);
		if (!user) {
			this.hookable_service.trigger(AUTH_MODULE_HOOKS.login_success, {
				caller: this,
				email,
				password,
			});

			throw new UnauthorizedException();
		}

		this.hookable_service.trigger(AUTH_MODULE_HOOKS.login_success, {
			caller: this,
			user,
		});

		return user;
	}
}