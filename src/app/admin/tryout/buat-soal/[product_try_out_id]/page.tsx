import BuatSoalTryOutDetail from "@/components/BuatSoalTryOut/BuatSoalTryOutDetail";

export default function BuatSoalPage({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  return (
    <>
      <BuatSoalTryOutDetail params={params} />
    </>
  );
}
