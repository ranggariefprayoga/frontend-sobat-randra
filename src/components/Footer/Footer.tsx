"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/auth")) {
    return null;
  }
  const products = ["TryOut", "CheatSheet"];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };
  return (
    <LayoutBackgroundWhite>
      <footer className="w-full px-4 md:px-24 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1280px] mx-auto">
          {/* Logo & Deskripsi */}
          <div className="flex flex-col gap-4">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0}>
              <Image src="/logo/logo-bg.jpg" alt="Logo Sobat Randra" width={100} height={100} className="object-contain rounded-full" />
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" animate="visible" custom={1} className="text-sm md:text-base text-black/80">
              Satu platform lengkap buat kamu yang siap taklukin CPNS. Akses TryOut dan CheatSheet kapan saja, di mana saja.
            </motion.p>
          </div>

          {/* Kontak Kami */}
          <div>
            <motion.h4 variants={fadeInUp} initial="hidden" animate="visible" custom={2} className="text-base md:text-lg font-semibold mb-4">
              Kontak Kami
            </motion.h4>
            <ul className="flex flex-col gap-3 text-sm md:text-base">
              {[
                {
                  icon: (
                    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="24px">
                      <path
                        fill="#000000"
                        fillRule="evenodd"
                        d="M414.73 97.1A222.14 222.14 0 0 0 256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0 0 29.78 111L32 480l118.25-30.87a223.63 223.63 0 0 0 106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 0 0 414.73 97.1M256.94 438.66h-.08a185.75 185.75 0 0 1-94.36-25.72l-6.77-4l-70.17 18.32l18.73-68.09l-4.41-7A183.46 183.46 0 0 1 71.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 0 1 185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52m101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78s-14.4 18-17.65 21.75s-6.5 4.16-12.07 1.38s-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26s.93-6.94-.46-9.71s-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52c-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 0 0-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38s39.3 59.73 95.21 83.76a323.11 323.11 0 0 0 31.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2c10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37s-5.11-3.71-10.69-6.48"
                      />
                    </svg>
                  ),
                  text: "+62 851-2463-1275",
                  href: "https://wa.me/6285124631275?text=Halo%20min%20aku%20mau%20konsultasi%20mengenai%20layanan%20di%20Sobat%20Randra%20dong",
                },
                {
                  icon: (
                    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="24px">
                      <path
                        fill="#000000"
                        d="M349.33 69.33a93.62 93.62 0 0 1 93.34 93.34v186.66a93.62 93.62 0 0 1-93.34 93.34H162.67a93.62 93.62 0 0 1-93.34-93.34V162.67a93.62 93.62 0 0 1 93.34-93.34zm0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32"
                      />
                      <path fill="#000000" d="M377.33 162.67a28 28 0 1 1 28-28a27.94 27.94 0 0 1-28 28M256 181.33A74.67 74.67 0 1 1 181.33 256A74.75 74.75 0 0 1 256 181.33m0-37.33a112 112 0 1 0 112 112a112 112 0 0 0-112-112" />
                    </svg>
                  ),
                  text: "@sobat.randra",
                  href: "https://instagram.com/sobat.randra",
                },
                {
                  icon: (
                    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="24px">
                      <path
                        fill="#000000"
                        d="M412.19 118.66a109.27 109.27 0 0 1-9.45-5.5a132.87 132.87 0 0 1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14 23.9 350 16 350.13 16h-82.44v318.78c0 4.28 0 8.51-.18 12.69c0 .52-.05 1-.08 1.56c0 .23 0 .47-.05.71v.18a70 70 0 0 1-35.22 55.56a68.8 68.8 0 0 1-34.11 9c-38.41 0-69.54-31.32-69.54-70s31.13-70 69.54-70a68.9 68.9 0 0 1 21.41 3.39l.1-83.94a153.14 153.14 0 0 0-118 34.52a161.79 161.79 0 0 0-35.3 43.53c-3.48 6-16.61 30.11-18.2 69.24c-1 22.21 5.67 45.22 8.85 54.73v.2c2 5.6 9.75 24.71 22.38 40.82A167.53 167.53 0 0 0 115 470.66v-.2l.2.2c39.91 27.12 84.16 25.34 84.16 25.34c7.66-.31 33.32 0 62.46-13.81c32.32-15.31 50.72-38.12 50.72-38.12a158.46 158.46 0 0 0 27.64-45.93c7.46-19.61 9.95-43.13 9.95-52.53V176.49c1 .6 14.32 9.41 14.32 9.41s19.19 12.3 49.13 20.31c21.48 5.7 50.42 6.9 50.42 6.9v-81.84c-10.14 1.1-30.73-2.1-51.81-12.61"
                      />
                    </svg>
                  ),
                  text: "sobatrandra",
                  href: "https://www.tiktok.com/@sobatrandra",
                },
                {
                  icon: (
                    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24px" height="24px">
                      <path
                        fill="#FF0000"
                        d="M549.655 124.083c-6.28-23.734-24.78-42.22-48.52-48.5C440.16 64 288 64 288 64S135.84 64 74.86 75.58c-23.73 6.27-42.22 24.77-48.5 48.5C16 176.06 16 256 16 256s0 79.94 10.38 131.917c6.28 23.73 24.78 42.22 48.52 48.5C135.84 448 288 448 288 448s152.16 0 213.14-11.583c23.74-6.27 42.23-24.77 48.52-48.5C560 335.94 560 256 560 256s0-79.94-10.38-131.917zm-308.623 214.32L388.5 256l-147.47-82.413v164.826z"
                      />
                    </svg>
                  ),
                  text: "Sobat Randra",
                  href: "https://www.youtube.com/@SobatRandra",
                },
              ].map((item, i) => (
                <motion.li key={i} variants={fadeInUp} initial="hidden" animate="visible" custom={3 + i} className="flex items-start gap-3">
                  <div className="flex items-center justify-center gap-2">
                    {item.icon}
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Unit Kami */}
          <div>
            <motion.h4 variants={fadeInUp} initial="hidden" animate="visible" custom={10} className="text-base md:text-lg font-semibold mb-4">
              Pilihan Paket Belajar
            </motion.h4>
            <ul className="grid grid-cols-1 gap-2 text-sm md:text-base text-black/90">
              {products.map((product, i) => (
                <motion.li key={i} variants={fadeInUp} initial="hidden" animate="visible" custom={11 + i} className="flex items-start">
                  ✅ {product}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bawah */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={30} className="text-center text-xs sm:text-sm text-black/50 mt-8 border-t border-black/20 pt-4 space-y-1">
          <p>&copy; {new Date().getFullYear()} Sobat Randra. All rights reserved.</p>
          <p>
            Website ini dibuat oleh{" "}
            <a href="https://randraweb.com" target="_blank" rel="noopener noreferrer" className="text-red-700 bg-red-200 px-2 rounded-md hover:underline font-semibold transition-all duration-300">
              Randra Web
            </a>
          </p>
        </motion.div>
      </footer>
    </LayoutBackgroundWhite>
  );
}
