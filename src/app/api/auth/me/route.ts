import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwtVerify(token, secret);

    await dbConnect();
    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        purchases: user.purchases 
      } 
    }, { status: 200 });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
