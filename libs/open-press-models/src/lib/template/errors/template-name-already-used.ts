import { BaseError, BaseErrorType } from "@open-press/support";

/**
 * Error thrown when a template name is already used.
 */
@BaseError
export class TemplateNameAlreadyUsedError
	extends Error {
	constructor() {
		super("Template name already used.");
	}
}

/**
 * Factory for TemplateNameAlreadyUsedError
 * @type {BaseErrorType<TemplateNameAlreadyUsedError>}
 */
export const TemplateNameAlreadyUsedErrorFactory = TemplateNameAlreadyUsedError as BaseErrorType<TemplateNameAlreadyUsedError>;