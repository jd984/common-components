import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const response = NextResponse.json({
      success: true,
      body: { message: "User logged out successfully" },
    });
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { message: "Something went wrong in logout" },
    });
  }
}
