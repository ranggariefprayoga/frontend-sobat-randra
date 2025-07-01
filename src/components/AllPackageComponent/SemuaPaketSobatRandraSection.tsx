"use client";

import { useRouter } from "next/navigation";

export default function SemuaPaketSobatRandraSection() {
  const router = useRouter();
  return (
    <>
      {/* === PROMO BESAR DI ATAS SENDIRI === */}
      <div className="w-full px-4 md:px-24 mt-8  grid grid-cols-1">
        <div
          onClick={() => router.push("/pilihan-paket/promo")}
          className="cursor-pointer flex items-center justify-between bg-gradient-to-r from-[#EF476F] to-[#FFB5A7] text-white px-6 py-4 rounded-xl shadow-md hover:scale-[1.01] transition"
        >
          <div className="flex flex-col flex-1 min-w-0 pr-4">
            <h3 className="text-base md:text-lg font-bold mb-1 truncate">Promo Spesial</h3>
            <p className="text-sm">Dapatkan diskon terbatas untuk paket belajar pilihanmu!</p>
          </div>
          <img src="/layanan/promo.svg" alt="Promo" className="w-14 md:w-16 h-auto flex-shrink-0" />
        </div>
      </div>

      {/* === LIST PRODUK === */}
      <div className="w-full px-4 md:px-24 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
        {/* Try Out */}
        <div
          onClick={() => router.push("/pilihan-paket/tryout")}
          className="cursor-pointer flex items-center justify-between bg-gradient-to-r from-[#D94B6B] to-[#FFAC6C] text-white px-6 py-4 rounded-xl shadow-md hover:scale-[1.01] transition"
        >
          <div className="flex flex-col flex-1 min-w-0 pr-4">
            <h3 className="text-base md:text-lg font-bold mb-1 truncate">Try Out</h3>
            <p className="text-sm">Latihan soal premium & gratis. Skor langsung keluar!</p>
          </div>
          <img src="/layanan/tryout.svg" alt="Try Out" className="w-14 md:w-16 h-auto flex-shrink-0" />
        </div>

        {/* Bimbel */}
        <div
          onClick={() => router.push("/pilihan-paket/bimbel")}
          className="cursor-pointer flex items-center justify-between bg-gradient-to-r from-[#F97316] to-[#FFAC6C] text-white px-6 py-4 rounded-xl shadow-md hover:scale-[1.01] transition"
        >
          <div className="flex flex-col flex-1 min-w-0 pr-4">
            <h3 className="text-base md:text-lg font-bold mb-1 truncate">Bimbel</h3>
            <p className="text-sm">Belajar bareng tutor via Zoom. Fokus ke materi penting!</p>
          </div>
          <img src="/layanan/bimbel.svg" alt="Bimbel" className="w-14 md:w-16 h-auto flex-shrink-0" />
        </div>

        {/* Smart Book */}
        <div
          onClick={() => router.push("/pilihan-paket/smartbook")}
          className="cursor-pointer flex items-center justify-between bg-gradient-to-r from-[#6F86FF] to-[#A094F7] text-white px-6 py-4 rounded-xl shadow-md hover:scale-[1.01] transition"
        >
          <div className="flex flex-col flex-1 min-w-0 pr-4">
            <h3 className="text-base md:text-lg font-bold mb-1 truncate">Smart Book</h3>
            <p className="text-sm">Ebook interaktif SKD/SKB. Praktis & padat materi.</p>
          </div>
          <img src="/layanan/cheatsheet.svg" alt="Smart Book" className="w-14 md:w-16 h-auto flex-shrink-0" />
        </div>

        {/* Video Belajar */}
        <div
          onClick={() => router.push("/pilihan-paket/video-belajar")}
          className="cursor-pointer flex items-center justify-between bg-gradient-to-r from-[#47CACC] to-[#91EAE4] text-white px-6 py-4 rounded-xl shadow-md hover:scale-[1.01] transition"
        >
          <div className="flex flex-col flex-1 min-w-0 pr-4">
            <h3 className="text-base md:text-lg font-bold mb-1 truncate">Video Belajar</h3>
            <p className="text-sm">Akses materi CPNS & BUMN lewat video kapan aja.</p>
          </div>
          <img src="/layanan/video-belajar.svg" alt="Video Belajar" className="w-14 md:w-16 h-auto flex-shrink-0" />
        </div>
      </div>
    </>
  );
}
