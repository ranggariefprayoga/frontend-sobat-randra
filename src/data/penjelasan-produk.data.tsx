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
    title: "Akses Belajar Praktis",
    description: "Ngerjain try out, baca materi dan nonton video bisa diakses pake handphone dan laptop.",
  },
  {
    icon: <BookCheck className="h-6 w-6 text-[#D94B6B]" />,
    title: "Kisi-kisi Terupdate",
    description: "Kami selalu menyesuaikan dengan kisi-kisi terbaru di setiap tahunnya.",
  },
  {
    icon: <Users2 className="h-6 w-6 text-[#D94B6B]" />,
    title: "Pengajar Pilihan dan Kompeten",
    description: "Silakan curhat kekhawatiranmu kepada kami untuk diberikan solusi yang terbaik.",
  },
  {
    icon: <Timer className="h-6 w-6 text-[#D94B6B]" />,
    title: "History dan Grafik Nilai",
    description: "Kamu bisa lihat History dan Grafik Nilai kamu setelah mengerjakan soal.",
  },
  {
    icon: <Award className="h-6 w-6 text-[#D94B6B]" />,
    title: "Rangking Nasional Try Out",
    description: "Ukur kemampuanmu dengan berkompetisi bersama pengguna lainnya se-Indonesia.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-[#D94B6B]" />,
    title: "Evaluasi Secara Detail",
    description: "Evaluasi hasil belajar kamu dengan grafik super detail dan informatif.",
  },
];
