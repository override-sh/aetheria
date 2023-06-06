"use client";

import { ReactChildren } from "@open-press/interfaces";
import { useState } from "react";
import { DashboardWrapper } from "@open-press/components/server";
import { useTranslateElementOnScroll } from "@open-press/hooks";

export default function Layout(
	{
		children,
	}: ReactChildren,
): JSX.Element {
	const [navExtended, setNavExtended] = useState(false);

	useTranslateElementOnScroll("#left-pane-wrapper");

	return (
		<DashboardWrapper
			navExtended={navExtended}
			setNavExtended={setNavExtended}
		>
			{children}
		</DashboardWrapper>
	);
}