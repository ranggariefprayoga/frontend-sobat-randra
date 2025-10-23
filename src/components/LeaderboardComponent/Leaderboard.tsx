"use client";

import React, { useState } from "react";
import { useGetProductTryOutsForLeaderboard, useGetQuizLeaderboardForUser } from "@/lib/api/leaderboards.api";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import LeaderboardSelect from "./LeaderboardSelect"; // Assuming you already have this component
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { PaginationLeaderboard } from "./PaginationLeaderboard";
import { RankUser } from "./UserRank";
import { Star, TrendingUp } from "lucide-react";
import debounce from "lodash.debounce";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ScrollableTableWrapper from "../ScrollComponent/ScrollComponent";

const Leaderboard = () => {
  const { data: productTryOuts, isLoading: isLoadingProducts } = useGetProductTryOutsForLeaderboard();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debounceSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
        setCurrentPage(1);
      }, 500),
    []
  );
  const { data, isLoading: isLoadingLeaderboard, error: leaderboardError } = useGetQuizLeaderboardForUser(selectedProductId, limit, currentPage, debouncedSearch);

  // Handling loading state
  if (isLoadingProducts || isLoadingLeaderboard) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <LoadingComponent color="#ad0a1f" />
      </div>
    );
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debounceSearch(e.target.value);
  };

  // Handle product selection
  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage(1); // Reset to first page when product is selected
  };

  return (
    <div className="px-4 md:px-16 mt-8 md:mt-16">
      {/* Select Product Dropdown */}
      <div className="flex flex-col lg:flex-row justify-between gap-2 mb-8">
        <LeaderboardSelect onProductSelect={handleProductSelect} productTryOuts={productTryOuts?.data} />
        <Input type="text" className="w-full lg:w-1/2 ring-[#ad0a1f] border-[#ad0a1f] border-1" placeholder="Cari nama atau email..." value={searchTerm} onChange={handleSearchChange} />
      </div>
      {/* Leaderboard Table */}
      {selectedProductId ? (
        data?.data?.topUsers?.length ? (
          <div className="mt-2">
            <div className="mt-2 rounded-md border border-gray-200 overflow-hidden">
              <ScrollableTableWrapper>
                <Table className="min-w-[700px] w-full rounded-lg shadow-md border-separate border-spacing-1">
                  <TableHeader className="bg-gray-100 sticky top-0 z-10">
                    <TableRow>
                      <TableCell className="px-4 py-3 text-sm font-medium text-gray-700">Ranking</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium text-gray-700">Nama</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium text-gray-700 text-center">TWK</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium text-gray-700 text-center">TIU</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium text-gray-700 text-center">TKP</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium text-gray-700 text-center">Total Nilai</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium text-gray-700 text-center">Status</TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    <TooltipProvider>
                      {data?.data?.topUsers?.map((user, index) => {
                        const getScore = (cat: string) => user.category_score.find((c) => c.category === cat)?.score ?? 0;
                        const twk = getScore("TWK");
                        const tiu = getScore("TIU");
                        const tkp = getScore("TKP");
                        const isLulus = twk >= 65 && tiu >= 80 && tkp >= 166;

                        const cellStyle = (value: number, threshold: number) => `px-4 py-2 text-sm text-center font-semibold ${value < threshold ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`;

                        return (
                          <TableRow key={index}>
                            {/* Ranking */}
                            <TableCell className="px-4 py-2 text-sm font-semibold text-gray-800">
                              <div className="flex items-center gap-2">
                                {user.rank === 1 ? <Star size={16} className="text-yellow-500" /> : <TrendingUp size={16} className="text-gray-500" />}
                                {user.rank}
                              </div>
                            </TableCell>

                            {/* Name */}
                            <TableCell className="px-4 py-2 text-sm font-medium text-gray-800">{user.name}</TableCell>

                            {/* TWK */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <TableCell className={cellStyle(twk, 65)}>{twk}</TableCell>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Minimal 65</p>
                              </TooltipContent>
                            </Tooltip>

                            {/* TIU */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <TableCell className={cellStyle(tiu, 80)}>{tiu}</TableCell>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Minimal 80</p>
                              </TooltipContent>
                            </Tooltip>

                            {/* TKP */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <TableCell className={cellStyle(tkp, 166)}>{tkp}</TableCell>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Minimal 166</p>
                              </TooltipContent>
                            </Tooltip>

                            {/* Total Score */}
                            <TableCell className={`px-4 py-2 text-sm text-center font-bold ${isLulus ? "bg-green-200 text-green-700" : "bg-red-100 text-red-700"}`}>{user.score}</TableCell>

                            {/* Status */}
                            <TableCell className={`px-4 py-2 text-sm text-center font-semibold ${user.status === "Lulus" ? "text-green-700" : "text-red-700"}`}>{user.status}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TooltipProvider>
                  </TableBody>
                </Table>
              </ScrollableTableWrapper>
            </div>

            {data?.data?.myRank && <RankUser {...data?.data?.myRank} />}

            {/* Pagination */}
            <PaginationLeaderboard currentPage={currentPage} totalPages={data?.meta?.totalPages || 1} onPageChange={setCurrentPage} />
          </div>
        ) : (
          !leaderboardError && (
            <div className="my-4">
              <Alert variant="default" className="w-full md:w-1/2 mx-auto flex flex-col items-start md:items-center gap-3 bg-yellow-50 border-l-4 border-yellow-400 shadow-sm">
                <div className="flex items-center gap-2 text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.366-.756 1.42-.756 1.786 0l6.518 13.482A1 1 0 0115.657 18H4.343a1 1 0 01-.904-1.419L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <AlertTitle className="text-sm font-semibold">Tidak Ada Yang Mengerjakan</AlertTitle>
                </div>
                <AlertDescription className="text-sm text-gray-700 md:ml-2">Peserta belum ada yang mengerjakan TryOut ini. Silakan tunggu hingga peserta mulai mengerjakan.</AlertDescription>
              </Alert>
            </div>
          )
        )
      ) : (
        <div className="my-4">
          <Alert variant="default" className="w-full md:w-1/2 mx-auto flex flex-col items-start md:items-center gap-3 bg-blue-50 border-l-4 border-blue-400 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10A8 8 0 11.999 10 8 8 0 0118 10zM9 5a1 1 0 112 0v4a1 1 0 11-2 0V5zm1 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
              </svg>
              <AlertTitle className="text-sm font-semibold">Silakan Pilih TryOut</AlertTitle>
            </div>
            <AlertDescription className="text-sm text-gray-700 md:ml-2">Silakan pilih TryOut terlebih dahulu untuk melihat rangking nasional.</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Error handling or no data found */}
      {leaderboardError && (
        <div className="my-4">
          <Alert variant="destructive" className="w-full md:w-1/2 mx-auto flex flex-col items-start md:items-center gap-3 bg-red-50 border-l-4 border-red-500 shadow-sm">
            <div className="flex items-center gap-2 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-10a1 1 0 10-2 0v4a1 1 0 102 0V8zm-1 6a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd" />
              </svg>
              <AlertTitle className="text-sm font-semibold">Akses Ditolak</AlertTitle>
            </div>
            <AlertDescription className="text-sm text-gray-700 md:ml-2">Kamu tidak punya akses ke rangking nasional TryOut ini.</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
