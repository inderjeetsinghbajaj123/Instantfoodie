import { Link } from "react-router-dom";
import { HiOutlineFire } from "react-icons/hi2";
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#1f2937] border-t border-white/10">
      <div className="w-[95%] max-w-6xl mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        <Link to="/home" className="flex items-center gap-2">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white">
            <HiOutlineFire className="text-orange-500" size={18} />
          </span>
          <span className="text-white font-bold text-lg">InstantFoodie</span>
        </Link>

        <ul className="flex flex-wrap items-center justify-center gap-6">
          <li>
            <Link to="" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
              Contact
            </Link>
          </li>
          <li>
            <Link to="" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
              Privacy
            </Link>
          </li>
          <li>
            <Link to="" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
              Terms
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-orange-500 text-white transition-colors">
            <FaInstagram size={15} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-orange-500 text-white transition-colors">
            <FaTwitter size={15} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-orange-500 text-white transition-colors">
            <FaFacebookF size={15} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-orange-500 text-white transition-colors">
            <FaYoutube size={15} />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <p className="text-center text-xs text-gray-400">
          © 2026 InstantFoodie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;