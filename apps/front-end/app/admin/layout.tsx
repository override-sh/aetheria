import { ReactChildren } from "@override/open-press-interfaces";

export default function Layout({ children }: ReactChildren): JSX.Element {
	return (
		<main className={"h-screen w-screen grid grid-cols-2 m-0 p-0 gap-0"}>
			{children}
		</main>
	);
}