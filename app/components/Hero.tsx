"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  type MotionProps,
  type Transition,
  type PanInfo,
} from "framer-motion";

import logo from "@/public/images/logo.png";

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 18 },
  transition: { duration: 0.6, ease: EASE, delay },
});

const SLIDES = [
  {
    video: "/images/video1.mp4",
    title: "YIKAMA HİZMETLERİ",
    desc: "Koltuk | Yatak | Sandalye | Yerinde Halı | Araç koltuğu",
  },
  {
    video: "/images/video2.mp4",
    title: "EV TEMİZLİĞİ",
    desc: "Sabit Ev Temizliği | Boş Ev Temizliği",
  },
  {
    video: "/images/video3.mp4",
    title: "İNŞAAT TEMİZLİĞİ",
    desc: "Tadilat Sonrası Veya Kaba İnşaat Temizliği",
  },
];

const PHONE_E164 = "+905545978717";

export default function Hero() {
  const [i, setI] = useState(0);
  const [durations, setDurations] = useState<number[]>([5000, 5000, 5000]);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMetadata = (index: number, el: HTMLVideoElement) => {
    const d = el.duration;
    setDurations((prev) => {
      const copy = [...prev];
      copy[index] = (d || 5) * 1000;
      return copy;
    });
  };

  const next = () => setI((p) => (p + 1) % SLIDES.length);
  const prev = () => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      next();
    }, durations[i]);

    const video = videoRefs.current[i];
    if (video) {
      video.currentTime = 0;
      video.play?.();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [i, durations]);

  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dx = info.offset.x;
    if (dx > 60) prev();
    else if (dx < -60) next();
  };

  const slide = SLIDES[i];

  return (
    <section
      className="relative isolate overflow-hidden text-white min-h-[80vh] md:min-h-[88vh] select-none"
      style={{ fontFamily: "var(--font-ios)" }}
    >
      {/* BACKGROUND */}
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="absolute inset-0 -z-20"
        >
          <video
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={slide.video}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) =>
              handleMetadata(i, e.currentTarget as HTMLVideoElement)
            }
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/35 md:bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENT */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
        className="absolute inset-0 grid place-items-center px-6"
      >
        <div className="w-full max-w-3xl text-center flex flex-col items-center">
          {/* Logo */}
          <motion.div {...fadeUp(0)} className="flex flex-col items-center">
            <Image
              src={logo}
              alt="Logo"
              width={300}
              height={300}
              className="rounded-full shadow-xl"
            />

            <div className="mt-4 text-lg md:text-xl font-semibold text-orange-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
              Temizlik Hizmetlerinde Profesyonel Çözümler
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.1)}
            className="mt-6 text-4xl md:text-6xl font-extrabold drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
          >
            {slide.title}
          </motion.h1>

          {/* Desc */}
          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mt-4 max-w-2xl text-white/90 font-semibold text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
          >
            {slide.desc}
          </motion.p>

          {/* Call Button */}
          <motion.a
            {...fadeUp(0.3)}
            href={`tel:${PHONE_E164}`}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-pink-500/95 px-6 py-3 font-semibold shadow-lg backdrop-blur"
          >
            HEMEN ARA
          </motion.a>

          {/* Info box */}
          <motion.div
            {...fadeUp(0.35)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur text-orange-400 text-sm md:text-base font-medium shadow-md"
          >
            <span className="text-lg">🇩🇪</span>
            Karcher Marka Ekipmanlar
          </motion.div>
        </div>
      </motion.div>

      {/* DOTS */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === idx ? "w-6 bg-white" : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* ARROWS */}
      <div className="absolute inset-y-0 left-3 flex items-center z-20">
        <button
          onClick={prev}
          className="rounded-full bg-black/30 p-2 backdrop-blur"
        >
          ‹
        </button>
      </div>
      <div className="absolute inset-y-0 right-3 flex items-center z-20">
        <button
          onClick={next}
          className="rounded-full bg-black/30 p-2 backdrop-blur"
        >
          ›
        </button>
      </div>
    </section>
  );
}
