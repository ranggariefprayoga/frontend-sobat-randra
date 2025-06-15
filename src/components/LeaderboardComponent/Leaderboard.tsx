"use client";

import { useState } from "react";
import { useGetProductTryOutsForLeaderboard, useGetQuizLeaderboardForUser } from "@/lib/api/leaderboards.api";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import LeaderboardSelect from "./LeaderboardSelect"; // Assuming you already have this component
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { PaginationLeaderboard } from "./PaginationLeaderboard";
import { RankUser } from "./UserRank";
import { Star, TrendingUp, User } from "lucide-react";

const Leaderboard = () => {
  const { data: productTryOuts, isLoading: isLoadingProducts } = useGetProductTryOutsForLeaderboard();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const { data, isLoading: isLoadingLeaderboard, error: leaderboardError } = useGetQuizLeaderboardForUser(selectedProductId, 10, currentPage);

  // Handling loading state
  if (isLoadingProducts || isLoadingLeaderboard) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <LoadingComponent color="#ad0a1f" />
      </div>
    );
  }

  // Handle product selection
  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage(1); // Reset to first page when product is selected
  };

  return (
    <div className="px-4 md:px-24 mt-4">
      {/* Select Product Dropdown */}
      <LeaderboardSelect onProductSelect={handleProductSelect} productTryOuts={productTryOuts?.data} />

      {/* Leaderboard Table */}
      {selectedProductId ? (
        data?.data?.topUsers?.length ? (
          <div className="mt-6">
            <Table className="w-full rounded-lg shadow-md border-separate border-spacing-2">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-700">Ranking</TableCell>
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-700">Nama</TableCell>
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-700">Nilai kamu</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.topUsers?.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-6 py-4 flex items-center gap-2 text-sm text-gray-800">
                      {user.rank === 1 ? <Star size={16} className="text-yellow-500" /> : <TrendingUp size={16} className="text-gray-500" />}
                      {user.rank}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm font-medium text-gray-800">{user.name}</TableCell>
                    <TableCell className="px-6 py-4 text-sm  bg-green-200 font-bold text-green-700 flex justify-center items-center  rounded-md">
                      {user.score}
                      <User size={16} className="ml-2 inline" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {data?.data?.myRank && <RankUser {...data?.data?.myRank} />}

            {/* Pagination */}
            <PaginationLeaderboard
              currentPage={currentPage}
              totalPages={data?.meta?.totalPages || 1}
              onPageChange={setCurrentPage} // Pass the handlePageChange function to the PaginationLeaderboard component
            />
          </div>
        ) : (
          !leaderboardError && (
            <div className="my-4">
              {/* Displaying the alert message using ShadCN UI Alert */}
              <Alert variant="default" className="w-full md:w-1/2">
                <AlertTitle className="font-semibold">Belum Ada yang Mengerjakan</AlertTitle>
                <AlertDescription className="text-sm">Belum ada yang mengerjakan try out ini. Silakan tunggu hingga peserta mulai mengerjakan.</AlertDescription>
              </Alert>
            </div>
          )
        )
      ) : (
        <div className="my-4">
          {/* Displaying the alert message using ShadCN UI Alert */}
          <Alert variant="default" className="w-full md:w-1/2">
            <AlertTitle className="font-semibold">Silakan Pilih Try Out</AlertTitle>
            <AlertDescription className="text-sm">Silakan pilih try out terlebih dahulu untuk melihat rangking nasional.</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Error handling or no data found */}
      {leaderboardError && (
        <div className="my-4">
          <Alert variant="destructive" className="w-full md:w-1/2">
            <AlertTitle className="font-semibold">Akses Ditolak</AlertTitle>
            <AlertDescription className="text-sm">Kamu gak punya akses ke rangking nasional try out ini.</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
