import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { encode } from "next-auth/jwt";

export async function POST(req: Request) {
  try {
    const { email, password, username, name, dob } = await req.json();

    // 1. Input validation
    if (!email || !password || !username) {
      return NextResponse.json(
        {
          error: "MISSING_FIELDS",
          message: "Email, username, and password are required.",
        },
        { status: 400 }
      );
    }

    // Validate DOB format (optional)
    const dobDate =
      dob && !Number.isNaN(Date.parse(dob)) ? new Date(dob) : undefined;

    // 2. Check if user exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: email.toLowerCase() }, { username }],
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: "USER_ALREADY_EXISTS",
          message: "An account with this email or username already exists.",
        },
        { status: 409 }
      );
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        username,
        name: name ?? username,
        dob: dobDate,
        hashedPassword,
      },
    });

    // 5. Create JWT access token for mobile
    const accessToken = await encode({
      token: {
        id: user.id,
        username: user.username,
        email: user.email,
        type: "Bearer",
      },
      secret: process.env.NEXTAUTH_SECRET!,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // 6. Response
    return NextResponse.json(
      {
        success: true,
        accessToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
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
