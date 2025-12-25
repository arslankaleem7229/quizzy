import { getUserWithPreference } from "@/lib/types/user.selects";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import zodErrorsToString from "@/lib/utils/zodErrorstoString";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { DeleteAccountResponse, UserWithPreferenceResponse } from "@/types/api";

export const unlinkSchema = z
  .object({
    id: z.string(),
    provider: z.string().nonoptional(),
    userId: z.string(),
  })
  .strict();

export async function DELETE(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  try {
    const rawBody = await request.json();
    const parsed = unlinkSchema.safeParse(rawBody);

    if (!parsed.success) {
      console.log(zodErrorsToString(parsed.error));
      return NextResponse.json<DeleteAccountResponse>(
        { success: true, data: { message: zodErrorsToString(parsed.error) } },
        { status: 401 }
      );
    }

    const [_, user] = await prisma.$transaction([
      prisma.account.delete({
        where: {
          id: parsed.data.id,
          userId: auth.token.id,
          provider: parsed.data.provider,
        },
      }),
      prisma.user.findUnique({
        where: { id: auth.token.id },
        select: getUserWithPreference,
      }),
    ]);

    if (!user || !user.isActive) {
      return NextResponse.json<UserWithPreferenceResponse>(
        {
          success: false,
          error: { message: "User not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json<UserWithPreferenceResponse>(
      { success: true, data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to unlink", error);
    return NextResponse.json<DeleteAccountResponse>(
      {
        success: false,
        error: { message: "Failed to unlink", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}
