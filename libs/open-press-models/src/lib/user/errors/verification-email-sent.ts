import { BaseError, BaseErrorType } from "@open-press/support";

/**
 * Error thrown when a user tries to update or register with an email already in use.
 */
@BaseError
export class VerificationEmailSentError
	extends Error {
	constructor() {
		super("Verification email sent");
	}
}

/**
 * @description This class represents a verification email sent error.
 * @type {BaseErrorType<VerificationEmailSentError>}
 */
export const VerificationEmailSentErrorFactory = VerificationEmailSentError as BaseErrorType<VerificationEmailSentError>;