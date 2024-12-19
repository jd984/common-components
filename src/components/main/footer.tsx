import Link from "next/link";

export default function Footer() {
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
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/login" className="hover:text-gray-400">
            Login
          </Link>
          <Link href="/signup" className="hover:text-gray-400">
            Sign Up
          </Link>
        </div>
      </div>
    </footer>
  );
}
