import { Link } from "react-router-dom";
import { HiOutlineFire } from "react-icons/hi2";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20 mb-6">
      <div className="w-[95%] max-w-7xl mx-auto">
        {/* Outer Glow Wrapper */}
        <div className="relative rounded-[32px] p-[1.5px] overflow-hidden group">
          {/* Rotating Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
            bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)]
            opacity-60 group-hover:opacity-100 transition-opacity duration-500
            animate-streak-active pointer-events-none"
            style={{
              width: "200%",
              paddingBottom: "200%",
            }}
          />

          {/* Footer Container */}
          <div
            className="relative z-10 rounded-[32px]
            bg-[#050505]
            bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
            bg-[size:20px_20px]
            shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Main Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-10">
              {/* Logo */}
              <Link to="/home" className="flex items-center gap-3">
                <span className="relative rounded-full p-[1.5px] overflow-hidden group/flogo shrink-0">
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
                    bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)]
                    opacity-60 group-hover/flogo:opacity-100 transition-opacity duration-500
                    animate-streak-active pointer-events-none"
                    style={{
                      width: "200%",
                      paddingBottom: "200%",
                    }}
                  />

                  <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900">
                    <HiOutlineFire className="text-amber-500" size={20} />
                  </span>
                </span>

                <span className="text-white font-black text-lg tracking-tight">
                  InstantFoodie
                </span>
              </Link>

              {/* Footer Links */}
              <ul className="flex flex-wrap items-center justify-center gap-8">
                {["About", "Contact", "Privacy", "Terms"].map((item) => (
                  <li key={item}>
                    <Link
                      to=""
                      className="relative inline-block pb-1 text-sm font-semibold tracking-wide text-neutral-400 hover:text-white transition-colors group/link"
                    >
                      {item}

                      <span
                        className="absolute left-0 -bottom-0.5 h-[2px] bg-amber-500
                        w-0 group-hover/link:w-full transition-all duration-300"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {[
                  {
                    href: "https://instagram.com",
                    icon: <FaInstagram size={15} />,
                  },
                  {
                    href: "https://twitter.com",
                    icon: <FaTwitter size={15} />,
                  },
                  {
                    href: "https://facebook.com",
                    icon: <FaFacebookF size={15} />,
                  },
                  {
                    href: "https://youtube.com",
                    icon: <FaYoutube size={15} />,
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative rounded-full p-[1.5px] overflow-hidden group/social${index}`}
                  >
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
                      bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)]
                      opacity-60 group-hover/social${index}:opacity-100
                      transition-opacity duration-500
                      animate-streak-active pointer-events-none`}
                      style={{
                        width: "200%",
                        paddingBottom: "200%",
                      }}
                    />

                    <span
                      className="relative z-10 w-10 h-10 flex items-center justify-center
                      rounded-full bg-neutral-900
                      text-neutral-400 hover:text-neutral-950
                      hover:bg-amber-500
                      transition-all duration-300
                      hover:-translate-y-1"
                    >
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Copyright */}
            <div className="border-t border-neutral-800 py-5">
              <p className="text-center text-xs font-medium text-neutral-500 tracking-wide">
                © 2026 InstantFoodie. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;