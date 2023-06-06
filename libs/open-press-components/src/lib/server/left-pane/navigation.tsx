import { LeftPaneNavigationProps, ReactChildren } from "@open-press/interfaces";
import classNames from "classnames";
import { left_pane_classes } from "./style";
import { HTMLAttributes } from "react";

export const LeftPaneNavigation = (
	{
		children,
		pane_trigger,
		className,
		...others
	}: ReactChildren & LeftPaneNavigationProps & HTMLAttributes<HTMLElement>,
): JSX.Element => {
	return (
		<nav
			className={classNames(left_pane_classes.pane_navigation, className)}
			{...others}
		>
			{pane_trigger}
			{children}
		</nav>
	);
};