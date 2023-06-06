import { ReactChildren } from "@open-press/interfaces";
import dashboard from "../../../styles/dashboard.module.css";
import { HTMLAttributes } from "react";
import classNames from "classnames";

export const DashboardPageWrapper = (
	{
		children,
		className,
		...others
	}: ReactChildren & HTMLAttributes<HTMLDivElement>,
): JSX.Element => {
	return (
		<div
			className={classNames(dashboard.page, className)}
			{...others}
		>
			{children}
		</div>
	);
};