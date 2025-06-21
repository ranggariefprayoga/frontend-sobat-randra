import AksesBimbelBarengDetail from "@/section/Admin/bimbel/AksesBimbelBarengDetail";

export default function BimbelBarengAccessPage({ params }: { params: Promise<{ product_bimbel_bareng_id: string }> }) {
  return (
    <>
      <AksesBimbelBarengDetail params={params} />
    </>
  );
}
