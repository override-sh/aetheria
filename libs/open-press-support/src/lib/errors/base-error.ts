import { Constructor } from "@override/open-press-interfaces";

/**
 * @description This method will create a new error class.
 * @param {T} constructor
 * @constructor
 * @returns {T & Error { is: (error: any) => error is T; make: () => T }}}
 */
export function BaseError<T extends Constructor>(constructor: T) {
	return class
		extends constructor {
		/**
		 * @description This method will check if the error is matches the current type.
		 * @param error The error to check.
		 * @returns {error is T} Whether or not the error is a T.
		 */
		static is(error: any): error is T {
			return error instanceof constructor;
		}

		/**
		 * @description This method will make a new error.
		 * @returns {T} The new error.
		 */
		static make(): T {
			return new constructor();
		}
	};
}

/**
 * @description This type represents a base error.
 */
export type BaseErrorType<T> = T & ErrorConstructor & {
	is: (error: any) => error is T;
	make: () => T;
}