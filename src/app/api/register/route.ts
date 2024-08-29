import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return new NextResponse("missing data", { status: 500 });
    }

    const userAlreadyExist = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExist?.id) {
      return new NextResponse("User already exists", { status: 500 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prismadb.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        name: name,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
