"use client";

import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const PaginationTryOut = ({
  previousQuestionId,
  nextQuestionId,
  isFirst,
  isLast,
  handlePreviousSoal,
  handleNextSoal,
}: {
  previousQuestionId: number | null | undefined;
  nextQuestionId: number | null | undefined;
  isFirst: boolean | undefined;
  isLast: boolean | undefined;
  handlePreviousSoal: (id: number) => void;
  handleNextSoal: (id: number | undefined | null) => void;
}) => {
  return (
    <div className="mt-6 mb-4 flex justify-between items-center w-full gap-6">
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={() => handlePreviousSoal(previousQuestionId ?? 0)} // fallback to 0 if null or undefined
        disabled={isFirst || previousQuestionId == null}
        className={`rounded-full px-6 py-3 text-sm sm:text-base font-medium transition ${
          isFirst || previousQuestionId == null ? "bg-blue-100 text-blue-700 cursor-not-allowed" : "bg-blue-200 text-blue-900 border-blue-500 hover:bg-blue-500 hover:text-white"
        }`}
      >
        <ChevronLeft size={18} className="mr-2" />
        <span className="hidden sm:inline">Sebelumnya</span>
      </Button>

      {/* Next Button */}
      <Button
        variant="outline"
        onClick={() => handleNextSoal(nextQuestionId)} // fallback to 0 if null or undefined
        className={`rounded-full px-6 py-3 text-sm sm:text-base font-medium transition bg-blue-200 text-blue-900 border-blue-500 hover:bg-blue-500 hover:text-white`}
      >
        <span className="hidden sm:inline">{isLast ? "Selesaikan Try Out" : "Selanjutnya"}</span>
        <ChevronRight size={18} className="ml-2" />
      </Button>
    </div>
  );
};
