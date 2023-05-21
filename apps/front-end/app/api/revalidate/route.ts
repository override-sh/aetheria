import { NextResponse } from "next/server";

export async function POST(request: Request) {
	console.log("Revalidating cache");

	console.warn("!! REVALIDATION NOT IMPLEMENTED !!");

	return NextResponse.json({ ok: true });
}
