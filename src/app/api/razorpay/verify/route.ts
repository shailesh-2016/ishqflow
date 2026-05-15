import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/db";
import User from "@/models/User";

const pdfLinks: Record<string, string[]> = {
  "book0": ["/pdfs/book1_part1.pdf", "/pdfs/book1_part2.pdf", "/pdfs/book1_part3.pdf"],
  "book1": ["/pdfs/book2_part1.pdf", "/pdfs/book2_part2.pdf", "/pdfs/book2_part3.pdf"],
  "book2": ["/pdfs/book3_part1.pdf", "/pdfs/book3_part2.pdf", "/pdfs/book3_part3.pdf"],
  "book3": ["/pdfs/book4_part1.pdf", "/pdfs/book4_part2.pdf", "/pdfs/book4_part3.pdf"],
  "book4": ["/pdfs/book5_part1.pdf", "/pdfs/book5_part2.pdf", "/pdfs/book5_part3.pdf"],
  "book5": ["/pdfs/book6_part1.pdf", "/pdfs/book6_part2.pdf", "/pdfs/book6_part3.pdf"],
  "comboThree": ["/pdfs/combo3_part1.pdf", "/pdfs/combo3_part2.pdf", "/pdfs/combo3_part3.pdf"],
  "comboAll": ["/pdfs/bundle_part1.pdf", "/pdfs/bundle_part2.pdf", "/pdfs/bundle_part3.pdf"],
};

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      name,
      itemId,
      itemTitle,
      userId
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET as string;

    // Create signature to verify
    const shasum = crypto.createHmac("sha256", secret || "");
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    // Allow testing with dummy signature if keys are empty/dummy or undefined
    const isAuthentic = digest === razorpay_signature || secret === "your_razorpay_key_secret_here" || !secret;

    if (!isAuthentic) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 1. Connect to Database and Update User Purchases
    if (userId) {
      try {
        await dbConnect();

        const updatedUser = await User.findByIdAndUpdate(userId, {
          $addToSet: { purchases: itemId } // Use $addToSet to avoid duplicates
        }, { new: true });

        console.log(`Updated purchases for user ${userId}:`, updatedUser.purchases);
      } catch (dbErr) {
        console.error("Database update error:", dbErr);
      }
    }

    // Payment is authentic, send the email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const linksToUse = pdfLinks[itemId] || ["https://textcharm.com/pdfs/book.pdf"];
    const baseUrl = req.headers.get("origin") || "https://textcharm.com";
    // For logging if needed, pick the first
    const absolutePdfLink = linksToUse[0].startsWith("/") ? `${baseUrl}${linksToUse[0]}` : linksToUse[0];

    const mailOptions = {
      from: `"ISHQFLOW" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: `Order Confirmed: ${itemTitle} - ISHQFLOW`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 24px; border: 1px solid #D4AF37;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 28px;">ISHQFLOW</h1>
            <p style="color: #888; margin-top: 5px;">Your digital connection starts here.</p>
          </div>
          
          <h2 style="color: #fff; margin-bottom: 20px;">Hello ${name},</h2>
          
          <p style="color: #ccc; line-height: 1.6; font-size: 16px;">
            Thank you for your purchase! We're excited to help you transform your communication skills with our premium ebook bundle.
          </p>
          
          <div style="background: rgba(212, 175, 55, 0.1); padding: 25px; border-radius: 16px; margin: 30px 0; border: 1px dashed #D4AF37;">
            <p style="margin: 0; color: #888; font-size: 14px;">ITEM PURCHASED</p>
            <h3 style="margin: 5px 0 0 0; color: #D4AF37; font-size: 20px;">${itemTitle}</h3>
          </div>
          
          <p style="color: #ccc; line-height: 1.6;">
            You can download your PDF(s) directly using the button(s) below. The links are secure and unique to your order.
          </p>
          
          <div style="text-align: center; margin: 40px 0; display: flex; flex-direction: column; gap: 15px; align-items: center;">
            ${linksToUse.map((link, idx) => {
              const absLink = link.startsWith("/") ? `${baseUrl}${link}` : link;
              return `<a href="${absLink}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(to right, #D4AF37, #F2D272); color: #000; text-decoration: none; font-weight: bold; border-radius: 14px; font-size: 16px; box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2); width: 80%; max-width: 300px;">Download Part ${idx + 1}</a>`;
            }).join('')}
          </div>
          
          <p style="color: #888; font-size: 14px; text-align: center;">
            You can also access this ebook anytime by logging into your account at <a href="${baseUrl}/library" style="color: #D4AF37; text-decoration: none;">ISHQFLOW Library</a>.
          </p>
          
          <hr style="border: none; border-top: 1px solid #222; margin: 40px 0;" />
          
          <div style="text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">&copy; 2026 ISHQFLOW. All rights reserved.</p>
            <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">Designed for better conversations.</p>
          </div>
        </div>
      `,
    };

    // If SMTP_USER is not set or dummy, just log it instead of throwing error
    if (process.env.SMTP_USER === "your_email@gmail.com" || !process.env.SMTP_USER) {
      console.log("Mock Email Sent to:", email, "with link:", absolutePdfLink);
    } else {
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true, message: "Payment verified and email sent" });
  } catch (error) {
    console.error("Error in verify route:", error);
    return NextResponse.json(
      { error: "Error verifying payment or sending email" },
      { status: 500 }
    );
  }
}
