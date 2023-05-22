"use client";

import { ReactChildren } from "@override/open-press-interfaces";
import { useState } from "react";
import { DashboardWrapper } from "@override/open-press-components/server";

export default function Layout(
	{
		children,
	}: ReactChildren,
): JSX.Element {
	const [navExtended, setNavExtended] = useState(true);

	return (
		<DashboardWrapper
			navExtended={navExtended}
			setNavExtended={setNavExtended}
		>
			{children}
		</DashboardWrapper>
	);
}