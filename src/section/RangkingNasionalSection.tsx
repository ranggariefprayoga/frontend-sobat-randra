"use client";

import Leaderboard from "@/components/LeaderboardComponent/Leaderboard";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft } from "lucide-react";

export default function RangkingNasionalSection() {
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Rangking Nasional" subTitle="Diurutkan berdasarkan pengerjaan TryOut Pertama Kali!" />
      <Leaderboard />
    </LayoutBackgroundWhite>
  );
}
