"use client";

import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const PaginationLeaderboard = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <div className="mt-4 flex justify-center items-center w-full gap-4">
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={prevDisabled}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${prevDisabled ? "cursor-not-allowed bg-blue-100 text-blue-700" : "bg-blue-200 text-blue-900 "}`}
      >
        <ChevronLeft size={16} />
      </Button>

      {/* Page Info */}
      <span className="text-sm md:text-base text-gray-700 font-medium">
        Halaman {currentPage} dari {totalPages}
      </span>

      {/* Next Button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={nextDisabled}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${nextDisabled ? "cursor-not-allowed bg-blue-100 text-blue-700" : "bg-blue-200 text-blue-900 "}`}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};
