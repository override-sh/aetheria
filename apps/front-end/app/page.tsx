import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Welcome to Home",
};

export default function Page(): JSX.Element {
	return (
		<>
			<h1>
				TODO: dynamically render homepage, in the meantime you can:
			</h1>
			<ul>
				<li><Link href={"/admin"}>Admin</Link></li>
			</ul>
		</>

	);
}
