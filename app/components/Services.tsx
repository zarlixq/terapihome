"use client";

import { motion, type Transition } from "framer-motion";
import Image from "next/image";

// Framer'ın beklediği tipe göre tanımlıyoruz
const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: EASE,
    delay,
  },
  viewport: { once: true, amount: 0.2 },
});

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden pb-24 pt-16 bg-white">
      <div className="mx-auto max-w-4xl px-6 space-y-20">

        {/* 1. GÖRSEL BLOK */}
        <motion.div {...fadeUp(0.1)} className="space-y-6">
          <div className="w-full overflow-hidden rounded-2xl shadow-md bg-white">
            <Image
              src="/images/section1.png"
              alt="Neden Terapi Home?"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>

          <h2 className="text-3xl font-bold text-[#F27A1A]">
            Neden Terapi Home?
          </h2>

          <p className="text-black leading-relaxed text-lg">
            Terapi Home olarak sadece temizlik değil, güven ve kalite sunuyoruz.
            Ekibimiz profesyonel eğitimden geçmiş, kullanılan ürünler sağlık
            dostu ve tüm süreç tamamen şeffaftır. Amacımız evinizdeki yaşam
            alanlarının hijyenini en üst seviyeye çıkarırken, size hızlı,
            güvenilir ve sonuç odaklı bir hizmet sunmak.
          </p>
        </motion.div>

        {/* 2. GÖRSEL BLOK */}
        <motion.div {...fadeUp(0.2)} className="space-y-6">
          <div className="w-full overflow-hidden rounded-2xl shadow-md bg-white">
            <Image
              src="/images/section2.png"
              alt="Karcher Ekipman"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>

          <h2 className="text-3xl font-bold text-[#F27A1A] flex items-center gap-3">
            Karcher Ekipman <span className="text-2xl">🇩🇪</span>
          </h2>

          <p className="text-black leading-relaxed text-lg">
            Tüm temizlik işlemlerimizde endüstri standardı olan Alman üretimi
            Karcher profesyonel cihazlar kullanılır. Bu ekipmanlar yüksek emiş
            gücü, derinlemesine hijyen ve kalıcı temizlik etkisi sunarak,
            yüzeylere zarar vermeden maksimum performans sağlar. Alman
            mühendisliği, evinizi daha sağlıklı ve hijyenik hale getirir.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
