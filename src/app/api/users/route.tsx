import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { userSchema } from "@/types/api";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const users = await prisma.user.findMany({});
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const body = await request.json();

  const validation = userSchema.safeParse(body);
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
