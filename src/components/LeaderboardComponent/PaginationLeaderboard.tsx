"use client";

import { Button } from "../ui/button"; // Ensure you're using the correct button component
import { ChevronLeft, ChevronRight } from "lucide-react"; // For pagination arrows

export const PaginationLeaderboard = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <div className="flex justify-between items-center mt-4 w-full ">
      {/* Previous Page Button */}
      <Button variant="default" disabled={prevDisabled} onClick={() => onPageChange(currentPage - 1)} aria-label="Previous page">
        <ChevronLeft size={16} />
      </Button>

      {/* Page Info */}
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Page Button */}
      <Button variant="default" disabled={nextDisabled} onClick={() => onPageChange(currentPage + 1)} aria-label="Next page">
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};
