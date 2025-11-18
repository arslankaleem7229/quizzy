import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("jwt error", err);
    throw new Error("Token not valid");
  }
}
