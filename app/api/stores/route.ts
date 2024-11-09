import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismaDB";

export async function POST(
	req: Request,
) {
	try {
		const { userId } = await auth();
		const body = await req.json();

		if(!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { name } = body;

		if(!name) {
			return  new NextResponse("Name is required", { status: 400 })
		}

		const newStore = await prisma.store.create({
			data: {
				name,
				userId,
			}
		})

		return NextResponse.json(newStore);
	} catch (error) {
		console.log("STORES_POST_ERROR", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}