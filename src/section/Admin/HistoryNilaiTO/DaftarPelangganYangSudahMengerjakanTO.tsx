"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useUpdateTryOutSessionByAdmin } from "@/lib/api/quisSession.api";

interface userModelSession {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
  token_expires: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

interface modelSession {
  id: number;
  user_id: number;
  product_try_out_id: number;
  try_out_token: string | null;
  started_at: string | Date;
  expired_at: string | Date;
  is_trial: boolean;
  is_finished: boolean;
  user: userModelSession;
}

interface PropsForDetailTryOutSesssion {
  detailPengerjaan: modelSession[];
  refetch: () => void;
  meta: { total: number; totalPages: number; page: number; limit: number };
}

export function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <Button variant="default" disabled={prevDisabled} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
        <ChevronLeft size={16} />
      </Button>
      <span className="text-sm">
        Page {page} of {totalPages}
      </span>
      <Button variant="default" disabled={nextDisabled} onClick={() => onPageChange(page + 1)} aria-label="Next page">
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}

export default function DaftarPelangganYangSudahMengerjakanTO({ detailPengerjaan, meta, refetch }: PropsForDetailTryOutSesssion) {
  const [selectedTryOutSessionId, setSelectedTryOutSessionId] = useState<number | null>(null);
  const [showSelesaikanTryOut, setShowSelesaikanTryOut] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const updateTryOutSession = useUpdateTryOutSessionByAdmin();

  const openSelesaikanTryOut = (TryOutSessionId: number) => {
    setSelectedTryOutSessionId(TryOutSessionId);
    setShowSelesaikanTryOut(true);
  };

  const handleUpdateSelesaikanTryOut = async () => {
    if (!selectedTryOutSessionId) return;
    try {
      await updateTryOutSession.mutateAsync({ try_out_session_id: selectedTryOutSessionId });
      toast.success("Try Out berhasil di selesaikan");
      setShowSelesaikanTryOut(false);
      refetch();
    } catch {
      toast.error("Try Out gagal di selesaikan");
    }
  };

  const dataPengerjaanTryOut = detailPengerjaan || [];
  const totalPages = meta?.totalPages || 0;

  return (
    <div className="px-4 md:px-24 mt-8">
      <Badge variant="default" className="mb-2">
        {meta?.total} kali dikerjakan
      </Badge>

      <Table className="text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Waktu Selesai</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataPengerjaanTryOut.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Belum ada yang mengerjakan Try Out
              </TableCell>
            </TableRow>
          )}

          {dataPengerjaanTryOut.map((data, idx) => {
            const currentTime = new Date();
            const expiredTime = new Date(data.expired_at);

            const isNotExpired = currentTime <= expiredTime;

            const isExpired = currentTime > expiredTime;
            const isTokenNull = !data.try_out_token;
            const isFinished = data.is_finished;
            const isFinalized = isExpired && isTokenNull && isFinished;

            const isDisabled = isNotExpired || isFinalized;
            // ---------------------------------------------

            return (
              <TableRow key={data.id}>
                <TableCell>{(page - 1) * limit + idx + 1}</TableCell>
                <TableCell>{data.user.email}</TableCell>
                <TableCell>
                  {/* Perbaikan: Konversi ke WIB */}
                  {new Date(data.expired_at).toLocaleTimeString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Jakarta",
                  })}
                </TableCell>
                {/* Perbaikan: Handling null token */}
                <TableCell>{data.try_out_token || "Tidak ada"}</TableCell>
                <TableCell>{data.is_finished ? "Sudah Selesai" : "Belum Selesai"}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={() => openSelesaikanTryOut(data.id)} aria-label={`Selesaikan sesi ${data.id}`} disabled={isDisabled || updateTryOutSession.isPending}>
                    <Edit size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Dialog open={showSelesaikanTryOut} onOpenChange={setShowSelesaikanTryOut}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Selesaikan Try Out</DialogTitle>
            <DialogDescription>Apakah kamu yakin ingin menyelesaikan Try Out ini?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSelesaikanTryOut(false)} disabled={updateTryOutSession.isPending}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleUpdateSelesaikanTryOut} disabled={updateTryOutSession.isPending}>
              {updateTryOutSession.isPending ? "Menyelesaikan..." : "Selesaikan Try Out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
