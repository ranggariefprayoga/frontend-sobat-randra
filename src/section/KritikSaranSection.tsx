"use client";

import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useCreateFeedback } from "@/lib/api/feedback.api";
import { ArrowLeft, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function KritikSaranSection() {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const createFeedback = useCreateFeedback();

  const handleSubmit = async () => {
    if (rating < 1) {
      toast.warning("Pilih minimal 1 bintang ya!");
      return;
    }

    try {
      await createFeedback.mutateAsync({ rating, message });
      toast.success("Terima kasih atas kesan pesan nya!");
      setRating(0);
      setMessage("");
    } catch (error: unknown) {
      toast.error(`${error}` || "Gagal mengirim feedback.");
      console.error(error);
    }
  };

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Kesan & Pesan" subTitle="Bantu kami jadi lebih baik yuk—ada saran?" />

      <div className="px-4 md:px-24 py-6 space-y-4 max-w-xl mx-auto">
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              className={`
        w-7 h-7 md:w-8 md:h-8 transition-all duration-200 cursor-pointer
        ${star <= rating ? "fill-yellow-400 stroke-yellow-500 scale-110 drop-shadow-md" : "stroke-gray-300 hover:stroke-yellow-300"}
        hover:scale-105
      `}
            />
          ))}
        </div>

        <Textarea placeholder="Tulis kesan dan pesan kamu di sini..." value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[100px]" />

        <Button onClick={handleSubmit} disabled={createFeedback.isPending}>
          {createFeedback.isPending ? "Mengirim..." : "Kirim Feedback"}
        </Button>
      </div>
    </LayoutBackgroundWhite>
  );
}
