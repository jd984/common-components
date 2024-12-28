import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { EmailType } from "./constants";
import User from "@/models/userSchema";
import mongoose from "mongoose";

interface SendEmailProps {
  email: string;
  emailType: string;
  userId: any;
}

export const SendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailProps) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const hashedToken = await bcryptjs.hash(String(userId), 10);

    let updateData: any = {};

    if (emailType === EmailType?.verify) {
      updateData = {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      };
    } else if (emailType === EmailType?.forgotPassword) {
      updateData = {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      };
    }

    // Update user with the correct token and expiry based on emailType
    const updatedUser = await User.findByIdAndUpdate(
      userObjectId,
      { $set: updateData },
      { new: true } // Return the updated document
    );

    // Log to check if the update is successful
    if (updatedUser) {
      console.log("User updated:", updatedUser);
    } else {
      console.log("User not found or update failed");
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "58188656faf3f2",
        pass: "179525963bf99f",
      },
    });

    const mailOptions = {
      from: "jesalthakur984@gmail.com",
      to: email,
      subject:
        emailType === EmailType?.verify
          ? "Verify your email"
          : "Reset your password",
      html:
        emailType === EmailType?.verify
          ? `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Verify Your Email Address</h2>
            <p>Thank you for registering with our service. Please click the link below to verify your email address:</p>
            <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>If you did not create an account, please ignore this email.</p>
            <p>Thank you,<br/>The Team</p>
          </div>
        `
          : `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Reset Your Password</h2>
            <p>We received a request to reset your password. Please click the link below to reset your password:</p>
            <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thank you,<br/>The Team</p>
          </div>
        `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.log("Error in mailer", error);
    return error;
  }
};
