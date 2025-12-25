import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { encode } from "next-auth/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "MISSING_CREDENTIALS",
          message: "Email or password is missing.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email.toLowerCase() }, { username: email }],
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "USER_NOT_FOUND",
          message:
            "No user exists with this email or username. Please check your credentials.",
        },
        { status: 404 }
      );
    }

    if (!user.hashedPassword) {
      return NextResponse.json(
        {
          error: "SOCIAL_LOGIN_ACCOUNT",
          message:
            "This account uses social login. Please sign in with Google.",
        },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) {
      return NextResponse.json(
        {
          error: "INVALID_PASSWORD",
          message: "Incorrect password. Please try again.",
        },
        { status: 401 }
      );
    }

    const accessToken = await encode({
      token: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      secret: process.env.NEXTAUTH_SECRET!,
      maxAge: 60 * 60 * 24 * 30,
    });

    // OPTIONAL: create refreshToken (can add later)
    // const refreshToken = "generateAndStoreRefreshToken(user.id)"

    return NextResponse.json(
      {
        success: true,
        accessToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);

    return NextResponse.json(
      {
        error: "SERVER_ERROR",
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
