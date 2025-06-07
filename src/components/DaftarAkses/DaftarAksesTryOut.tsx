"use client";

import React, { use, useState } from "react";
import debounce from "lodash.debounce";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetJumlahuser, useGetUsersByAdmin } from "@/lib/api/user.api"; // sesuaikan path
import { useUpdatePasswordByAdmin, useDeleteUserByAdmin } from "@/lib/api/user.api";
import { LoaderCircle, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) {
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

export default function DaftarAksesTryOut({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  const { product_try_out_id: id } = use(params);
  console.log(id);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debounceSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
        setPage(1);
      }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debounceSearch(e.target.value);
  };

  const { data, isLoading, refetch } = useGetUsersByAdmin({
    page,
    limit,
    search: debouncedSearch,
  });

  const { data: dataJumlahUser, isLoading: dataJumlahuserLoading } = useGetJumlahuser();

  const updatePasswordMutation = useUpdatePasswordByAdmin();
  const deleteUserMutation = useDeleteUserByAdmin();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openEditModal = (userId: number) => {
    setSelectedUserId(userId);
    setNewPassword("");
    setShowEditModal(true);
  };

  const openDeleteModal = (userId: number) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const handleSavePassword = async () => {
    if (!selectedUserId) return;
    try {
      await updatePasswordMutation.mutateAsync({ userId: selectedUserId, data: { password: newPassword } });
      toast.success("Password berhasil di update");
      setShowEditModal(false);
      refetch();
    } catch {
      toast.error("Password gagal di update");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    try {
      await deleteUserMutation.mutateAsync(selectedUserId);
      toast.success("User berhasil di hapus");
      setShowDeleteModal(false);
      refetch();
    } catch {
      toast.error("User gagal di hapus");
    }
  };

  if (isLoading || dataJumlahuserLoading) {
    return (
      <div className="px-4 md:px-24 flex justify-center py-12">
        <LoaderCircle className="animate-spin" strokeWidth={3} color="#ad0a1f" />
      </div>
    );
  }

  const users = data?.data || [];
  const totalPages = data?.meta?.totalPages || 0;
  const jumlahUser = dataJumlahUser?.data;

  return (
    <div className="px-4 md:px-24 mt-8">
      <Badge variant="default" className="mb-2">
        {jumlahUser} Pelanggan
      </Badge>
      <Input type="text" placeholder="Cari nama atau email user..." className="max-w-xs mb-4 " value={searchTerm} onChange={handleSearchChange} />

      <Table className="text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>

            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Tidak ada data user
              </TableCell>
            </TableRow>
          )}

          {users.map((user, idx) => (
            <TableRow key={user.id}>
              <TableCell>{(page - 1) * limit + idx + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>

              <TableCell className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(user.id)} aria-label={`Edit password user ${user.name}`}>
                  <Edit size={16} />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => openDeleteModal(user.id)} aria-label={`Delete user ${user.name}`}>
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Modal Edit Password */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Password</DialogTitle>
            <DialogDescription>Masukkan password baru untuk user ini.</DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoFocus placeholder="Password baru" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)} disabled={updatePasswordMutation.isPending}>
              Batal
            </Button>
            <Button onClick={handleSavePassword} disabled={updatePasswordMutation.isPending || newPassword.trim() === ""}>
              {updatePasswordMutation.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Konfirmasi Delete */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus User</DialogTitle>
            <DialogDescription>Apakah kamu yakin ingin menghapus Pelanggan ini?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={deleteUserMutation.isPending}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={deleteUserMutation.isPending}>
              {deleteUserMutation.isPending ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
