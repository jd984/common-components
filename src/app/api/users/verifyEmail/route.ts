import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const existingUser = await User.findOne({ verifyToken: token });

    if (existingUser && existingUser.isVerified) {
      return NextResponse.json({
        status: 400,
        body: { message: "User already verified" },
      });
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        status: 400,
        body: { message: "Invalid token" },
      });
    }

    console.log("User: ", user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      status: 200,
      message: "Email verified successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { message: "Something went wrong in verify email" },
    });
  }
}
