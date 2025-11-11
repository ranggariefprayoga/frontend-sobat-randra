import DaftarPelangganTOSection from "@/section/Admin/HistoryNilaiTO/DaftarPelangganTryOutSection";

export default function DaftarPelangganTryOutPage({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  return (
    <>
      <DaftarPelangganTOSection params={params} />
    </>
  );
}
