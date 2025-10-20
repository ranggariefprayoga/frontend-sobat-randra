import DetailPilihanPaketSmartbookForUser from "@/halaman/PilihanPaket/DetailPilihanPaketSmartbook";

export default function SmartbookDetailForUser({ params }: { params: Promise<{ product_smartbook_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketSmartbookForUser params={params} />
    </>
  );
}
