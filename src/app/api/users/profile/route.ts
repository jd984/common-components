import { connect } from "@/dbConfig/dbConfig";
import { getIdFromToken } from "@/lib/helper";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getIdFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({
        success: false,
        body: { message: "User not found" },
      });
    }
    return NextResponse.json({
      message: "User details found successfully",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { message: "Something went wrong in profile" },
    });
  }
}
