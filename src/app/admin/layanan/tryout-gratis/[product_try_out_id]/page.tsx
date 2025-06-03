import DetailPilihanPaketTOFreeForAdmin from "@/components/DetailTryOut/DetailPilihanPaketTOFreeForAdmin";

export default function FreeProductDetailForAdminPage({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketTOFreeForAdmin params={params} />
    </>
  );
}
