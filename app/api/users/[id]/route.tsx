import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";
import { verifyApiAuth } from "@/lib/utils/verifyToken";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(user, { status: 201 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const body = await request.body;
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 404 });
  return NextResponse.json({ id: params.id, name: "Arslan" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user)
    return NextResponse.json(
      { error: `User with id: ${params.id} doesnot exist` },
      { status: 400 }
    );

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      email: body.email,
      name: body.name,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user)
    return NextResponse.json(
      { error: `User with id: ${params.id} doesnot exist` },
      { status: 404 }
    );

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  return NextResponse.json(
    { message: "User Deleted Sucessfully" },
    { status: 200 }
  );
}
