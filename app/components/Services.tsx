"use client";

import { motion, AnimatePresence, type MotionProps, type Transition } from "framer-motion";
import {
  Sofa, Car, Ship, Armchair, Home, MapPin,
  Droplets, ShieldCheck, CheckCircle2, Sparkles, Clock,
  PlusCircle, MinusCircle, ShoppingCart
} from "lucide-react"; // KULLANILMAYAN 'PhoneCall' İKONU KALDIRILDI
import React, { useState, useMemo } from "react";

// --- İKON TİPİ ---
type Icon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// --- WHATSAPP YARDIMCISI ---
const WA_PHONE = "905306209416";
const waHref = (text: string) => {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
};

// --- ANIMASYON AYARLARI ---
const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
  viewport: { once: true, amount: 0.2 },
});


// --- HİZMET VERİLERİ (FİYAT VE GÖRSEL EKLEMELERİYLE) ---
const SERVICES: {
  id: string; // Sepet yönetimi için benzersiz ID
  title: string;
  icon: Icon;
  desc: string;
  price: number; // Her hizmet için fiyat
  visual: string; // Animasyon için emoji veya basit SVG
  bullets: string[];
  badges: { icon: Icon; label: string }[];
}[] = [
  {
    id: "koltuk_takimi",
    title: "Ev & Ofis Koltuk Takımı",
    icon: Sofa,
    desc: "Leke ve kokuya sebep olan derin kirleri güçlü ekstraksiyon ile çekerek kumaşları ilk günkü ferahlığına yaklaştırırız.",
    price: 850,
    visual: "🛋️",
    bullets: ["Derinlemesine hijyen", "Koku yenileme", "Kumaş dostu çözümler"],
    badges: [{ icon: Droplets, label: "Alerjen azaltma" }, { icon: ShieldCheck, label: "Koruma opsiyonu" }],
  },
  {
    id: "arac_koltugu",
    title: "Araç Koltuğu & İç Detaylı",
    icon: Car,
    desc: "Koltuklar, taban halısı ve tavan gibi bölgelerde biriken kirleri güçlü vakum ve ekstraksiyonla uzaklaştırırız.",
    price: 1200,
    visual: "🚗",
    bullets: ["Koltuk & döşeme derin temizlik", "Koku tazeleme, detaylı bakım", "Yerinde temizlik (adresinizde)"],
    badges: [{ icon: MapPin, label: "Yerinde temizlik" }, { icon: Sparkles, label: "Detaylı iç temizlik" }],
  },
  {
    id: "yat_doseme",
    title: "Yat & Tekne Döşeme",
    icon: Ship,
    desc: "Tuz, nem ve güneş kaynaklı zor lekeleri malzemeye uygun ürünlerle çıkarır; küf ve koku oluşumunu azaltırız.",
    price: 2500,
    visual: "🚤",
    bullets: ["Vinyl/deri/döşeme için uygun kimyasal", "Tuz & nem kaynaklı leke giderimi", "UV sonrası bakım"],
    badges: [{ icon: ShieldCheck, label: "Malzeme güvenliği" }, { icon: Droplets, label: "Küf/koku azaltma" }],
  },
  {
    id: "tekli_koltuk",
    title: "Berjer / Tekli Koltuk",
    icon: Armchair,
    desc: "Tekli koltuk ve berjerler için özel, detaylı temizlik hizmeti. Kumaşın dokusuna zarar vermeden hijyen sağlar.",
    price: 300,
    visual: " armchair ", // custom emoji
    bullets: ["Yerinde hızlı uygulama", "Lekelerde nokta müdahale", "Kısa kuruma süresi"],
    badges: [{ icon: Clock, label: "Kısa kuruma" }, { icon: Sparkles, label: "Görünür tazelik" }],
  },
    {
    id: "sandalye",
    title: "Sandalye / Kafe Koltuğu",
    icon: Armchair,
    desc: "Kafe, restoran ve ofis oturma gruplarında hızlı uygulama + kısa kuruma süresiyle görünür tazelik sağlar.",
    price: 150,
    visual: "🪑",
    bullets: ["Yerinde hızlı uygulama", "Lekelerde nokta müdahale", "Yoğun kullanım için planlama"],
    badges: [{ icon: Clock, label: "Kısa kuruma" }, { icon: Sparkles, label: "Görünür tazelik" }],
  },
  {
    id: "yatak",
    title: "Yatak Yıkama",
    icon: Home, // Bed icon'u yerine Home kullanılmış
    desc: "Alerjen ve akarlardan arındırılmış, derinlemesine temizlenmiş yataklar ile daha sağlıklı bir uyku ortamı yaratıyoruz.",
    price: 600,
    visual: "🛏️",
    bullets: ["Akar ve alerjen temizliği", "Derinlemesine hijyen", "Hızlı kuruma"],
    badges: [{ icon: ShieldCheck, label: "Hijyen odaklı" }, { icon: Droplets, label: "Koku giderme" }],
  },
];


export default function Services() {
  // --- STATE'LER ---
  const [cart, setCart] = useState<Record<string, number>>({});

  // --- SEPET FONKSİYONLARI ---
  const addToCart = (serviceId: string) => {
    setCart(prev => ({
      ...prev,
      [serviceId]: (prev[serviceId] || 0) + 1,
    }));
  };

  const removeFromCart = (serviceId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[serviceId] > 1) {
        newCart[serviceId] -= 1;
      } else {
        delete newCart[serviceId];
      }
      return newCart;
    });
  };
  
  // --- HESAPLAMALAR ---
  const totalPrice = useMemo(() => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const service = SERVICES.find(s => s.id === id);
      return total + (service ? service.price * quantity : 0);
    }, 0);
  }, [cart]);

  const whatsAppMessage = useMemo(() => {
    if (Object.keys(cart).length === 0) {
      return "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.";
    }
    const cartDetails = Object.entries(cart).map(([id, quantity]) => {
      const service = SERVICES.find(s => s.id === id);
      return `- ${service?.title} (x${quantity})`;
    }).join("\n");

    return `Merhaba, aşağıdaki hizmetler için randevu ve fiyat teklifi almak istiyorum:\n\n${cartDetails}\n\n*Toplam Tutar: ${totalPrice} TL*`;
  }, [cart, totalPrice]);

  const cartVisuals = useMemo(() => {
    return Object.entries(cart).flatMap(([id, quantity]) => {
      const service = SERVICES.find(s => s.id === id);
      return Array.from({ length: quantity }, (_, i) => ({
        id: `${id}-${i}`,
        visual: service?.visual || '❓'
      }));
    });
  }, [cart]);


  return (
    <section id="services" className="relative overflow-hidden pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#FFF7F0] via-white to-white" />
      <div className="pointer-events-none absolute right-[-15%] top-[12%] h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-[#F27A1A]/20 blur-[80px]" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.div {...fadeUp(0.05)} className="text-center">
          <span className="inline-block rounded-full bg-[#F27A1A]/10 px-3 py-1 text-sm font-semibold text-[#F27A1A]">
            Fiyatını Kendin Hesapla
          </span>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl text-slate-900">Hizmetlerimiz</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            İhtiyacınız olan hizmetleri seçin, anında fiyat teklifinizi görün ve WhatsApp'tan kolayca randevu alın.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const IconEl = s.icon;
            const quantity = cart[s.id] || 0;
            return (
              <motion.div
                key={s.id}
                {...fadeUp(0.1 + i * 0.08)}
                className="flex flex-col rounded-2xl border border-orange-100 bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                          <div className="rounded-xl bg-[#F27A1A]/10 p-3">
                            <IconEl className="h-7 w-7 text-[#F27A1A]" />
                          </div>
                          <h3 className="text-xl font-semibold text-slate-900">{s.title}</h3>
                      </div>
                      <span className="text-2xl font-bold text-[#F27A1A]">{s.price} TL</span>
                  </div>

                  <p className="mt-3 text-slate-600">{s.desc}</p>

                  <ul className="mt-4 space-y-2 text-sm">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {s.badges.map(({ icon: BIcon, label }) => (
                      <span key={label} className="inline-flex items-center gap-1 rounded-full bg-[#F27A1A]/10 px-3 py-1 text-xs text-[#F27A1A]">
                        <BIcon className="h-4 w-4" /> {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4">
                  <button onClick={() => removeFromCart(s.id)} disabled={!quantity} className="disabled:opacity-30 disabled:cursor-not-allowed">
                    <MinusCircle className="h-10 w-10 text-slate-400 hover:text-red-500 transition-colors" />
                  </button>
                  <span className="text-3xl font-bold w-12 text-center text-slate-900">{quantity}</span>
                  <button onClick={() => addToCart(s.id)}>
                    <PlusCircle className="h-10 w-10 text-slate-400 hover:text-green-500 transition-colors" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {Object.keys(cart).length > 0 && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ ease: EASE, duration: 0.6 }}
            className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-2xl backdrop-blur-lg"
          >
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-700">Sepetinizdeki Hizmetler:</h4>
                  <div className="mt-2 flex h-20 items-end justify-center gap-2 rounded-lg bg-slate-100 p-2 overflow-hidden">
                    <AnimatePresence>
                      {cartVisuals.map(item => (
                        <motion.span
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: -20, scale: 0.5 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="text-4xl"
                          style={{
                              fontFamily: item.visual === ' armchair ' ? 'serif' : 'sans-serif',
                              fontSize: item.visual === ' armchair ' ? '2.5rem' : '2.25rem',
                              lineHeight: item.visual === ' armchair ' ? '1' : '1.25',
                              display: 'inline-block',
                              transform: item.visual === ' armchair ' ? 'scaleX(-1)' : 'none',
                           }}
                        >
                          {item.visual === ' armchair ' ? '🪑' : item.visual}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
                  <div className="text-center md:text-right">
                    <p className="text-sm font-medium text-slate-600">Toplam Tutar</p>
                    <p className="text-4xl font-extrabold text-[#F27A1A]">{totalPrice} TL</p>
                  </div>
                  <a
                    href={waHref(whatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-4 font-bold text-white shadow-lg transition hover:bg-[#128C7E] md:w-auto"
                  >
                    <ShoppingCart className="h-6 w-6" />
                      {'WhatsApp’tan Randevu Al'} 
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}