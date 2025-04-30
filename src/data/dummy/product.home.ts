import { BimbelProductlModel, TryOutProductModel } from "@/model/product.model";

export const dummyProductTryOut: TryOutProductModel[] = [
  {
    id: 1,
    name: "Try Out CPNS 2023",

    is_active: true,
    banner_image: "/background/1.png",
    description: "Persiapkan dirimu untuk CPNS 2023 dengan try out terbaru!",
    marketing_text: "Dapatkan pengalaman Try Out CPNS yang lebih realistis.",
    old_price: 200000,
    price: 150000,

    created_at: "2023-05-01T10:00:00Z",
    updated_at: "2023-05-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Try Out BUMN 2023",

    is_active: true,
    banner_image: "https://example.com/banner/bumn2023.jpg",
    description: "Persiapkan diri untuk ujian seleksi BUMN dengan try out kami.",
    marketing_text: "Try Out BUMN 2023, pilihan terbaik untuk memulai karirmu.",
    old_price: 250000,
    price: 200000,

    created_at: "2023-06-01T10:00:00Z",
    updated_at: "2023-06-01T10:00:00Z",
  },
  {
    id: 3,
    name: "Try Out Polri 2023",

    is_active: true,
    banner_image: "https://example.com/banner/polri2023.jpg",
    description: "Uji kemampuanmu dengan Try Out Polri terbaru, persiapkan dirimu!",
    marketing_text: "Try Out Polri 2023, ujian yang menantang bagi calon polisi.",
    old_price: 220000,
    price: 180000,

    created_at: "2023-07-01T10:00:00Z",
    updated_at: "2023-07-01T10:00:00Z",
  },
];

export const dummyProductBimbel: BimbelProductlModel[] = [
  {
    id: 1,
    name: "Kelas Belajar Matematika",
    is_active: true,
    category: "Kelas Belajar Bareng (KBB)",
    capacity: 30,
    banner_image: "https://example.com/banner-matematika.jpg",
    description: "Kelas belajar bersama untuk memperdalam pemahaman tentang matematika dasar dan lanjutan.",
    jadwal_bimbel: "https://example.com/jadwal-matematika.jpg",
    price: 150000,
    old_price: 200000,
    link_to_meeting: "https://zoom.us/j/123456789",
    link_to_whatsApp: "https://wa.me/628123456789",
    created_at: "2025-01-01T10:00:00",
    updated_at: "2025-01-01T10:00:00",
  },
  {
    id: 2,
    name: "Private English Class",
    is_active: true,
    category: "Private Bareng Minsob",
    capacity: 5,
    banner_image: "https://example.com/banner-english.jpg",
    description: "Kelas privat untuk meningkatkan kemampuan bahasa Inggris, mulai dari percakapan sehari-hari hingga TOEFL.",
    jadwal_bimbel: "https://example.com/jadwal-english.jpg",
    price: 350000,
    old_price: 400000,
    link_to_meeting: "https://zoom.us/j/987654321",
    link_to_whatsApp: "https://wa.me/628987654321",
    created_at: "2025-01-01T10:00:00",
    updated_at: "2025-01-01T10:00:00",
  },
];
