import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        E-Shop
      </Link>

      <div className="flex gap-6 font-medium">
        <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/login" className="text-indigo-600">
          Login
        </Link>
      </div>
    </nav>
  );
}
