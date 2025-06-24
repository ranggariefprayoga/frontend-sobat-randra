import DetailPilihanPaketPromoForAdmin from "@/components/DetailPromo/DetailPilihanPaketPromoForAdmin";

export default function PromoDetailForAdminPage({ params }: { params: Promise<{ product_promo_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketPromoForAdmin params={params} />
    </>
  );
}
