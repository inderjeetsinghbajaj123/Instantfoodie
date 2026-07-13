import { Link, useLocation } from "react-router-dom";
import { HiOutlineFire, HiOutlineShoppingBag, HiHome, HiClipboardDocumentList, HiHeart, HiUser, } from "react-icons/hi2";

const navLinks = [
  { label: "Discover", path: "/home", icon: <HiHome size={22} />, },
  { label: "Favorites", path: "/favorites", icon: <HiHeart size={22} />, },
  { label: "Orders", path: "/order", icon: <HiClipboardDocumentList size={22} />, },
  { label: "Profile", path: "/profile", icon: <HiUser size={22} />, },
];

const Navbar = ({ cartCount = 0 }) => {
  const location = useLocation();

  return (
    <nav className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl mb-12">
      <div className="flex items-center justify-between gap-6 bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] border border-orange-500/30 rounded-full px-6 py-3 shadow-[0_0_20px_rgba(249,115,22,0.15)]">

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
                  className={`text-sm font-semibold transition-colors ${isActive ? "text-orange-400" : "text-white hover:text-orange-300"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Mobile Nav */}
          <ul className="flex md:hidden items-center gap-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`p-2 rounded-full transition-colors ${isActive
                      ? "text-orange-400"
                      : "text-white hover:text-orange-300"
                      }`}
                  >
                    {link.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        {/* Checkout pill */}
        <Link
          to="/cart"
          className="flex items-center gap-1 bg-white text-[#111827] text-sm font-bold px-3 sm:px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors shrink-0"
        >
          <HiOutlineShoppingBag size={18} />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && `(${cartCount})`}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;