"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6 text-center">
      <h1 className="text-6xl font-bold text-[#ad0a1f] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 mb-6">Sepertinya kamu berada di halaman yang salah atau halaman ini sudah tidak tersedia.</p>
      <Link href="/" className="bg-[#ad0a1f] hover:bg-[#d7263d] text-white px-6 py-3 rounded-full transition">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
