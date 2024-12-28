"use client";
import { APILogout } from "@/lib/helper";
import { RootState } from "@/lib/store/index";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Footer() {
  const { localToken } = useSelector((state: RootState) => state.GetToken);

  return (
    <footer className="bg-gray-800 text-white p-4 lg:px-36 xl:px-48">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="text-lg font-bold">
          <Link href="/">JD</Link>
        </div>

        <div className="text-center sm:text-left">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>

        <div className="flex space-x-8 mt-4 sm:mt-0">
          {localToken ? (
            <>
              <Link href="/profile" className="hover:text-gray-400">
                Profile
              </Link>
              <Link
                href="#"
                onClick={() => APILogout()}
                className="hover:text-gray-400"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link href="/signup" className="hover:text-gray-400">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
