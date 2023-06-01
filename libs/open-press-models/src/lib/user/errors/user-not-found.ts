import { BaseError, BaseErrorType } from "@override/open-press-support";

/**
 * User not found error
 */
@BaseError
export class UserNotFoundErrorClass
	extends Error {
	constructor() {
		super("User not found");
	}
}

/**
 * @description This class represents a user not found error.
 * @type {BaseErrorType<UserNotFoundErrorClass>}
 */
export const UserNotFoundError = UserNotFoundErrorClass as BaseErrorType<UserNotFoundErrorClass>;