import AksesTODetail from "@/section/Admin/try-out/AksesTODetail";

export default function TryOutAccessPage({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  return (
    <>
      <AksesTODetail params={params} />
    </>
  );
}
