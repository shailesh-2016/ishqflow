import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = "INR" } = await req.json();

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID === "your_razorpay_key_id_here") {
      return NextResponse.json(
        { error: "Razorpay Key ID is missing or invalid in environment variables." },
        { status: 500 }
      );
    }

    if (!process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET === "your_razorpay_key_secret_here") {
      return NextResponse.json(
        { error: "Razorpay Key Secret is missing or invalid in environment variables." },
        { status: 500 }
      );
    }

    const instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: error?.error?.description || error?.message || "Error creating order" },
      { status: 500 }
    );
  }
}
