import DetailPilihanPaketPromoForUser from "@/halaman/PilihanPaket/DetailPilihanPaketPromo";

export default function PromoDetailForUser({ params }: { params: Promise<{ product_promo_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketPromoForUser params={params} />
    </>
  );
}
