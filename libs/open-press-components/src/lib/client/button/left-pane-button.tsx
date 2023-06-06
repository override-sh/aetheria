"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { LeftPaneButtonProps } from "@open-press/interfaces";

import { HtmlHTMLAttributes } from "react";
import classNames from "classnames";
import { button_classes } from "./style";

export const LeftPaneButton = (
	{
		navExtended,
		setNavExtended,
		className,
		...others
	}: LeftPaneButtonProps & HtmlHTMLAttributes<HTMLButtonElement>,
): JSX.Element => {
	return (
		<button
			className={classNames(button_classes.button, button_classes.button_left_pane, className)}
			onClick={() => setNavExtended(!navExtended)}
			{...others}
		>
			{
				navExtended &&
				<IconChevronLeft
					size={24}
					stroke={1}
				/> ||
				<IconChevronRight
					size={24}
					stroke={1}
				/>
			}
		</button>
	);
};
