"use client";

import { Award } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { rankResponse } from "@/model/leaderboards.model";

export const RankUser = ({ rank, name, email, score, category_score, status }: rankResponse) => {
  const getScore = (cat: string) => category_score.find((c) => c.category === cat)?.score ?? 0;
  const twk = getScore("TWK");
  const tiu = getScore("TIU");
  const tkp = getScore("TKP");
  const isLulus = twk >= 65 && tiu >= 80 && tkp >= 166;

  const scoreBoxClass = (value: number, threshold: number) => `${value < threshold ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} px-3 py-1 rounded-md font-semibold text-sm`;

  return (
    <div className="my-4">
      <Alert variant="default" className="w-full mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-[#f5f5f5]">
        <div className="flex items-center gap-3">
          <div className={`${status === "Lulus" ? "bg-green-200 text-green-700" : "bg-red-100 text-red-700"} flex justify-center items-center p-4 rounded-full`}>
            <p className="font-extrabold">{rank}</p>
            <Award size={24} className="ml-1" />
          </div>

          <div>
            <AlertTitle className="font-semibold">{name}</AlertTitle>
            <AlertDescription className="text-sm">{email}</AlertDescription>
            <div className={`mt-2 px-3 py-1 rounded-md text-center font-bold ${isLulus ? "bg-green-200 text-green-700" : "bg-red-100 text-red-700"}`}>Nilai Kamu: {score}</div>
            <div className={`mt-1 text-xs font-semibold ${status === "Lulus" ? "text-green-600" : "text-red-600"}`}>Status: {status}</div>
          </div>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0 md:ml-auto">
          <div className={scoreBoxClass(twk, 65)}>TWK: {twk}</div>
          <div className={scoreBoxClass(tiu, 80)}>TIU: {tiu}</div>
          <div className={scoreBoxClass(tkp, 166)}>TKP: {tkp}</div>
        </div>
      </Alert>
    </div>
  );
};
