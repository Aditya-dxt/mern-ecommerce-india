import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  // ✅ ABSOLUTELY SAFE (never crashes)
  const avatarLetter =
    user && user.email ? user.email[0].toUpperCase() : "?";

  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow bg-white">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        E-Shop
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>
        <Link to="/cart">Cart ({cart.length})</Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center"
            >
              {avatarLetter}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow rounded">
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="border px-3 py-1 rounded text-indigo-600"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}