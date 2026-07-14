import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import promo1 from "../assets/promo1.png";
import promo2 from "../assets/promo2.png";
import promo3 from "../assets/promo3.png";
import promo4 from "../assets/promo4.png";
import promo5 from "../assets/promo5.png";
import promo6 from "../assets/promo6.png";
import promo7 from "../assets/promo7.png";

const slides = [
  { id: 1, image: promo1, title: "50% OFF your first order", subtitle: "Use code WELCOME50 at checkout" },
  { id: 2, image: promo2, title: "Free delivery this weekend", subtitle: "On all orders above ₹299" },
  { id: 3, image: promo3, title: "New: Midnight Cravings menu", subtitle: "Late-night favorites, delivered fast" },
  { id: 4, image: promo4, title: "New: Midnight Cravings menu", subtitle: "Late-night favorites, delivered fast" },
  { id: 5, image: promo5, title: "New: Midnight Cravings menu", subtitle: "Late-night favorites, delivered fast" },
  { id: 6, image: promo6, title: "New: Midnight Cravings menu", subtitle: "Late-night favorites, delivered fast" },
  { id: 7, image: promo7, title: "New: Midnight Cravings menu", subtitle: "Late-night favorites, delivered fast" },
];

const AUTO_SCROLL_MS = 4000;

const Promo = () => {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, []);

  const prev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[index];

  return (
    /* Outer wrapper: holds the glow ring behind the whole carousel — same pattern as Navbar */
    <div className="relative w-[95%] max-w-7xl mx-auto mt-6 rounded-[28px] p-[1.5px] overflow-hidden group/promo shadow-[0_24px_50px_rgba(0,0,0,0.6)]">
      {/* Rotating glow ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] opacity-60 group-hover/promo:opacity-100 transition-opacity duration-500 animate-streak-active pointer-events-none"
        style={{ width: "200%", paddingBottom: "200%" }}
      />

      {/* Inner carousel housing */}
      <div className="relative z-10 rounded-[28px] border border-neutral-900 overflow-hidden h-48 sm:h-72 md:h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-110 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14">
              <h2 className="text-white text-2xl md:text-5xl font-black drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] tracking-tight max-w-lg leading-tight">
                {slide.title}
              </h2>
              <p className="text-white/90 text-xs md:text-lg mt-2 font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-md">
                {slide.subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950/50 hover:bg-amber-500 border border-white/10 hover:border-amber-600 text-white hover:text-neutral-950 backdrop-blur-md transition-all active:scale-95 z-20"
        >
          <HiChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950/50 hover:bg-amber-500 border border-white/10 hover:border-amber-600 text-white hover:text-neutral-950 backdrop-blur-md transition-all active:scale-95 z-20"
        >
          <HiChevronRight size={20} />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-amber-500" : "w-2 bg-neutral-600/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promo;