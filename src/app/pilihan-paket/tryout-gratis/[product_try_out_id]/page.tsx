import DetailPilihanPaketTOFreeForUser from "@/components/DetailTryOut/DetailPilihanPaketTOFreeForUser";

export default function FreeProductDetailForUserPage({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketTOFreeForUser params={params} />
    </>
  );
}
