import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.email(),
  password: z.string().min(7),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.issues, { status: 400 });
  }

  const userFound = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (userFound)
    return NextResponse.json({ error: "User already exist" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const user = await prisma.user.create({
    data: { email: body.email, hashedPassword: hashedPassword },
  });

  return NextResponse.json(user, { status: 200 });
}
