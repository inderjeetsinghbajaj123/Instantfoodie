import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineFire,
  HiOutlineShoppingBag,
  HiOutlineHome,
  HiClipboardDocumentList,
  HiHeart,
  HiUser,
} from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";

const userNavLinks = [
  { label: "Discover", path: "/home", icon: <HiOutlineHome size={22} /> },
  { label: "Favorites", path: "/favorites", icon: <HiHeart size={22} /> },
  {
    label: "Orders",
    path: "/order",
    icon: <HiClipboardDocumentList size={22} />,
  },
  { label: "Profile", path: "/profile", icon: <HiUser size={22} /> },
];

const restaurantNavLinks = [
  {
    label: "Orders",
    path: "/restaurant-orders",
    icon: <HiClipboardDocumentList size={22} />,
  },
  {
    label: "Menu",
    path: "/restaurant-menu",
    icon: <HiOutlineFire size={22} />,
  },
  {
    label: "Restaurant",
    path: "/restaurant-profile",
    icon: <HiUser size={22} />,
  },
];

const adminNavLinks = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: <HiClipboardDocumentList size={22} />,
  },
  { label: "Profile", path: "/profile", icon: <HiUser size={22} /> },
];

const Navbar = ({ cartCount = 0 }) => {
  const location = useLocation();
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = user?.role;

  const navLinks = !isAuthenticated
    ? []
    : role === "restaurant"
      ? restaurantNavLinks
      : role === "admin"
        ? adminNavLinks
        : userNavLinks;

  const logoRoute = !isAuthenticated
    ? "/"
    : role === "restaurant"
      ? "/restaurant"
      : role === "admin"
        ? "/admin"
        : "/home";

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl mb-12">
      <div className="relative rounded-full p-[1.5px] overflow-visible group">
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-streak-active pointer-events-none"
            style={{ width: "200%", paddingBottom: "200%" }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-6 bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] rounded-full px-3 sm:px-6 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <Link
            to={logoRoute}
            className="relative rounded-full p-[1.5px] overflow-hidden group/logo shrink-0"
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] opacity-60 group-hover/logo:opacity-100 transition-opacity duration-500 animate-streak-active pointer-events-none"
              style={{ width: "200%", paddingBottom: "200%" }}
            />

            <div className="relative z-10 flex items-center gap-2 justify-center h-10 px-2 sm:px-1 rounded-full bg-zinc-900">
              <HiOutlineFire className="text-amber-500 shrink-0" size={22} />
              <span className="hidden sm:inline text-white font-black tracking-tight text-lg pr-2">
                InstantFoodie
              </span>
            </div>
          </Link>

          {navLinks.length > 0 && (
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`relative inline-block pb-1 text-sm font-semibold tracking-wide transition-colors group/nav ${
                        isActive
                          ? "text-amber-500"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[2px] bg-amber-500 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover/nav:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {navLinks.length > 0 && (
            <ul className="flex md:hidden items-center justify-center flex-1 gap-6 sm:gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`p-2 rounded-full transition-colors ${
                        isActive
                          ? "text-amber-500 bg-amber-500/10"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {link.icon}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {isAuthenticated && role === "user" ? (
            <Link
              to="/cart"
              className="relative rounded-full p-[1.5px] overflow-hidden group/cart shrink-0"
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] opacity-60 group-hover/cart:opacity-100 transition-opacity duration-500 animate-streak-active pointer-events-none"
                style={{ width: "200%", paddingBottom: "200%" }}
              />

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
          ) : (
            <div className="relative">
              <div className="relative rounded-full p-[1.5px] overflow-hidden group/profile shrink-0">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] opacity-60 group-hover/profile:opacity-100 transition-opacity duration-500 animate-streak-active pointer-events-none"
                  style={{ width: "200%", paddingBottom: "200%" }}
                />
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="relative z-10 w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-300 hover:text-amber-500"
                >
                  <HiUser size={18} />
                </button>
              </div>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-neutral-700 rounded-xl shadow-xl z-50 overflow-hidden">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-white hover:bg-neutral-800"
                      >
                        Login as Customer
                      </Link>

                      <Link
                        to="/restaurant-login"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-white hover:bg-neutral-800"
                      >
                        Login as Restaurant
                      </Link>

                      <Link
                        to="/admin-login"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-white hover:bg-neutral-800"
                      >
                        Login as Admin
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={
                          role === "restaurant"
                            ? "/restaurant-profile"
                            : "/profile"
                        }
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-white hover:bg-neutral-800"
                      >
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-neutral-800"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;