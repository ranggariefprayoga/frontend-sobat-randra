"use client";

import DeleteTryOutAccessModal from "@/components/Dialog/ModalHapusSeluruhAksesTryOut";
import CreateTryOutAccessModal from "@/components/Dialog/ModalTambahkanAksesTryOut";
import UpdateUserEmailModal from "@/components/Dialog/ModalUpdateEmailAccess";
import GetAccessSwitch from "@/components/Dialog/ToggleGetAccessTryOut";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import SearchInput from "@/components/SearchInput/SearchInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetTryOutProductByIdForAdmin } from "@/lib/api/productTryOut.api";
import { useCountTryOutAccess, useGetTryOutAccesses } from "@/lib/api/tryOutAccess.api";
import { Pagination } from "@/pages/Admin/PelangganComponent";
import debounce from "lodash.debounce";
import { ArrowLeft } from "lucide-react";
import { use, useMemo, useState } from "react";

export default function AksesTODetail({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  const { product_try_out_id: id } = use(params);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: tryOutById, isPending: isLoadingTryOut } = useGetTryOutProductByIdForAdmin(Number(id));
  const { data: accessTOData, isPending: isLoadingAccess, refetch: refetchAccess } = useGetTryOutAccesses(Number(id), page, limit, searchTerm);
  const { data: jumlahPesertaBerbayar, isPending: isLoadingJumlah, refetch: refetchJumlah } = useCountTryOutAccess(Number(id));

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

  const totalPages = accessTOData?.meta?.totalPages || 0;
  const jumlahUser = jumlahPesertaBerbayar?.data;
  // Filter data client-side by user_email or other field (optional)
  const filteredAccesses = useMemo(() => {
    if (!accessTOData?.data) return [];
    if (!debouncedSearch) return accessTOData.data;

    return accessTOData.data.filter((item) => {
      // Filter berdasarkan user_email (bisa modifikasi sesuai kebutuhan)
      return item.user_email?.toLowerCase().includes(debouncedSearch);
    });
  }, [accessTOData, debouncedSearch]);

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title={`Akses ${tryOutById?.data?.name}`} />

      <div className="px-8 md:px-24 w-full mt-8 flex justify-between gap-2">
        <SearchInput value={searchTerm} onChange={handleSearchChange} />

        <CreateTryOutAccessModal
          product_try_out_id={Number(id)}
          onSuccess={() => {
            refetchAccess();
            refetchJumlah();
          }}
        />
      </div>

      <div className="mt-8 px-8 md:px-24 w-full">
        {isLoadingAccess || isLoadingTryOut || isLoadingJumlah ? (
          <div className="flex justify-center py-16">
            <LoadingComponent color="#ad0a1f" />
          </div>
        ) : filteredAccesses.length === 0 ? (
          <p className="text-center mt-8 text-gray-600">Akses try out gak ada.</p>
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
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{item.user_email ?? "-"}</TableCell>
                    <TableCell>{item.phone_number ?? "No Hp belum ada"}</TableCell>
                    <TableCell>
                      <GetAccessSwitch
                        productTryOutId={Number(id)}
                        accessId={item.id}
                        initialValue={item.get_access ?? true}
                        onUpdated={() => {
                          refetchAccess();
                          refetchJumlah();
                        }}
                      />
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <UpdateUserEmailModal
                        productTryOutId={Number(id)}
                        accessId={item.id}
                        currentEmail={item.user_email}
                        onSuccess={() => {
                          refetchAccess();
                          refetchJumlah();
                        }}
                      />
                      <DeleteTryOutAccessModal product_try_out_id={Number(id)} accessId={item.id} onDeleted={handleDeleted} />
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
