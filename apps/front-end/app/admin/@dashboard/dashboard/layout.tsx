"use client";

import { ReactChildren } from "@override/open-press-interfaces";
import { useState } from "react";
import { DashboardWrapper } from "@override/open-press-components/server";
import { useTranslateElementOnScroll } from "@override/open-press-hooks";

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