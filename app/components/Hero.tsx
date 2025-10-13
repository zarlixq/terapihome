"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  motion,
  AnimatePresence,
  type MotionProps,
  type Transition,
  type PanInfo,
} from "framer-motion";

import hero1 from "@/public/images/hero1.png";
import hero2 from "@/public/images/hero2.png";
import hero3 from "@/public/images/hero3.png";

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 18 },
  transition: { duration: 0.6, ease: EASE, delay },
});

type Slide = { img: StaticImageData; title: string; desc: string; alt?: string };

const SLIDES: Slide[] = [
  {
    img: hero1,
    title: "Ev Koltuğu Yıkama",
    desc: "Kumaş kanepelerde derinlemesine temizlik; leke, koku ve toz akarlarına veda.",
  },
  {
    img: hero2,
    title: "Araba Koltuğu Temizliği",
    desc: "Kumaş/deri oto koltuklarında profesyonel temizlik; inatçı lekelerde etkili, hızlı kuruma.",
  },
  {
    img: hero3,
    title: "Sandalye & Döşeme Temizliği",
    desc: "Yemek sandalyesi, ofis koltuğu ve minderlerde hijyenik yıkama; ferah koku, uzun süreli temizlik.",
  },
];

const PHONE_E164 = "+905545978717"; // tel deeplink için

export default function Hero() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % SLIDES.length);
  const prev = () => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, []);

  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dx = info.offset.x;
    if (dx > 60) prev();
    else if (dx < -60) next();
  };

  const slide = SLIDES[i];

  return (
    <section
      className="relative isolate overflow-hidden text-white min-h-[80svh] md:min-h-[88svh] select-none"
      style={{ fontFamily: "var(--font-ios)" }}
      aria-label="Kahraman görsel slaytları"
    >
      {/* Arkaplan slayt */}
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="absolute inset-0 -z-20"
        >
          <Image
            src={slide.img}
            alt={slide.alt ?? slide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            draggable={false}
          />
          {/* okunurluk için hafif karartma */}
          <div className="absolute inset-0 bg-black/35 md:bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* İçerik | ekranın orta tarafında */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
        className="absolute inset-0 grid place-items-center px-6"
      >
        <div className="w-full max-w-3xl text-center md:text-center">
          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
          >
            {slide.title}
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mt-4 max-w-2xl text-white/90 md:text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
          >
            {slide.desc}
          </motion.p>

          <motion.a
            {...fadeUp(0.3)}
            href={`tel:${PHONE_E164}`}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-pink-500/95 px-6 py-3 font-semibold shadow-lg backdrop-blur hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-[0.98] text-white"
            aria-label="Hemen ara"
          >
            HEMEN ARA
          </motion.a>
        </div>
      </motion.div>

      {/* Dots */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`pointer-events-auto h-2.5 w-2.5 rounded-full transition-all ${
              i === idx ? "w-6 bg-white" : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Slayt ${idx + 1}`}
          />
        ))}
      </div>

      {/* Sol/Sağ oklar */}
      <div className="absolute inset-y-0 left-3 flex items-center">
        <button
          onClick={prev}
          className="rounded-full bg-black/30 p-2 backdrop-blur pointer-events-auto hover:bg-black/40"
          aria-label="Önceki slayt"
        >
          ‹
        </button>
      </div>
      <div className="absolute inset-y-0 right-3 flex items-center">
        <button
          onClick={next}
          className="rounded-full bg-black/30 p-2 backdrop-blur pointer-events-auto hover:bg-black/40"
          aria-label="Sonraki slayt"
        >
          ›
        </button>
      </div>
    </section>
  );
}