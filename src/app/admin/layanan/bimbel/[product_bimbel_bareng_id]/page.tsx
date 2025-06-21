import DetailPilihanPaketBimbelForAdmin from "@/components/DetailBimbel/DetailPilihanPaketBimbelForAdmin";

export default function BimbelBarengDetailForAdminPage({ params }: { params: Promise<{ product_bimbel_bareng_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketBimbelForAdmin params={params} />
    </>
  );
}
