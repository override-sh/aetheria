import { ReactChildren } from "@override/open-press-interfaces";

export default function Layout({ children }: ReactChildren): JSX.Element {
	return (
		<>
			<h1>Layout component</h1>
			{children}
		</>
	);
}