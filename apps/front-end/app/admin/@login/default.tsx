"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Default() {
	const router = useRouter();

	useEffect(() => {
		router.push("/admin");
	});

	return null;
}
