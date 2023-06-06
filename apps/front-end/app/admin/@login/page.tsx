import Image from "next/image";
import { CONFIG } from "../../../components/config";
import {
	ButtonOutline,
	Card,
	CardHeader,
	InputCheckbox,
	InputEmail,
	InputPassword,
} from "@open-press/components/server";

export default function Login(): JSX.Element {
	return (
		<>
			<div className={"col-span-1 m-0 p-0 relative after:bg-gray-700 after:absolute after:inset-0 after:opacity-70 shadow-lg"}>
				<Image
					src={"https://picsum.photos/id/15/1500"}
					alt={"Brand image"}
					priority
					fill
					className={"object-cover"}
				/>
			</div>
			<div className={"col-span-1 bg-gradient-to-r from-secondary-100/70 to-secondary-gray-50 p-4 flex items-center justify-center select-none"}>
				<Card size={"small"}>
					<CardHeader
						title={"Login"}
						subtitle={CONFIG.app_name}
						separator
					/>
					<form className={"flex flex-col"}>
						<InputEmail
							id={"email"}
							label={"Email"}
							placeholder={"john.doe@example.com"}
						/>
						<InputPassword
							id={"password"}
							label={"Password"}
							placeholder={"••••••••"}
						/>
						<InputCheckbox
							id={"remember_me"}
							label={"Remember me!"}
							align_label={"right"}
						/>
						<ButtonOutline
							variant={"success"}
							className={"mt-6"}
						>
							Login
						</ButtonOutline>
					</form>
				</Card>
			</div>
		</>
	);
}
