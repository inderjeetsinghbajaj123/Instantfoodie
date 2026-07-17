import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.jsx";
import burgerImg from "../../assets/burger.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "user";
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, authLoading } = useAuth();

  // Track screen size safely for JavaScript Framer Motion objects
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Run on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (e, targetUrl) => {
    e.preventDefault();
    setIsMerging(true);
    setTimeout(() => {
      navigate(targetUrl);
    }, 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await register({
      fullName,
      email,
      password,
      role,
    });

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-neutral-950 px-4 overflow-hidden select-none">
      {/* Ambient spotlight glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_38%,rgba(217,119,6,0.28),transparent_70%)] animate-[pulse_6s_ease-in-out_infinite]"
      />

      {/* Light beam from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-full bg-gradient-to-b from-amber-300/35 via-amber-500/10 to-transparent blur-2xl" />

      {/* Floor glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-40 bg-amber-600/25 blur-3xl rounded-full" />

      {/* Sparkle dots */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(251,191,36,0.6)_1px,transparent_1px)] bg-[length:50px_50px]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

      <div className="relative w-full max-w-md flex items-center justify-center">
        {/* ================= TOP BURGER HALF ================= */}
        <motion.div
          className="absolute w-[280px] h-[280px] sm:w-[430px] sm:h-[430px] z-0 pointer-events-none filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 58%, 0 46%)" }}
          initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", rotate: 0, scale: 1.1 }}
          animate={isMerging
            ? { top: "50%", left: "50%", x: "-50%", y: "-50%", rotate: 0, scale: 1.1 }
            : {
              top: isMobile ? "-25%" : "-40%",
              left: isMobile ? "-10%" : "-30%",
              x: "0%",
              y: "0%",
              rotate: -18,
              scale: 1.15
            }
          }
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
          whileHover={{ scale: 1.05, rotate: -15 }}
        >
          <img src={burgerImg} alt="" className="w-full h-full object-contain" />
        </motion.div>

        {/* ================= BOTTOM BURGER HALF ================= */}
        <motion.div
          className="absolute w-[280px] h-[280px] sm:w-[430px] sm:h-[430px] z-0 pointer-events-none filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
          style={{ clipPath: "polygon(0 44%, 100% 56%, 100% 100%, 0 100%)" }}
          initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", rotate: 0, scale: 1.1 }}
          animate={isMerging ?
            { top: "50%", left: "50%", x: "-50%", y: "-50%", rotate: 0, scale: 1.1 } :
            {
              top: isMobile ? "65%" : "45%",
              left: isMobile ? "40%" : "52%",
              x: "-20%",
              y: "5%",
              rotate: -12,
              scale: 1.15
            }
          }
          transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.02 }}
          whileHover={{ scale: 1.05, rotate: -15 }}
        >
          <img src={burgerImg} alt="" className="w-full h-full object-contain" />
        </motion.div>

        {/* Signup Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative z-10 w-full bg-zinc-900/75 backdrop-blur-xl border border-amber-500/10 rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_32px_64px_rgba(0,0,0,0.7),0_0_60px_-15px_rgba(217,119,6,0.3)] hover:border-amber-500/30 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isMerging ? 0 : 1, scale: isMerging ? 0.95 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center tracking-tight">🍔 InstantFoodie</h2>
          <p className="text-neutral-400 mb-6 sm:mb-8 text-center text-xs sm:text-sm">Create your account to get started.</p>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full bg-neutral-950/40 rounded-xl px-4 py-3 sm:py-3.5 mb-4 text-white placeholder:text-neutral-600 outline-none border border-neutral-800/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200 text-sm sm:text-base"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full bg-neutral-950/40 rounded-xl px-4 py-3 sm:py-3.5 mb-4 text-white placeholder:text-neutral-600 outline-none border border-neutral-800/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200 text-sm sm:text-base"
          />

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-neutral-950/40 rounded-xl px-4 py-3 sm:py-3.5 pr-14 text-white placeholder:text-neutral-600 outline-none border border-neutral-800/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200 text-sm sm:text-base"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-500 transition-colors"
            >
              {showPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-3 sm:py-3.5 rounded-xl shadow-lg shadow-amber-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 tracking-wide text-sm sm:text-base"
          >
            {authLoading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-neutral-400 text-xs sm:text-sm mt-6 sm:mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              onClick={(e) => handleNavClick(e, "/login")}
              className="text-amber-500 font-bold hover:underline transition-all ml-1"
            >
              Log in
            </Link>
            <p className="text-center text-neutral-500 text-xs mt-3">
              Own a restaurant?{" "}
              <Link
                to="/restaurant/signup"
                className="text-amber-500 font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
