import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { encode } from "next-auth/jwt";
import { getUserWithPreference } from "@/lib/types/user.selects";
import { UserRole } from "@/app/generated/prisma";

type CredentialsInput = {
  email?: string;
  password?: string;
  name?: string;
  username?: string;
  dob?: string;
  role: UserRole;
  action?: "login" | "signup";
};

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/latest",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        action: { label: "Action", type: "text" },
        name: {
          label: "Name",
          type: "text",
          placeholder: "John Smith",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "johnsmith@gmail.com",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "johnsmith",
        },
        dob: {
          label: "Date of Birth",
          type: "text",
          placeholder: "1990-01-01",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password, name, username, dob, action } =
          credentials as CredentialsInput;

        if (!email || !password) {
          throw new Error("Missing email/username or password");
        }

        const identifier = email;
        const isSignup = action === "signup";
        const dobDate =
          dob && !Number.isNaN(Date.parse(dob)) ? new Date(dob) : undefined;

        if (isSignup) {
          const existingUser = await prisma.user.findFirst({
            where: {
              OR: [{ email: identifier }, { username: username || identifier }],
            },
          });

          if (existingUser) {
            throw new Error(
              "No account found with these details. Please check your input or create a new account."
            );
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await prisma.user.create({
            data: {
              email: identifier,
              name: name || username,
              username: username || identifier,
              dob: dobDate,
              hashedPassword,
              role: UserRole.STUDENT,
            },
          });

          return {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            role: newUser.role,
            isActive: newUser.isActive,
          };
        }

        const user = await prisma.user.findFirst({
          where: { OR: [{ email: identifier }, { username: identifier }] },
          select: {
            hashedPassword: true,
            ...getUserWithPreference,
          },
        });

        if (!user) {
          throw new Error(
            "No account matches this email or username. Please try again or create a new account."
          );
        }

        if (!user.hashedPassword) {
          throw new Error(
            `This account uses social login. Please sign in with ${
              user.accounts[0].provider ?? "Google"
            }`
          );
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordsMatch) {
          throw new Error("Wrong password");
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          isActive: user.isActive,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      if (user?.isActive === false) {
        return "/login?error=inactive";
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.picture = user.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        session.user = {
          id: token.id,
          username: token.username,
          role: token.role,
          name: token.name ?? null,
          email: token.email ?? null,
          image: token.picture ?? null,
        };
      } else {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.image = token.picture;
      }

      if (process.env.NEXTAUTH_SECRET) {
        // Attach a signed JWT so the client can grab a Bearer token after auth
        const signed = await encode({
          token,
          secret: process.env.NEXTAUTH_SECRET,
          maxAge: 60 * 60 * 24 * 30, // align with default NextAuth JWT expiry (30d)
        });
        session.accessToken = signed;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
