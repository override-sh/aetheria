import { ReactChildren } from "@open-press/interfaces";
import classNames from "classnames";
import { left_pane_classes } from "./style";
import { HTMLAttributes } from "react";


export const LeftPaneWrapper = (
	{
		children,
		className,
		...others
	}: ReactChildren & HTMLAttributes<HTMLDivElement>,
): JSX.Element => {
	return (
		<div
			className={classNames(left_pane_classes.left_pane, className)}
			{...others}
		>
			{children}
		</div>
	);
};