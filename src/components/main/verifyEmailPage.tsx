"use client";
import { Spinner } from "@/lib/helper";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerificationResult = ({
  title,
  message,
  isSuccess,
}: {
  title: string;
  message: string;
  isSuccess: boolean;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
    <h1
      className={`text-xl font-semibold ${
        isSuccess ? "text-green-600" : "text-red-600"
      }`}
    >
      {title}
    </h1>
    <p className="mt-4 text-gray-600">{message}</p>
    <Link href="/">
      <button
        className={`mt-6 w-full py-2 px-4 ${
          isSuccess
            ? "bg-green-500 hover:bg-green-600"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-medium rounded-md shadow-md`}
      >
        Return to Home
      </button>
    </Link>
  </div>
);

const VerifyEmailPage = () => {
  const [isTokenVerified, setIsTokenVerified] = useState<boolean | null>(null);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState<boolean | null>(
    false
  );
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return setIsTokenVerified(false);

    const verifyToken = async () => {
      try {
        const response = await axios.post("/api/users/verifyEmail", {
          token,
        });
        setIsAlreadyVerified(response.data.status === 400);
        setIsTokenVerified(response.data.status === 200);
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsTokenVerified(false);
      }
    };
    verifyToken();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {isTokenVerified === null ? (
        <Spinner text={"Verifying your email..."} />
      ) : isAlreadyVerified ? (
        <VerificationResult
          title="Email Already Verified!"
          message="Your email is already verified. You can return to the homepage."
          isSuccess={true}
        />
      ) : isTokenVerified ? (
        <VerificationResult
          title="Email Verified!"
          message="Your email has been successfully verified. You can now return to the homepage."
          isSuccess={true}
        />
      ) : (
        <VerificationResult
          title="Verification Failed"
          message="We couldn’t verify your email. Please try again or contact support."
          isSuccess={false}
        />
      )}
    </div>
  );
};

export default VerifyEmailPage;
