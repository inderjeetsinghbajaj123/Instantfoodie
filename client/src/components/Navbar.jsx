import { Link, useLocation } from "react-router-dom";
import { HiOutlineFire, HiOutlineShoppingBag, HiHome, HiClipboardDocumentList, HiHeart, HiUser } from "react-icons/hi2";

const navLinks = [
  { label: "Discover", path: "/home", icon: <HiHome size={22} /> },
  { label: "Favorites", path: "/favorites", icon: <HiHeart size={22} /> },
  { label: "Orders", path: "/order", icon: <HiClipboardDocumentList size={22} /> },
  { label: "Profile", path: "/profile", icon: <HiUser size={22} /> },
];

const Navbar = ({ cartCount = 0 }) => {
  const location = useLocation();

  return (
    <nav className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl mb-12">
      {/* Outer wrapper: holds the glow ring behind everything */}
      <div className="relative rounded-full p-[1.5px] overflow-hidden group">
        {/* Rotating glow ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-streak-active pointer-events-none"
          style={{ width: "200%", paddingBottom: "200%" }} />

        {/* Inner navbar housing */}
        <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-6 bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] rounded-full px-3 sm:px-6 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">

          {/* Logo with glow ring */}
          <Link
            to="/home"
            className="relative rounded-full p-[1.5px] overflow-hidden group/logo shrink-0"
          >
            {/* Rotating glow ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] opacity-60 group-hover/logo:opacity-100 transition-opacity duration-500 animate-streak-active pointer-events-none"
              style={{ width: "200%", paddingBottom: "200%" }}
            />

            {/* Inner logo housing */}
            <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900">
              <HiOutlineFire className="text-amber-500" size={22} />
            </div>
          </Link>

          {/* Desktop links with animated underline */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`relative inline-block pb-1 text-sm font-semibold tracking-wide transition-colors group/nav ${isActive ? "text-amber-500" : "text-neutral-400 hover:text-white"
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-amber-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover/nav:w-full"
                        }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile icon nav */}
          <ul className="flex md:hidden items-center justify-center flex-1 gap-6 sm:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`p-2 rounded-full transition-colors ${isActive ? "text-amber-500 bg-amber-500/10" : "text-neutral-400 hover:text-white"
                      }`}
                  >
                    {link.icon}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Cart pill with glow ring */}
          <Link
            to="/cart"
            className="relative rounded-full p-[1.5px] overflow-hidden group/cart shrink-0"
          >
            {/* Rotating glow ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] opacity-60 group-hover/cart:opacity-100 transition-opacity duration-500 animate-streak-active pointer-events-none"
              style={{ width: "200%", paddingBottom: "200%" }}
            />

            {/* Inner cart housing */}
            <div className="relative z-10 flex items-center gap-2 bg-neutral-900 text-white text-sm font-bold px-3 sm:px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-all shadow-md">
              <HiOutlineShoppingBag className="text-amber-500" size={18} />
              <span className="hidden sm:inline tracking-wide">Cart</span>
              {cartCount > 0 && (
                <span className="bg-amber-500 text-neutral-950 text-xs px-2 py-0.5 rounded-full font-black ml-0.5">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;