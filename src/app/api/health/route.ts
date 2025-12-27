import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: await prisma.$queryRaw`SELECT current_database()`,
        server: "running",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: `Database connection failed ${error}`,
      },
      { status: 503 }
    );
  }
}
