import { Smartphone, BookCheck, Users2, Timer, BarChart3, Award } from "lucide-react";
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
    description: "Bisa akses try out, cheat sheet, dan video lewat HP atau laptop.",
  },
  {
    icon: <BookCheck className="h-6 w-6 text-[#D94B6B]" />,
    title: "Kisi-kisi Terbaru",
    description: "Selalu up-to-date dengan kisi-kisi terbaru setiap tahun.",
  },
  {
    icon: <Users2 className="h-6 w-6 text-[#D94B6B]" />,
    title: "Pengajar Kompeten",
    description: "Mengajar dengan hati, siap mendampingi perjalanan belajarmu.",
  },
  {
    icon: <Timer className="h-6 w-6 text-[#D94B6B]" />,
    title: "History & Grafik Nilai",
    description: "Lihat history dan grafik nilai kamu setelah mengerjakan try out.",
  },
  {
    icon: <Award className="h-6 w-6 text-[#D94B6B]" />,
    title: "Rangking Nasional",
    description: "Ukur kemampuanmu dan berkompetisi se-Indonesia.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-[#D94B6B]" />,
    title: "Evaluasi Detail",
    description: "Dapatkan evaluasi & pembahasan hasil try out secara detail.",
  },
];
