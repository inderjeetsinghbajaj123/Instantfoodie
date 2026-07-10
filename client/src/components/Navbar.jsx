import { Link, useLocation } from "react-router-dom";
import { HiOutlineFire,HiOutlineShoppingBag  } from "react-icons/hi2";

const navLinks = [
  { label: "Discover", path: "/home" },
  { label: "Orders", path: "/order" },
  { label: "Favorites", path: "/favorites" },
  { label: "Profile", path: "/profile" },
];

const Navbar = ({ cartCount = 0 }) => {
  const location = useLocation();

  return (
    <nav className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl mb-12">
      <div className="flex items-center justify-between gap-6 bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#1f2937] border border-white/10 rounded-full px-6 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">

        {/* Logo */}
        <Link to="/home" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shrink-0">
          <HiOutlineFire className="text-orange-500" size={22} />
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm font-semibold transition-colors ${
                    isActive ? "text-orange-400" : "text-white hover:text-orange-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Checkout pill */}
        <Link
          to="/cart"
          className="flex items-center gap-1 bg-white text-[#111827] text-sm font-bold px-5 py-2.5 rounded-full hover:bg-gray-100 hover:bg-orange-400 transition-colors shrink-0"
        >
          <HiOutlineShoppingBag size={18} />
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;