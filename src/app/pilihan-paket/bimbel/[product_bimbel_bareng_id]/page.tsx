import DetailPilihanPaketBimbel from "@/halaman/PilihanPaket/DetailPilihanPaketBimbel";

export default function BimbelBarengDetailForUserPage({ params }: { params: Promise<{ product_bimbel_bareng_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketBimbel params={params} />
    </>
  );
}
