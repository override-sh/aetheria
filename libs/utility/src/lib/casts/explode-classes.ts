/**
 * Explode classes into an array of classes.
 * @example
 * explodeClasses("foo bar baz"); // ["foo", "bar", "baz"]
 * @param {string} classes The classes to explode
 * @returns {string[]} The exploded classes as an array
 */
export const explodeClasses = (classes: string): string[] => classes.split(" ");