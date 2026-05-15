import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const token = await new SignJWT({ userId: user._id.toString(), email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(secret);

    const response = NextResponse.json(
      { message: "User registered successfully", user: { id: user._id, name: user.name, email: user.email } },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Registration error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
