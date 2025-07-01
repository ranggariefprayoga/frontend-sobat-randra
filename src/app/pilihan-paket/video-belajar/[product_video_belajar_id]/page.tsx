import DetailPilihanPaketVideoBelajarForUser from "@/pages/PilihanPaket/DetailPilihanPaketVideoBelajar";

export default function VideoBelajarDetailForUser({ params }: { params: Promise<{ product_video_belajar_id: string }> }) {
  return (
    <>
      <DetailPilihanPaketVideoBelajarForUser params={params} />
    </>
  );
}
