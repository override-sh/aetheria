"use client";

/* istanbul ignore file */

/**
 * @description Get the offset of an element
 * @param {HTMLElement} element The element to get the offset of
 * @param {"top" | "left"} type The type of offset to get
 * @param {boolean} use_style Whether to use the style or the offset
 * @returns {number} The offset
 */
export const getElementOffset = (
	element: HTMLElement,
	type: "top" | "left",
	use_style = true,
) => {
	const replace_rexp = new RegExp(`(px|rem|em|%|vh|vw)`, "g");

	if (type === "top") {
		return +(use_style
		         ? element.style.top.toString()
		                  .replace(replace_rexp, "")
		         : element.offsetTop.toString()
		                  .replace(replace_rexp, ""));
	}
	else {
		return +(use_style
		         ? element.style.left.toString()
		                  .replace(replace_rexp, "")
		         : element.offsetLeft.toString()
		                  .replace(replace_rexp, ""));
	}
};