import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@/app/generated/prisma";

type CredentialsInput = {
  email?: string; // used as email or username identifier from form
  password?: string;
  name?: string;
  username?: string;
  dob?: string;
  action?: "login" | "signup";
};

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
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
            },
          });

          return newUser;
        }

        const user = await prisma.user.findFirst({
          where: { OR: [{ email: identifier }, { username: identifier }] },
        });

        if (!user) {
          throw new Error(
            "No account matches this email or username. Please try again or create a new account."
          );
        }

        if (!user.hashedPassword) {
          throw new Error(
            "This account uses social login. Please sign in with Google."
          );
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordsMatch) {
          throw new Error("Wrong password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.type = user.type;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.type = token.type;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
