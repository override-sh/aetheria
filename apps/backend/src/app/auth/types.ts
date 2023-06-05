import {
	AUTH_CONTROLLER_EVENTS,
	AUTH_SERVICE_EVENTS,
	PASSPORT_JWT_STRATEGY_EVENTS,
	PASSPORT_LOCAL_STRATEGY_EVENTS,
} from "./constants";
import { UserDocument, UserEntity, UserNotFoundError } from "@override/open-press-models";
import { JwtResponse } from "@override/open-press-interfaces";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

/**
 * @description This type contains the event names and their payloads that are emitted by the Passport local strategy.
 */
export type PassportLocalStrategyEvents = {
	[PASSPORT_LOCAL_STRATEGY_EVENTS.before_validation]: {
		email: string,
		password: string
	}
	[PASSPORT_LOCAL_STRATEGY_EVENTS.validation_success]: {
		user: UserDocument
	}
	[PASSPORT_LOCAL_STRATEGY_EVENTS.validation_failed]: {
		email: string
		password: string
	}
}

export type AuthServiceEvents = {
	[AUTH_SERVICE_EVENTS.before_validation]: {
		email: string,
		password: string
	}
	[AUTH_SERVICE_EVENTS.validation_success]: {
		user: UserDocument
	}
	[AUTH_SERVICE_EVENTS.validation_failed]: {
		error: UserNotFoundError | Error | unknown
	}
	[AUTH_SERVICE_EVENTS.user_logged_in]: {
		jwt: JwtResponse
	}
}

export type AuthControllerEvents = {
	[AUTH_CONTROLLER_EVENTS.before_validation]: {
		request: Request
	}
	[AUTH_CONTROLLER_EVENTS.after_login]: {
		jwt: JwtResponse
	}
	[AUTH_CONTROLLER_EVENTS.before_profile]: {
		user: UserDocument
	}
	[AUTH_CONTROLLER_EVENTS.after_profile]: {
		entity: UserEntity
	}
}

export type PassportJwtStrategyEvents = {
	[PASSPORT_JWT_STRATEGY_EVENTS.before_validation]: {
		payload: JwtPayload
	}
	[PASSPORT_JWT_STRATEGY_EVENTS.validation_success]: {
		user: UserDocument
	}
	[PASSPORT_JWT_STRATEGY_EVENTS.validation_failed]: {
		payload: JwtPayload
	}
}