import { HelpCircle, Lock, ShoppingCart, User, FileText, Smartphone, FileSpreadsheet } from "lucide-react";

export const caraBeliData = [
  {
    title: "Cara Membeli TryOut Premium",
    trigger: "Cara Membeli TryOut Premium?",
    description: "Ikuti langkah-langkah berikut untuk membeli paket TryOut Premium.",
    details: [
      "Kunjungi website sobatrandra.com",
      "Buat akun (jika belum ada)",
      "Pilih Paket TryOut yang kamu inginkan",
      "Hubungi Admin untuk melakukan pembayaran dan konfirmasi pembayaran.",
      "Setelah konfirmasi, Admin akan memberikan akses AKUN PREMIUM kepada kamu.",
    ],
    icon: <ShoppingCart size={18} className="text-red-700" />,
  },
  {
    title: "Lupa Password",
    trigger: "Lupa Password?",
    description: "Hubungi admin untuk melakukan reset password kamu. Kamu juga bisa mengubah password di halaman profile kamu.",
    details: [],
    icon: <Lock size={18} className="text-red-700" />,
  },
  // {
  //   title: "Cara Mengakses Video Belajar",
  //   trigger: "Cara Akses Video Belajar",
  //   description: "Video belajar bisa diakses melalui email yang kamu daftarkan saat melakukan pembelian yaa.",
  //   details: [],
  //   icon: <BookOpen size={18} className="text-red-700" />,
  // },
  {
    title: "Cara Mengakses CheatSheet",
    trigger: "Cara Mengakses CheatSheet?",
    description: "CheatSheet bisa diakses melalui email yang kamu daftarkan saat melakukan pembelian yaa. Atau kalau kamu bingung, bisa tanyain ke Admin ya☺️.",
    details: [],
    icon: <FileSpreadsheet size={18} className="text-red-700" />,
  },
  {
    title: "Apakah ada versi trial?",
    trigger: "Apa ada Uji Coba TryOut Gratis?",
    description: "Ya! Kamu bisa melakukan uji coba TryOut secara gratis, namun hanya sekali pengerjaan saja. Tujuannya agar kamu tau cara mengerjakan TryOut premium nantinya. Berikut langkah-langkahnya:",
    details: ["Buat akun biasa (jika belum ada)", "Buka Halaman Pilihan Paket, lalu pilih TryOut", "Lihat TryOut Gratis dan Mulai Kerjakan"],
    icon: <FileText size={18} className="text-red-700" />,
  },
  {
    title: "Apakah akun saya bisa dipakai di HP dan Laptop?",
    trigger: "Bisa diakses pakai HP?",
    description: "Akun kamu bisa diakses di perangkat apa pun, baik HP, tablet, maupun laptop.",
    details: [],
    icon: <Smartphone size={18} className="text-red-700" />,
  },
  {
    title: "Saya tidak bisa login, kenapa?",
    trigger: "Gagal Login",
    description: "Pastikan email dan password sudah benar. Jika masih gagal, coba hapus seluruh history browser kamu terlebih dahulu, kemudian coba login kembali.",
    details: [],
    icon: <User size={18} className="text-red-700" />,
  },
  {
    title: "Dapatkah saya mengulang TryOut?",
    trigger: "Dapatkah saya mengulang TryOut?",
    description: "Bisa, namun hanya untuk TryOut premium ya.",
    details: [],
    icon: <HelpCircle size={18} className="text-red-700" />,
  },
];
