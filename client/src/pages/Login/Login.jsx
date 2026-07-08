import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import burgerImg from "../../assets/burger.png";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, authLoading } = useAuth();

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
    const result = await login({ email, password });
    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#1f2937] px-4 overflow-hidden select-none">
      <div className="relative w-full max-w-md flex items-center justify-center">

        {/* ================= TOP BURGER HALF ================= */}
        <motion.div
          className="absolute w-[430px] h-[430px] z-0 pointer-events-none filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 58%, 0 46%)" }}
          initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", rotate: 0, scale: 1.1 }}
          animate={isMerging
            ? { top: "50%", left: "50%", x: "-50%", y: "-50%", rotate: 0, scale: 1.1 }
            : { top: "-40%", left: "-30%", x: "0%", y: "0%", rotate: -18, scale: 1.15 }
          }
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
          whileHover={{ scale: 1.05, rotate: -15 }}
        >
          <img src={burgerImg} alt="" className="w-full h-full object-contain" />
        </motion.div>

        {/* ================= BOTTOM BURGER HALF ================= */}
        <motion.div
          className="absolute w-[430px] h-[430px] z-0 pointer-events-none filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
          style={{ clipPath: "polygon(0 44%, 100% 56%, 100% 100%, 0 100%)" }}
          initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", rotate: 0, scale: 1.1 }}
          animate={isMerging ?
            { top: "50%", left: "50%", x: "-50%", y: "-50%", rotate: 0, scale: 1.1 } :
            { top: "45%", left: "52%", x: "-20%", y: "5%", rotate: -12, scale: 1.15 }
          }
          transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.02 }}
          whileHover={{ scale: 1.05, rotate: -15 }}
        >
          <img src={burgerImg} alt="" className="w-full h-full object-contain" />
        </motion.div>

        {/* ================= MAIN AUTHENTICATION CARD ================= */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative z-10 w-full bg-[#161925]/85 backdrop-blur-2xl border border-white/10 backdrop-blur-2xl rounded-[28px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.6)] backdrop-blur-xl
          hover:shadow-orange-500/10 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isMerging ? 0 : 1, scale: isMerging ? 0.95 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-extrabold text-white mb-2 text-center tracking-tight">🍔 InstantFoodie</h2>
          <p className="text-gray-400 mb-8 text-center text-sm">Log in to continue ordering.</p>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-[#202436] rounded-xl px-4 py-3.5 mb-4 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 transition-all border border-white/[0.03]"
          />

          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#202436] rounded-xl px-4 py-3.5 pr-14 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 transition-all border border-white/[0.03]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold hover:text-[#FB923C]"
            >
              {showPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
          </div>

          <div className="text-right mb-6">
            <a href="/forgot-password" className="text-sm text-gray-400 hover:text-[#FB923C] transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 text-white font-bold py-3.5 rounded-xl shadow-[0_6px_24px_rgba(249,115,22,0.35)] hover:scale-[1.02] hover:shadow-orange-500/40 active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {authLoading ? "Logging in..." : "Log in"}
          </button>

          <p className="text-center text-gray-400 text-sm mt-8">
            New to InstantFoodie?{" "}
            <Link
              to="/signup"
              onClick={(e) => handleNavClick(e, "/signup")}
              className="text-[#F97316] font-semibold hover:text-[#FB923C] transition-colors"
            >
              Create an account
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;