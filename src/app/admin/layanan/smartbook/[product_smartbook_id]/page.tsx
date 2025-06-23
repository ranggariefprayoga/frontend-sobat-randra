import DetailPilihanPaketSmartbookForAdmin from "@/components/DetailSmartbook/DetailPilihanPaketSmartbookForAdmin";

export default function SmartbookDetailForAdminPage({ params }: { params: Promise<{ product_smartbook_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketSmartbookForAdmin params={params} />
    </>
  );
}
