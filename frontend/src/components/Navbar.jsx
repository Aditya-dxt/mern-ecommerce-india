import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        E-Shop
      </Link>

      <div className="flex gap-6 text-gray-700 font-medium">
        <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login" className="text-indigo-600">
          Login
        </Link>
      </div>
    </nav>
  );
}
