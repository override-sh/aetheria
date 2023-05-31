/**
 * Tap into a value without changing it
 * @template T The type of the value
 * @param {T} value The value to tap into
 * @param {(value: T) => void} fn The function to call with the value
 * @returns {T} The value
 */
export const tap = <T>(
	value: T,
	fn: (value: T) => void,
): T => {
	fn(value);
	return value;
};