import { Target, School, Notebook, PlaySquare } from "lucide-react"; // Pilih ikon dari lucide-react
import { ReactNode } from "react";

interface ProdukItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export const produkData: ProdukItem[] = [
  {
    icon: <Target className="h-6 w-6 text-[#D94B6B]" />,
    title: "Try Out",
    description: "Latihan soal gratis sekali saja atau premium sepuasnya. Tersedia History Nilai dan Rangking Nasional TO!",
  },
  {
    icon: <School className="h-6 w-6 text-[#D94B6B]" />,
    title: "Bimbel",
    description: "Belajar bareng tutor lewat Zoom, bahas soal dan strategi bareng peserta lain.",
  },
  {
    icon: <Notebook className="h-6 w-6 text-[#D94B6B]" />,
    title: "Smart Book",
    description: "Ebook & Cheat Sheet SKD & SKB.",
  },
  {
    icon: <PlaySquare className="h-6 w-6 text-[#D94B6B]" />,
    title: "Video Belajar",
    description: "Video materi CPNS dan BUMN. Akses kapan aja, sepuasnya.",
  },
];
