import { BaseError, BaseErrorType } from "@override/open-press-support";

/**
 * Error thrown when a user tries to update or register with an email already in use.
 */
@BaseError
export class VerificationEmailSentErrorClass
	extends Error {
	constructor() {
		super("Verification email sent");
	}
}

/**
 * @description This class represents a verification email sent error.
 * @type {BaseErrorType<VerificationEmailSentErrorClass>}
 */
export const VerificationEmailSentError = VerificationEmailSentErrorClass as BaseErrorType<VerificationEmailSentErrorClass>;