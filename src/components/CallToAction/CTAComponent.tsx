"use client";

import { Button } from "../ui/button";

export default function BannerCPNS() {
  return (
    <section className="w-full bg-red-100 rounded-[2rem] text-red-900 overflow-hidden shadow-md mt-8 mb-8">
      <div className="relative bg-red-100 px-6 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Sudah Siap Lulus Seleksi CPNS?</h2>
        <p className="text-base md:text-lg text-red-800/90 mb-6">Jangan tunda belajar. Mulai dari sekarang untuk persiapan yang lebih matang!</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button variant="outline" className="bg-white text-red-700 font-semibold px-6 py-2 rounded-xl  transition">
            Mulai Belajar!
          </Button>
          <Button variant="outline" className="bg-white text-red-700 font-semibold px-6 py-2 rounded-xl  transition">
            Tanya Admin
          </Button>
        </div>
        {/* Potongan miring bawah warna red-700 */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-red-700 rotate-[2.5deg] translate-y-1/2 z-[-1]" />
      </div>
    </section>
  );
}
