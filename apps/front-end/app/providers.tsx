"use client";

import { ReactChildren } from "@override/open-press-interfaces";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { useLocalStorage } from "@mantine/hooks";

export const Providers = ({ children }: ReactChildren): JSX.Element => {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key:                     "mantine-color-scheme",
		defaultValue:            "light",
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (
			colorScheme === "dark"
			? "light"
			: "dark"
		));

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{ colorScheme }} withNormalizeCSS withGlobalStyles withCSSVariables>
				<ModalsProvider>
					<DatesProvider
						settings={
							{
								firstDayOfWeek: 1,
							}
						}
					>
						<Notifications />
						{children}
					</DatesProvider>
				</ModalsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};