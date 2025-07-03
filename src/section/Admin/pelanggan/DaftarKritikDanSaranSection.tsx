"use client";

import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useDeleteFeedbackById } from "@/lib/api/feedback.api";
import { useState } from "react";
import { useGetAllFeedback } from "@/lib/api/feedback.api";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

export default function DaftarKritikDanSaranSection() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllFeedback(page, 10);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteFeedbackMutation = useDeleteFeedbackById();

  const handleDelete = async () => {
    if (!selectedFeedbackId) return;
    try {
      await deleteFeedbackMutation.mutateAsync(selectedFeedbackId);
      toast.success("Feedback berhasil dihapus");
      setShowDeleteModal(false);
    } catch {
      toast.error("Gagal menghapus feedback");
    }
  };
  console.log("feedback response:", data);

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Daftar Kesan & Pesan" subTitle="Omongan Jujur Mereka Nieh.." />

      <div className="mt-6 px-4 max-w-7xl mx-auto">
        <div className="rounded-md border border-gray-200 overflow-hidden shadow-sm">
          <Table className="min-w-[700px] w-full border-separate border-spacing-0">
            <TableHeader className="bg-gray-100 sticky top-0 z-10">
              <TableRow>
                <TableCell className="px-4 py-3 text-sm font-semibold text-gray-700">No</TableCell>
                <TableCell className="px-4 py-3 text-sm font-semibold text-gray-700">Nama</TableCell>
                <TableCell className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">Rating</TableCell>
                <TableCell className="px-4 py-3 text-sm font-semibold text-gray-700">Kesan & Pesan</TableCell>
                <TableCell className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">Aksi</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!isLoading && data?.data && data?.data?.length > 0 ? (
                data.data.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-gray-50 border-b border-gray-200">
                    <TableCell className="px-4 py-2 text-sm font-medium text-gray-800">{(page - 1) * 10 + index + 1}</TableCell>
                    <TableCell className="px-4 py-2 text-sm text-gray-700">{item.user_name}</TableCell>
                    <TableCell className="px-4 py-2 text-sm text-center">{"⭐".repeat(item.rating)}</TableCell>
                    <TableCell className="px-4 py-2 text-sm mt-2 whitespace-pre-line line-clamp-5 text-gray-700">{item.message}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedFeedbackId(item.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground text-sm">
                    {isLoading ? "Memuat..." : data?.data ? "Belum ada feedback" : "Gagal mengambil data"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {data?.meta && (
          <div className="mt-6 flex justify-center items-center w-full gap-4">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${page === 1 ? "cursor-not-allowed bg-blue-100 text-blue-700" : "bg-blue-200 text-blue-900"}`}
            >
              <ChevronLeft size={16} />
            </Button>

            <span className="text-sm md:text-base text-gray-700 font-medium">
              Halaman {page} dari {data.meta.totalPages}
            </span>

            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === data.meta.totalPages}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${page === data.meta.totalPages ? "cursor-not-allowed bg-blue-100 text-blue-700" : "bg-blue-200 text-blue-900"}`}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>Yakin ingin menghapus feedback ini?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={deleteFeedbackMutation.isPending}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteFeedbackMutation.isPending}>
              {deleteFeedbackMutation.isPending ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutBackgroundWhite>
  );
}
