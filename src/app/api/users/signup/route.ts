import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userSchema";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { SendEmail } from "@/lib/mailer";
import { EmailType } from "@/lib/constants";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("reqBody===========", reqBody);
    const { firstName, lastName, email, password } = reqBody;
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({
        status: 400,
        body: { message: "Please provide all the details" },
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        status: 400,
        body: { message: "User already exists" },
      });
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log("savedUser===============", savedUser);

    await SendEmail({
      email,
      emailType: EmailType.verify,
      userId: savedUser._id,
    });

    return NextResponse.json({
      status: 200,
      body: { message: "User created successfully", user: savedUser },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { message: "something went wrong in signup catch" },
    });
  }
}
