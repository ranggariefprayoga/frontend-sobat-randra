import DetailPilihanPaketTO from "@/pages/PilihanPaket/DetailPilihanPaketTO";

export default function ProductDetailForUserPage({ params }: { params: Promise<{ product_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketTO params={params} />
    </>
  );
}
