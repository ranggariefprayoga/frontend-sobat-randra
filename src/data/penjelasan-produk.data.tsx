import { Book, Users, Video, BookOpen } from "lucide-react"; // Pilih ikon dari lucide-react
import { ReactNode } from "react";

interface ProdukItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export const produkData: ProdukItem[] = [
  {
    icon: <BookOpen className="h-6 w-6 text-[#ad0a1f]" />,
    title: "Try Out",
    description: "Tersedia dalam dua tipe: Gratis (hanya bisa dikerjakan sekali) dan Premium (bisa dikerjakan berkali-kali).",
  },
  {
    icon: <Users className="h-6 w-6 text-[#ad0a1f]" />,
    title: "Bimbel",
    description: "Dapatkan bimbingan secara private atau barengan melalui Zoom meeting.",
  },
  {
    icon: <Book className="h-6 w-6 text-[#ad0a1f]" />,
    title: "Smart Book",
    description: "Pilih antara Smart Book SKD atau Smart Book SKB sesuai kebutuhan persiapan kamu.",
  },
  {
    icon: <Video className="h-6 w-6 text-[#ad0a1f]" />,
    title: "Video Belajar",
    description: "Beli akses video belajar untuk materi CPNS, BUMN, atau Polri dan pelajari kapan saja.",
  },
];
