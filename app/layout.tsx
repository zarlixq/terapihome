import "./globals.css";
import type { Metadata } from "next";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import WhatsappButton from "./components/WhatsappButton";

// Google Font
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Antalya Koltuk Yıkama | TerapiHome",
  description:
    "Antalya'da profesyonel koltuk yıkama hizmeti. Evde, ofiste ve aracınızda güçlü ekstraksiyon makineleriyle derin temizlik. Uygun fiyat, güvenilir hizmet, hemen arayın!",
  keywords: [
    "Antalya koltuk yıkama",
    "evde koltuk yıkama",
    "profesyonel koltuk temizliği",
    "koltuk yıkama fiyatları",
    "araç içi detaylı temizlik",
  ],
  openGraph: {
    title: "Antalya Koltuk Yıkama | TerapiHome",
    description:
      "Antalya'da profesyonel koltuk yıkama ve detaylı temizlik hizmeti. Ev, ofis ve araç için hijyenik çözümler.",
    url: "https://www.terapihome.com",
    siteName: "TerapiHome",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antalya Koltuk Yıkama | TerapiHome",
    description:
      "Antalya'da profesyonel koltuk yıkama hizmeti. Evde, ofiste ve aracınızda güvenilir temizlik çözümleri.",
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

        {/* Alt kısım */}
        <Footer />

        {/* Sağ altta WhatsApp butonu */}
        <WhatsappButton />
      </body>
    </html>
  );
}
