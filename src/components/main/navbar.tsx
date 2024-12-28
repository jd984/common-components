"use client";
import { APILogout } from "@/lib/helper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setLocalToken } from "@/lib/store/GetNewToken";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { localToken } = useSelector(
    (state: { GetToken: { localToken: string } }) => state.GetToken
  );
  useEffect(() => {
    const mainToken = Cookies.get("newToken");
    if (mainToken) {
      dispatch(setLocalToken(mainToken));
    }
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 lg:px-36 xl:px-48">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">JD</Link>
        </div>
        <div className="hidden md:flex space-x-8">
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

        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button className="text-white" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center space-y-6 pt-20">
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
    </nav>
  );
};

export default Navbar;
