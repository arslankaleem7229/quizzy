import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import {
  DeleteAccountResponse,
  getUserWithPreference,
  UserWithPreferenceResponse,
} from "@/lib/types/api";
import zodErrorsToString from "@/lib/utils/zodErrorstoString";
import { settingsSchema } from "./settings.schema";
import { resolveProfilePictureAttachment } from "./helper";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const user = await prisma.user.findUnique({
    where: { id: auth.token.id },
    select: getUserWithPreference,
  });

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
}

export async function PATCH(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const contentType = request.headers.get("content-type") ?? "";
  const isMultipart = contentType.includes("multipart/form-data");

  const formData = await request.formData();
  let rawBody: unknown;

  try {
    if (isMultipart) {
      const profilePicture = await resolveProfilePictureAttachment(formData);
      if (!profilePicture) {
        return NextResponse.json<UserWithPreferenceResponse>(
          {
            success: false,
            error: {
              message: `Error uploading picture`,
              code: "NOT_FOUND",
            },
          },
          { status: 404 }
        );
      } else {
        const user = await prisma.user.upsert({
          where: { id: auth.token.id },
          create: {
            image: profilePicture,
          },
          update: {
            image: profilePicture,
          },
          select: getUserWithPreference,
        });
        return NextResponse.json<UserWithPreferenceResponse>(
          { success: true, data: user },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json<UserWithPreferenceResponse>(
      {
        success: false,
        error: {
          message: `Invalid or missing JSON body: ${error}`,
          code: "INVALID_BODY",
        },
      },
      { status: 400 }
    );
  }

  const parsed = settingsSchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json<UserWithPreferenceResponse>(
      {
        success: false,
        error: {
          message: zodErrorsToString(parsed.error),
          code: "INVALID_BODY",
        },
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const user = await prisma.user.upsert({
      where: { id: auth.token.id },
      create: {
        ...(data.username ? { username: data.username } : {}),
        ...(data.email ? { email: data.email } : {}),
        ...(data.accountType ? { role: data.accountType } : {}),
        userPreferences: {
          create: {
            ...(data.theme ? { theme: data.theme } : {}),
            ...(data.language ? { language: data.language } : {}),
          },
        },
        notificationSettings: {
          create: {
            ...(data.notifications?.emailFrequency
              ? { emailFrequency: data.notifications?.emailFrequency }
              : {}),
            ...(data.notifications?.productUpdates
              ? { featuresAndTips: data.notifications?.productUpdates }
              : {}),
            ...(data.notifications?.salesPromotions
              ? {
                  salesAndPromotions: data.notifications?.salesPromotions,
                }
              : {}),
            ...(data.notifications?.streaksBadges
              ? { streaksAndBadges: data.notifications?.streaksBadges }
              : {}),
            ...(data.notifications?.reminders
              ? { studyReminders: data.notifications?.reminders }
              : {}),
          },
        },
      },
      update: {
        ...(data.username ? { username: data.username } : {}),
        ...(data.email ? { email: data.email } : {}),
        ...(profilePicture !== undefined ? { image: profilePicture } : {}),
        ...(data.accountType ? { role: data.accountType } : {}),
        userPreferences: {
          update: {
            where: { userId: auth.token.id },
            data: {
              ...(data.theme ? { theme: data.theme } : {}),
              ...(data.language ? { language: data.language } : {}),
            },
          },
        },
        notificationSettings: {
          update: {
            where: { userId: auth.token.id },
            data: {
              ...(data.notifications?.emailFrequency
                ? { emailFrequency: data.notifications?.emailFrequency }
                : {}),
              ...(data.notifications?.productUpdates
                ? { featuresAndTips: data.notifications?.productUpdates }
                : {}),
              ...(data.notifications?.salesPromotions
                ? {
                    salesAndPromotions: data.notifications?.salesPromotions,
                  }
                : {}),
              ...(data.notifications?.streaksBadges
                ? { streaksAndBadges: data.notifications?.streaksBadges }
                : {}),
              ...(data.notifications?.reminders
                ? { studyReminders: data.notifications?.reminders }
                : {}),
            },
          },
        },
      },
      select: getUserWithPreference,
    });

    if (!user.isActive) {
      return NextResponse.json<UserWithPreferenceResponse>(
        {
          success: false,
          error: { message: "Account is inactive", code: "FORBIDDEN" },
        },
        { status: 403 }
      );
    }

    return NextResponse.json<UserWithPreferenceResponse>(
      { success: true, data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update settings", error);
    return NextResponse.json<UserWithPreferenceResponse>(
      {
        success: false,
        error: { message: "Failed to update settings", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  try {
    await prisma.$transaction([
      prisma.session.deleteMany({ where: { userId: auth.token.id } }),
      prisma.user.update({
        where: { id: auth.token.id },
        data: { isActive: false },
      }),
    ]);

    return NextResponse.json<DeleteAccountResponse>(
      { success: true, data: { message: "Account deactivated" } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete account", error);
    return NextResponse.json<DeleteAccountResponse>(
      {
        success: false,
        error: { message: "Failed to delete account", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}
