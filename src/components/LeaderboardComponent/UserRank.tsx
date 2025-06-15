"use client";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Award } from "lucide-react";

export interface rankResponse {
  rank: number;
  name: string;
  email: string;
  score: number;
}

export const RankUser = ({ rank, name, email, score }: rankResponse) => {
  return (
    <div className="my-2">
      <Alert variant="default" className="w-full mx-auto flex items-center gap-4 p-4 bg-[#f5f5f5]">
        <div className="flex items-center gap-3">
          <div className="bg-green-200 text-green-700 flex justify-center items-center p-4 rounded-full">
            <p className="font-extrabold">{rank}</p>
            <Award size={24} />
          </div>
          <div>
            <AlertTitle className="font-semibold">{name}</AlertTitle>
            <AlertDescription className="text-sm">{email}</AlertDescription>
            <div className="bg-green-200 text-green-700 text-center rounded-md mt-2">
              <p className="font-bold">Nilai kamu: {score}</p>
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
};
