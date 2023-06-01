"use client";

/* istanbul ignore file */

/**
 * Get current event selector
 * @param {Event} event The event
 * @param {string} query_selector The query selector
 * @returns {HTMLElement | null} The current event selector
 */
export const getCurrentEventSelector = (
	event: Event,
	query_selector: string,
): HTMLElement | null => {
	return (event.target as HTMLElement).closest(query_selector);
};