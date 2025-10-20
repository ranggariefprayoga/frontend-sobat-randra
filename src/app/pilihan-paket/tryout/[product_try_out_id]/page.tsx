import DetailPilihanPaketTO from "@/halaman/PilihanPaket/DetailPilihanPaketTO";

export default function ProductDetailForUserPage({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketTO params={params} />
    </>
  );
}
