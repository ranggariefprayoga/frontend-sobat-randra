"use client";

import ModalHapusBimbelBarengAkses from "@/components/Dialog/ModalHapusAksesBimbelBareng";
import ModalTambahkanAksesBimbelBareng from "@/components/Dialog/ModalTambahkanAksesBimbelBareng";
import UpdateUserEmailModalForBimbelBareng from "@/components/Dialog/ModalUpdateEmailAccessBimbelBareng";
import GetAccessBimbelBarengSwitch from "@/components/Dialog/ToggleGetAccessBimbelBareng";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import SearchInput from "@/components/SearchInput/SearchInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetBimbelBarengProductByIdForAdmin } from "@/lib/api/productBimbelBareng.api";
import { useGetAllBimbelBarengAccess, useGetCountBimbelBarengAccess } from "@/lib/api/productBimbelBarengAccess.api";
import { Pagination } from "@/halaman/Admin/PelangganComponent";
import debounce from "lodash.debounce";
import { ArrowLeft } from "lucide-react";
import { use, useMemo, useState } from "react";

export default function AksesBimbelBarengDetail({ params }: { params: Promise<{ product_bimbel_bareng_id: string }> }) {
  const { product_bimbel_bareng_id: id } = use(params);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: bimbelBareng, isPending: isLoadingBimbel } = useGetBimbelBarengProductByIdForAdmin(Number(id));
  const { data: accessBimbelData, isPending: isLoadingAccess, refetch: refetchAccess } = useGetAllBimbelBarengAccess(Number(id), page, limit, searchTerm);
  const { data: jumlahPesertaBimbel, isPending: isLoadingJumlah, refetch: refetchJumlah } = useGetCountBimbelBarengAccess(Number(id));

  // State untuk search input

  const handleDeleted = () => {
    refetchAccess();
    refetchJumlah();
  };

  const debounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value.toLowerCase());
      }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debounceSearch(e.target.value);
  };

  const totalPages = accessBimbelData?.meta?.totalPages || 0;
  const jumlahUser = jumlahPesertaBimbel?.data;
  // Filter data client-side by user_email or other field (optional)
  const filteredAccesses = useMemo(() => {
    if (!accessBimbelData?.data) return [];
    if (!debouncedSearch) return accessBimbelData.data;

    return accessBimbelData.data.filter((item) => {
      // Filter berdasarkan user_email (bisa modifikasi sesuai kebutuhan)
      return item.user_email?.toLowerCase().includes(debouncedSearch);
    });
  }, [accessBimbelData, debouncedSearch]);

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title={`Akses ${bimbelBareng?.data?.name}`} />

      <div className="px-4 md:px-24 w-full mt-8 flex justify-between gap-2">
        <SearchInput value={searchTerm} onChange={handleSearchChange} />

        <ModalTambahkanAksesBimbelBareng
          product_bimbel_bareng_id={Number(id)}
          onSuccess={() => {
            refetchAccess();
            refetchJumlah();
          }}
        />
      </div>

      <div className="mt-8 px-4 md:px-24 w-full">
        {isLoadingAccess || isLoadingBimbel || isLoadingJumlah ? (
          <div className="flex justify-center py-16">
            <LoadingComponent color="#ad0a1f" />
          </div>
        ) : filteredAccesses.length === 0 ? (
          <p className="text-center mt-8 text-gray-600">Akses bimbel bareng gak ada.</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>No Hp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Editor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccesses.map((item, idx) => (
                  <TableRow key={item.id} className="odd:bg-white even:bg-gray-50">
                    <TableCell>{(page - 1) * limit + idx + 1}</TableCell>
                    <TableCell>{item.user_email ?? "-"}</TableCell>
                    <TableCell>{item.phone_number ?? "No Hp belum ada"}</TableCell>
                    <TableCell>
                      <GetAccessBimbelBarengSwitch
                        productBimbelBarengId={Number(id)}
                        accessId={item.id}
                        initialValue={item.get_access ?? true}
                        onUpdated={() => {
                          refetchAccess();
                          refetchJumlah();
                        }}
                      />
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <UpdateUserEmailModalForBimbelBareng
                        productBimbelBarengId={Number(id)}
                        accessId={item.id}
                        currentEmail={item.user_email}
                        onSuccess={() => {
                          refetchAccess();
                          refetchJumlah();
                        }}
                      />
                      <ModalHapusBimbelBarengAkses product_bimbel_bareng_id={Number(id)} accessId={item.id} onDeleted={handleDeleted} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center mt-4">
              <Badge className="max-w-xs">{jumlahUser} pelanggan</Badge>
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </LayoutBackgroundWhite>
  );
}
