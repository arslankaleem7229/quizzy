import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";

export async function GET() {
  const users = await prisma.user.findMany({});
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
    if (!newUser)
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 }
      );

    return NextResponse.json(newUser, { status: 201 });
  } else {
    return NextResponse.json({ error: "User already exist" }, { status: 400 });
  }
}
