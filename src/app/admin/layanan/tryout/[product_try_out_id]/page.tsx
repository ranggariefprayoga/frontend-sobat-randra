import DetailPilihanPaketTOForAdmin from "@/components/DetailTryOut/DetailPilihanPaketTOForAdmin";

export default function ProductDetailForAdminPage({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketTOForAdmin params={params} />
    </>
  );
}
