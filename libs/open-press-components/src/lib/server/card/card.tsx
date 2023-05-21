import { CardProps, ReactChildren } from "@override/open-press-interfaces";
import { HTMLAttributes } from "react";
import { card_classes } from "./style";
import { toHtmlClasses } from "@override/utility";

export const Card = (
	{
		children,
		size,
		...others
	}: ReactChildren & HTMLAttributes<HTMLDivElement> & CardProps,
): JSX.Element => {
	const classes = toHtmlClasses([
		card_classes.card,
		size === "small"
		? card_classes.card_small
		: null,
	]);

	return (
		<div className={classes} {...others}>
		</div>
	);
};