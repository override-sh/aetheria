/**
 * @description Update the value of an array at a specific index and return the updated array.
 * @template Type The type of the array
 * @param {Type[]} array The array to update
 * @param {number} index The index to update
 * @param {Type} new_value The new value
 * @returns {Type[]} The updated array
 */
export const updateValueAtIndex = <Type>(
	array: Type[],
	index: number,
	new_value: Type,
): Type[] => {
	return array.map((
		v,
		i,
	) => i === index ? new_value : v);
};