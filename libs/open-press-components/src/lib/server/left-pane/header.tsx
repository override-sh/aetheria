import { ReactChildren } from "@override/open-press-interfaces";
import classNames from "classnames";
import { left_pane_classes } from "./style";
import { HTMLAttributes } from "react";

export const LeftPaneHeader = (
	{
		children,
		className,
		...others
	}: ReactChildren & HTMLAttributes<HTMLElement>,
): JSX.Element => {
	return (
		<header
			className={classNames(left_pane_classes.pane_header, className)}
			{...others}
		>
			{children}
		</header>
	);
};