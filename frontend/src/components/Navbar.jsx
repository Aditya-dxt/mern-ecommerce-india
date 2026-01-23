import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        E-Shop
      </Link>

      <div className="flex gap-6 font-medium items-center">
        <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>
        <Link to="/cart">Cart ({cart.length})</Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="text-red-600 font-medium"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-indigo-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
