import { LeftPaneHeader, LeftPaneNavigation, LeftPaneWrapper } from "../left-pane";
import { LeftPaneButton } from "../../client/button";
import { dashboard_classes } from "./style";
import { DashboardPageWrapper } from "./page-wrapper";
import { LeftPaneButtonProps, ReactChildren } from "@open-press/interfaces";
import { HTMLAttributes } from "react";
import classNames from "classnames";
import dashboard from "../../../styles/dashboard.module.css";

export const DashboardWrapper = (
	{
		children,
		className,
		navExtended,
		setNavExtended,
		...others
	}: ReactChildren & LeftPaneButtonProps & HTMLAttributes<HTMLDivElement>,
): JSX.Element => {
	return (
		<div
			className={
				classNames(
					dashboard.dashboard_layout,
					navExtended && dashboard.nav_extended,
					!navExtended && dashboard.nav_compact,
				)}
			{...others}
		>
			<LeftPaneWrapper
				id={"left-pane-wrapper"}
				className={dashboard_classes.left_pane}
			>
				<LeftPaneHeader>
					Logo
				</LeftPaneHeader>
				<LeftPaneNavigation
					pane_trigger={
						<LeftPaneButton
							navExtended={navExtended}
							setNavExtended={setNavExtended}
						/>
					}
				>
					nav
				</LeftPaneNavigation>
			</LeftPaneWrapper>
			<DashboardPageWrapper>
				{children}
			</DashboardPageWrapper>
		</div>
	);
};