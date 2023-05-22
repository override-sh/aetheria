import { InputWrapperProps, ReactChildren } from "@override/open-press-interfaces";
import { input_classes } from "./style";
import { HTMLAttributes } from "react";
import classNames from "classnames";

export const InputWrapper = (
	{
		children,
		direction,
		className,
		...others
	}: ReactChildren & HTMLAttributes<HTMLDivElement> & InputWrapperProps,
): JSX.Element => {
	return (
		<div
			className={
				classNames(
					input_classes.input_wrapper,
					{
						[input_classes.input_horizontal]: direction === "row",
						[input_classes.input_vertical]:   direction === "column",
					},
					className,
				)
			}
			{...others}
		>
			{children}
		</div>
	);
};