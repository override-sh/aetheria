import Image from "next/image";
import { CONFIG } from "../../../components/config";

import "@override/open-press-components/styles/card.module.css";

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
			<div className={"col-span-1 bg-gradient-to-r from-secondary-100 to-secondary-100 to-10% p-4 flex items-center justify-center select-none"}>
				{/*https://img.logoipsum.com/299.svg*/}
				<div className={"card card_small"}>
					<div className={"card_header"}>
						<h1 className={"card_title"}>Login</h1>
						<hr className={"card_header_separator"} />
						<h2 className={"card_subtitle"}>{CONFIG.app_name}</h2>
					</div>
					<form className={"flex flex-col"}>
						<div className={"flex flex-col mt-4"}>
							<label htmlFor={"email"} className={"text-sm font-semibold"}>Email</label>
							<input
								type={"email"}
								name={"email"}
								id={"email"}
								placeholder={"john.doe@example.com"}
								className={"transition-all duration-300 border border-primary-100 rounded-md p-2 bg-transparent focus:ring-success-500 focus:border-success-500"}
							/>
						</div>
						<div className={"flex flex-col mt-4"}>
							<label htmlFor={"email"} className={"text-sm font-semibold"}>Password</label>
							<input
								type={"password"}
								name={"password"}
								id={"password"}
								placeholder={"••••••••"}
								className={"transition-all duration-300 border border-primary-100 rounded-md p-2 bg-transparent focus:ring-success-500 focus:border-success-500"}
							/>
						</div>
						<div className={"flex flex mt-4"}>
							<input
								type={"checkbox"}
								name={"remember_me"}
								id={"remember_me"}
								className={"transition-all duration-300 border appearance-none border-primary-100 rounded-md p-2 bg-transparent mr-2 text-success-600 focus:outline-success-600 checked:border-success-600"}
							/>
							<label htmlFor={"remember_me"} className={"text-sm font-semibold"}>Remember me!</label>
						</div>
						<button
							type={"button"}
							className={"transition-all duration-300 border border-success-600 rounded-md p-2 bg-transparent mt-6 hover:bg-success-500 hover:text-white hover:shadow-md hover:shadow-success-600/50"}
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
