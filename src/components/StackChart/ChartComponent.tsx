// app/page.tsx

"use client";

import React from "react";
import StackedBarChart from "./StackedBarChart";
import NullComponent from "../NullComponent/NullComponent";

// Tipe untuk data yang akan dijumlahkan
interface CategoryScores {
  category: string; // Nama kategori (TWK, TIU, TKP)
  score: number; // Skor total untuk kategori
  totalQuestions: number; // Jumlah total pertanyaan untuk kategori
  correctAnswers: number; // Jumlah jawaban benar
  wrongAnswers: number; // Jumlah jawaban salah
}

interface Session {
  try_out_session_id: number;
  product_try_out_id: number;
  is_trial: boolean;
  question_id: number;
  product_name: string;
  total_score: number;
  total_user_answer: number;
  expired_at: Date;
  category_scores: CategoryScores[];
}

const ChartComponent = ({ data }: { data: Session[] | undefined }) => {
  // Jika sessions kosong, tampilkan NullComponent
  if (!data || data.length === 0) {
    return <NullComponent message="Kerjakan TryOut Premium untuk melihat grafik pengerjaan kamu" />;
  }

  // Menyiapkan data untuk StackedBarChart tanpa mengelompokkan berdasarkan product_name
  const chartData = data.map((session) => ({
    name: session.product_name, // Gunakan product_name untuk label X
    score: session.total_score,
    TWK: session.category_scores.find((c) => c.category === "TWK")?.score || 0,
    TIU: session.category_scores.find((c) => c.category === "TIU")?.score || 0,
    TKP: session.category_scores.find((c) => c.category === "TKP")?.score || 0,
  }));

  return (
    <div className="chart-wrapper">
      <StackedBarChart data={chartData} />
    </div>
  );
};

export default ChartComponent;
