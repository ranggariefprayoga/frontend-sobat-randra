import { Smartphone, BookCheck, Timer, BarChart3, Award } from "lucide-react";
import { ReactNode } from "react";

export interface KeunggulanItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export const keunggulanKamiData: KeunggulanItem[] = [
  {
    icon: <Smartphone className="h-6 w-6 text-[#D94B6B]" />,
    title: "Akses Mudah",
    description: "Bisa akses TryOut dan CheatSheet lewat HP, tablet, atau laptop dimana saja, kapan saja.",
  },
  {
    icon: <BookCheck className="h-6 w-6 text-[#D94B6B]" />,
    title: "Kisi-kisi berdasarkan KemenPAN-RB",
    description: "Selalu up-to-date dengan kisi-kisi dari KemenPAN-RB.",
  },
  // {
  //   icon: <Users2 className="h-6 w-6 text-[#D94B6B]" />,
  //   title: "Pengajar Kompeten",
  //   description: "Mengajar dengan hati, siap mendampingi perjalanan belajarmu.",
  // },
  {
    icon: <Timer className="h-6 w-6 text-[#D94B6B]" />,
    title: "History & Grafik Nilai",
    description: "Untuk mengukur seberapa jauh kesiapan kamu dalam mengerjakan soal.",
  },
  {
    icon: <Award className="h-6 w-6 text-[#D94B6B]" />,
    title: "Rangking Nasional",
    description: "Lihat posisimu diantara pesaing lainnya.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-[#D94B6B]" />,
    title: "Detail Evaluasi",
    description: "Dapatkan evaluasi & pembahasan hasil TryOut secara detail.",
  },
];
