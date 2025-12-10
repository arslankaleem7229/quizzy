import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import updateUserAttempt from "./schema";
import zodErrorsToString from "@/lib/utils/zodErrorstoString";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  try {
    const attempts = await prisma.userQuizzAttempt.findMany({
      where: { isActive: true },
    });
    if (!attempts)
      return NextResponse.json({ error: "No Recent found" }, { status: 404 });
    else return NextResponse.json(attempts, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;
  let body;
  try {
    body = await request.json();
    const validation = updateUserAttempt.safeParse(body);
    if (!validation.success)
      return NextResponse.json(zodErrorsToString(validation.error), {
        status: 400,
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid or missing JSON body" },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.userQuizzAttempt.findFirst({
      where: {
        userId: body.userId,
        setId: body.quizzId,
        isActive: true,
      },
      include: {
        answers: true,
        set: true,
      },
    });

    if (existing) return NextResponse.json(existing, { status: 201 });

    const attempts = await prisma.userQuizzAttempt.create({
      data: {
        userId: body.userId,
        setId: body.quizzId,
        status: body.currentStatus,
        isActive: true,
        updatedAt: Date(),
      },
      include: {
        set: true,
      },
    });
    if (!attempts)
      return NextResponse.json(
        { error: "Quizz adding to recent failed" },
        { status: 404 }
      );
    else return NextResponse.json(attempts, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error });
    } else {
      return NextResponse.json({ error: "Unknown error" });
    }
  }
}

//   const attempts = await prisma.userQuizzAttempt.upsert({
//       select: { userId: body.userId, setId: body.quizzId },
//       where: {
//         userId_setId_isActive: {
//           userId: body.userId,
//           setId: body.quizzId,
//           isActive: body.currentStatus !== "completed",
//         },
//       },
//       create: {
//         userId: body.userId,
//         setId: body.setId,
//         status: body.currentStatus,
//       },
//       update: {
//         status: body.currentStatus,
//       },
//     });
