import { isString } from "@override/utility";

export const toHtmlClasses = (classes: (string | null | undefined)[]): string => {
	return classes.filter(isString)
	              .join(" ");
};