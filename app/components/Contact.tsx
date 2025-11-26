"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactBoxes() {
  return (
    // Arka planı tamamen beyaz yapıldı (bg-white) ve metin rengi koyu griye çekildi (text-gray-800).
    <section id="contact" className="py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Başlık */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          İletişim
        </h2>
        {/* Açıklama metni rengi ayarlandı */}
        <p className="text-lg mb-12 text-gray-600">
          Bizimle hemen iletişime geçin, profesyonel temizlik hizmetimizi deneyimleyin.
        </p>

        {/* Bilgi Kartları */}
        <div className="grid gap-8 md:grid-cols-3 text-left">
          {/* Adres Kutucuğu */}
          {/* Kart arka planı çok hafif gri (bg-gray-50) ve gölge eklendi */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition ring-1 ring-gray-200">
            <MapPin className="h-10 w-10 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Adres</h3>
            <p className="text-center text-gray-700">
              Konuksever Mah. Kızılırmak Cad. Çoban Apt No:119A <br />
              Muratpaşa / Antalya
            </p>
          </div>

          {/* Telefon Kutucuğu */}
          {/* Kart arka planı, metin rengi ve hover efekti güncellendi */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition ring-1 ring-gray-200">
            <Phone className="h-10 w-10 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Telefon</h3>
            <a
              href="tel:+905306209416"
              // Telefon numarası için belirgin bir renk kullanıldı
              className="text-emerald-600 text-lg font-semibold hover:underline"
            >
              +90 530 620 94 16
            </a>
          </div>

          {/* Mail Kutucuğu */}
          {/* Kart arka planı, metin rengi ve hover efekti güncellendi */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition ring-1 ring-gray-200">
            <Mail className="h-10 w-10 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">E-posta</h3>
            <a
              href="mailto:terapihometr@gmail.com"
              // E-posta adresi için turuncu vurgu rengi kullanıldı
              className="text-orange-600 text-lg font-semibold hover:underline"
            >
              terapihometr@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}