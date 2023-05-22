import { CardProps, ReactChildren } from "@override/open-press-interfaces";
import { HTMLAttributes } from "react";
import { card_classes } from "./style";
import classNames from "classnames";

export const Card = (
	{
		children,
		size,
		className,
		...others
	}: ReactChildren & HTMLAttributes<HTMLDivElement> & CardProps,
): JSX.Element => {
	return (
		<div
			className={
				classNames(
					className,
					card_classes.card,
					{
						[card_classes.card_small]: size === "small",
					},
				)
			}
			{...others}
		>
			{children}
		</div>
	);
};