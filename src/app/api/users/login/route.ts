import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        body: { message: "Please provide all the details" },
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        body: { message: "User does not exist" },
      });
    }
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({
        status: 400,
        body: { message: "Invalid password" },
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      success: true,
      body: { message: "User logged in successfully" },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { message: "Something went wrong in login" },
    });
  }
}
