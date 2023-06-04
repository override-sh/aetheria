import { BaseError, BaseErrorType } from "@override/open-press-support";

/**
 * User not found error
 */
@BaseError
export class UserNotFoundError
	extends Error {
	constructor() {
		super("User not found");
	}
}

/**
 * @description This class represents a user not found error.
 * @type {BaseErrorType<UserNotFoundError>}
 */
export const UserNotFoundErrorFactory = UserNotFoundError as BaseErrorType<UserNotFoundError>;