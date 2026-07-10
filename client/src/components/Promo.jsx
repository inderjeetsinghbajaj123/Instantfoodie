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
    {
        id: 1,
        image: promo1,
        title: "50% OFF your first order",
        subtitle: "Use code WELCOME50 at checkout",
    },
    {
        id: 2,
        image: promo2,
        title: "Free delivery this weekend",
        subtitle: "On all orders above ₹299",
    },
    {
        id: 3,
        image: promo3,
        title: "New: Midnight Cravings menu",
        subtitle: "Late-night favorites, delivered fast",
    },
    {
        id: 4,
        image: promo4,
        title: "New: Midnight Cravings menu",
        subtitle: "Late-night favorites, delivered fast",
    },
    {
        id: 5,
        image: promo5,
        title: "New: Midnight Cravings menu",
        subtitle: "Late-night favorites, delivered fast",
    },
    {
        id: 6,
        image: promo6,
        title: "New: Midnight Cravings menu",
        subtitle: "Late-night favorites, delivered fast",
    },
    {
        id: 7,
        image: promo7,
        title: "New: Midnight Cravings menu",
        subtitle: "Late-night favorites, delivered fast",
    },
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
        <div className="relative w-[95%] max-w-7xl mx-auto mt-6 rounded-3xl overflow-hidden shadow-lg h-48 md:h-[450px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Background image */}
                    <img
                        src={slide.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark overlay so text stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/5 to-transparent" />

                    {/* Text content */}
                    <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14">
                        <h2 className="text-white text-2xl md:text-4xl font-extrabold drop-shadow-md">
                            {slide.title}
                        </h2>
                        <p className="text-white/90 text-sm md:text-lg mt-2 drop-shadow-sm">
                            {slide.subtitle}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Prev/Next arrows */}
            <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/25 hover:bg-white/40 text-white backdrop-blur-sm transition-colors z-20"
            >
                <HiChevronLeft size={20} />
            </button>
            <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/25 hover:bg-white/40 text-white backdrop-blur-sm transition-colors z-20"
            >
                <HiChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Promo;