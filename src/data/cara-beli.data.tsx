import { HelpCircle, Lock, ShoppingCart, User, RefreshCcw, BookOpen, FileText, Smartphone } from "lucide-react";

export const caraBeliData = [
  {
    title: "Cara Membeli Try Out Berbayar",
    trigger: "Beli Try Out Berbayar",
    description: "Ikuti langkah-langkah berikut untuk membeli paket Try Out Berbayar.",
    details: ["Kunjungi website pejuangkedinasan.id", "Buat akun (jika belum ada)", "Hubungi Admin untuk melakukan pembayaran dan konfirmasi pembayaran.", "Setelah konfirmasi, Admin akan memberikan akses AKUN PREMIUM kepada peserta."],
    icon: <ShoppingCart size={18} className="text-red-700" />,
  },
  {
    title: "Lupa Password",
    trigger: "Lupa Password?",
    description: "Kami belum menyediakan fitur reset password. Silakan daftar ulang dengan email yang belum terdaftar sebelumnya.",
    details: [],
    icon: <Lock size={18} className="text-red-700" />,
  },
  {
    title: "Cara Mengakses Video Belajar",
    trigger: "Akses Video Belajar",
    description: "Video belajar bisa diakses melalui menu utama setelah login ke akun Premium kamu.",
    details: ["Login dengan akun Premium", "Pilih menu 'Video Belajar'", "Klik materi yang ingin kamu pelajari"],
    icon: <BookOpen size={18} className="text-red-700" />,
  },
  {
    title: "Apakah ada versi trial?",
    trigger: "Versi Gratis / Trial",
    description: "Ya! Kamu bisa mencoba beberapa soal secara gratis sebelum membeli paket lengkap.",
    details: ["Buat akun biasa (gratis)", "Akses soal trial di menu Try Out", "Upgrade ke premium untuk soal lengkap"],
    icon: <FileText size={18} className="text-red-700" />,
  },
  {
    title: "Apakah akun saya bisa dipakai di HP dan Laptop?",
    trigger: "Bisa dipakai di HP?",
    description: "Akun kamu bisa digunakan di perangkat apa pun, baik HP, tablet, maupun laptop selama hanya satu perangkat aktif pada satu waktu.",
    details: [],
    icon: <Smartphone size={18} className="text-red-700" />,
  },
  {
    title: "Saya tidak bisa login, kenapa?",
    trigger: "Gagal Login",
    description: "Pastikan email dan password sudah benar. Jika masih gagal, coba logout dan login ulang atau hubungi admin.",
    details: [],
    icon: <User size={18} className="text-red-700" />,
  },
  {
    title: "Bagaimana proses refund?",
    trigger: "Minta Refund",
    description: "Kami memberikan refund hanya jika ada kesalahan sistem dan transaksi tidak berhasil. Hubungi admin untuk verifikasi.",
    details: [],
    icon: <RefreshCcw size={18} className="text-red-700" />,
  },
  {
    title: "Apakah ada grup diskusi?",
    trigger: "Join Grup Diskusi",
    description: "Kamu bisa bergabung ke grup diskusi Telegram setelah menjadi member premium. Link akan diberikan oleh admin.",
    details: [],
    icon: <HelpCircle size={18} className="text-red-700" />,
  },
];
