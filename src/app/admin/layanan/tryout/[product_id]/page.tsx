import DetailPilihanPaketTOForAdmin from "@/components/DetailTryOut/DetailPilihanPaketTOForAdmin";

export default function ProductDetailForAdminPage({ params }: { params: Promise<{ product_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketTOForAdmin params={params} />
    </>
  );
}
