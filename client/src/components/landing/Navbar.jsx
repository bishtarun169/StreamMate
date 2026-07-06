import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 border-b bg-[#111827]/80 backdrop-blur-xl border-gray-800 text-white shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold hover:scale-105 transition-transform duration-200"
        >
          <span className="text-red-600">Stream</span>
          <span className="text-white">Mate</span>
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border border-gray-700 text-white hover:border-red-600 hover:bg-red-600/10 text-sm font-medium transition-all duration-200"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200 active:scale-95"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </header>
  );
}