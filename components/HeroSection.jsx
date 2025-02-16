"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const texts = ["Software Engineer", "Web Developer", "Problem Solver"];
  const fonts = ["serif", "monospace", "sans-serif"];
  const specialFonts = ["papyrus", "cursive", "fantasy", "georgia", "sans-serif"];

  const [index, setIndex] = useState(0);
  const [showText, setShowText] = useState(true);
  const [showStrike, setShowStrike] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [fontIndex, setFontIndex] = useState(0);
  const [changingFont, setChangingFont] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const cycleAnimation = async () => {
      setShowText(true);
      await new Promise((res) => setTimeout(res, 1000));

      if (index < texts.length - 1) {
        setShowStrike(true);
        await new Promise((res) => setTimeout(res, 1200));

        setShowText(false);
        setShowStrike(false);
        await new Promise((res) => setTimeout(res, 300));

        setIndex((prev) => (prev + 1) % texts.length);
      } else {
        setChangingFont(true);
        for (let i = 0; i < specialFonts.length; i++) {
          setFontIndex(i);
          await new Promise((res) => setTimeout(res, 300));
        }
        setChangingFont(false);
        setShowDescription(true);

        setTimeout(() => setShowImage(true), 500);
      }
    };

    cycleAnimation();
  }, [index]);

  return (
    <section className="min-h-[95vh] flex flex-col justify-center items-center w-full text-center bg-gray-900 text-white px-6 relative">
      <AnimatePresence>
        {showImage && (
          <motion.img
            src="/hero-image.png"
            alt="Sophisticated Effect"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            whileHover={{
              filter: "none",
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            className="absolute top-8 sm:top-8 transform -translate-x-1/2 w-64 sm:w-80 filter grayscale z-0"
            style={{
              maskImage: "linear-gradient(to top, transparent 10%, white 90%)",
              WebkitMaskImage: "linear-gradient(to top, transparent 10%, white 90%)",
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showText && (
          <motion.h1
            key={texts[index]}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white relative z-10"
          >
            <motion.span
              className="inline-block text-primary-500 transition-all duration-300 relative"
              style={{
                fontFamily:
                  index === 2 && changingFont
                    ? specialFonts[fontIndex]
                    : fonts[index],
              }}
            >
              {texts[index]}
              {showStrike && index !== 2 && (
                <motion.div
                  className="absolute left-0 top-1/2 h-[2px] bg-primary-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  exit={{ width: "100%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              )}
            </motion.span>
          </motion.h1>
        )}
      </AnimatePresence>

      {showDescription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-6 text-lg max-w-2xl text-gray-300 relative z-10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="leading-relaxed"
          >
            Passionate about crafting innovative digital solutions and solving
            complex problems with clean and efficient code.
          </motion.p>
        </motion.div>
      )}
    </section>
  );
}
