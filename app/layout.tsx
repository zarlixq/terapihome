import "./globals.css";
import type { Metadata } from "next";
import Topbar from "./components/Topbar";
import WhatsappButton from "./components/WhatsappButton";

// Google Font
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Antalya Koltuk Yıkama | Profesyonel Yerinde Temizlik | TerapiHome",
  description:
    "Antalya'da evde koltuk yıkama, çekyat temizliği, yatak yıkama ve araç içi detaylı temizlik hizmeti. Güçlü makineler, derinlemesine hijyen, uygun fiyat ve hızlı servis.",
  keywords: [
    "Antalya koltuk yıkama",
    "evde koltuk yıkama",
    "yerinde koltuk yıkama",
    "koltuk temizleme",
    "çekyat yıkama antalya",
    "yatak yıkama antalya",
    "koltuk yıkama fiyatları",
    "profesyonel koltuk temizliği",
    "araç içi detaylı temizlik",
    "buharlı koltuk temizliği",
    "leke çıkarma hizmeti",
    "Antalya temizlik hizmetleri"
  ],
  openGraph: {
    title: "Antalya Koltuk Yıkama | TerapiHome",
    description:
      "Antalya’da profesyonel koltuk yıkama, çekyat ve yatak temizliği. Evde yerinde hizmet, güçlü makineler, hızlı ve güvenilir çözüm.",
    url: "https://www.terapihome.com",
    siteName: "TerapiHome",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://www.terapihome.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Antalya Koltuk Yıkama TerapiHome",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antalya Koltuk Yıkama | TerapiHome",
    description:
      "Antalya'da evde koltuk yıkama ve detaylı temizlik hizmeti. Profesyonel ekip, hijyenik sonuçlar, uygun fiyatlar.",
    images: ["https://www.terapihome.com/og-image.jpg"],
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      {/*
        DÜZELTME: `bg-black` ve `text-white` sınıfları kaldırıldı.
        Bu sınıflar, globals.css dosyasındaki renk yönetimini eziyordu.
        Artık arka plan ve metin renkleri merkezi olarak CSS dosyasından yönetilecek.
      */}
      <body className={`${poppins.className} scroll-smooth`}>
        {/* Üst menü */}
        <Topbar />

        {/* Sayfa içerikleri */}
        {children}

      

        {/* Sağ altta WhatsApp butonu */}
        <WhatsappButton />
      </body>
    </html>
  );
}
