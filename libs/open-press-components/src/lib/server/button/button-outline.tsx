import { ButtonCommonProps, ReactChildren } from "@override/open-press-interfaces";
import { HTMLAttributes } from "react";
import { button_classes } from "./style";
import classNames from "classnames";

export const ButtonOutline = (
	{
		children,
		variant,
		className,
		...others
	}: ReactChildren & HTMLAttributes<HTMLButtonElement> & ButtonCommonProps,
): JSX.Element => {
	return (
		<button
			className={
				classNames(
					button_classes.button,
					button_classes.button_outline,
					{
						[button_classes.button_success]: variant === "success",
					},
					className,
				)
			}
			{...others}
		>
			{children}
		</button>
	);
};