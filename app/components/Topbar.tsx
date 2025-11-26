"use client";

import { Phone } from "lucide-react";

export default function Topbar() {
  return (
    <header className="w-full absolute top-0 left-0 z-40 bg-black">
      {/* Üst kısım → Logo + Telefon */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        
        {/* Sol Logo */}
        <div className="text-2xl md:text-3xl font-bold select-none tracking-tight">
          <span className="text-orange-500">Terapi</span>
          <span className="text-white ml-1">Home</span>
        </div>

        {/* Sağ telefon numarası */}
        <a
          href="tel:+905306209416"
          className="flex items-center gap-2 text-white font-medium text-sm md:text-base hover:text-orange-400 transition"
        >
          <Phone className="h-4 w-4" />
          0530 620 94 16
        </a>
      </div>

      {/* Alt şerit → Ortalanmış bölge bilgisi */}
      <div className="bg-black border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-1.5 text-center text-white/90 text-xs md:text-sm font-medium">
          Antalya <span className="text-orange-400">📍</span> Alanya
        </div>
      </div>
    </header>
  );
}
