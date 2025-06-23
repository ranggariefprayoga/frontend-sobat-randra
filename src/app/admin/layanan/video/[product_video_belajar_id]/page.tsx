import DetailVideoBelajarForAdmin from "@/components/DetailVideoBelajar/DetailVideoBelajarForAdmin";

export default function VideoBelajarDetailForAdminPage({ params }: { params: Promise<{ product_video_belajar_id: string }> }) {
  return (
    <>
      <DetailVideoBelajarForAdmin params={params} />
    </>
  );
}
