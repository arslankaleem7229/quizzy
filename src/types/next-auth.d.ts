import { UserRole } from "@/app/generated/prisma";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    username: string | null;
    role: UserRole | null;
    email: string | null;
    isActive: boolean;
  }

  interface Session {
    user: {
      id: string;
      username: string | null;
      role: UserRole | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string | null;
    role: UserRole | null;
  }
}
