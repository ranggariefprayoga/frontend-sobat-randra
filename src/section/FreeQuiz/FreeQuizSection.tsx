"use client";

import CountDown from "@/components/Countdown/CountdownTimer";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NumberButtonsResponsive from "@/components/NomorQuiz/NomorQuiz";
import { Button } from "@/components/ui/button";
import { useGetFreeQuestion } from "@/lib/api/soalFree.api";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuizToken, useSubmitFreeQuizSession } from "@/lib/api/quisSession.api";
import QuestionComponent from "@/section/FreeQuiz/questionComponent";
import QuestionChoiceComponent from "@/section/FreeQuiz/questionChoiceComponent";
import { toast } from "sonner";

export default function FreeQuizSection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const numberOfQuestion = searchParams?.get("number_of_question");

  const { data: quizSessionData, isLoading: isLoadingSession } = useQuizToken();
  const productTryOutId = quizSessionData?.data?.product_try_out_id;
  const { data, isLoading } = useGetFreeQuestion(Number(productTryOutId), Number(numberOfQuestion));
  const { isPending: isSubmitting, mutate } = useSubmitFreeQuizSession();

  if (isLoading || isLoadingSession) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingComponent color="#ad0a1f" />
      </div>
    );
  }

  const handleNavigation = (direction: "next" | "prev") => {
    const currentQuestion = Number(numberOfQuestion);
    if (isNaN(currentQuestion)) return;
    const newQuestion = direction === "next" ? currentQuestion + 1 : currentQuestion - 1;
    if (newQuestion >= 1 && newQuestion <= 110) {
      router.push(`/free-quiz?&number_of_question=${newQuestion}`);
    }
  };

  const handleSelectNumber = (num: number) => {
    router.push(`/free-quiz?&number_of_question=${num}`);
  };

  const handleConfirmSubmit = async () => {
    try {
      mutate();

      toast.success("Tunggu sebentar...");
      router.push("/pilihan-paket");
    } catch {
      router.push("/pilihan-paket");
      toast.success("Tunggu sebentar...");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1">
        {/* Countdown Timer */}
        {quizSessionData && (
          <div className="flex flex-row gap-2 w-full items-center justify-between lg:justify-end mb-4 md:mb-8">
            <CountDown expired_at={quizSessionData?.data?.expired_at} productTryOutId={Number(productTryOutId)} userId={Number(quizSessionData?.data?.user_id)} />
            <div className="lg:hidden block">
              <NumberButtonsResponsive onSelectNumber={handleSelectNumber} />
            </div>
          </div>
        )}

        {/* Question + Number Buttons */}
        <div className="flex w-full gap-2">
          <div className="w-full lg:w-[80%]">
            {data?.data?.question ? (
              <>
                <QuestionComponent question={data?.data?.question} />
                {data?.data?.question?.question_choices && <QuestionChoiceComponent choices={data?.data?.question?.question_choices} isSelected={false} onSelect={() => {}} />}
                <div className="flex justify-between items-center mb-4 mt-6">
                  <Button onClick={() => handleNavigation("prev")} disabled={numberOfQuestion === "1"} className="w-auto">
                    Sebelumnya
                  </Button>
                  <Button
                    onClick={() => handleNavigation("next")} // Show modal if it's question 110
                    className="w-auto"
                  >
                    {numberOfQuestion === "110" ? "Selesaikan Quiz" : "Selanjutnya"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center p-6 bg-gray-100 border border-gray-300 rounded-md shadow-md">
                <div className="max-w-md mx-auto">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Uji Coba Try Out Gratis hanya tersedia sampai soal nomor 10.</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Untuk mendapatkan fitur lengkap dan soal terbaru, beli paket <strong>Try Out Premium</strong> kami:
                  </p>
                  <div className="space-y-2 text-start text-sm text-gray-600">
                    <p>✅ Paket Try Out Online siap dikerjakan kapan saja.</p>
                    <p>✅ Harganya cuman 15 ribu aja.</p>
                    <p>✅ Tersedia harga promo, jika membeli paket bundling.</p>
                    <p>✅ Model soal terbaru & sesuai sistem CAT SKD terkini.</p>
                    <p>✅ Terdiri dari TWK, TIU, dan TKP lengkap.</p>
                    <p>✅ Dapat dikerjakan berulang kali tanpa batas.</p>
                    <p>✅ Pembahasan detail dan mendalam per soal.</p>
                    <p>✅ Evaluasi dan pembahasan soal komprehensif di Website.</p>
                    <p>✅ Informasi jumlah benar dan salah untuk setiap subtes.</p>
                  </div>
                  <Button disabled={isSubmitting} variant="default" className="mt-4 w-auto bg-[#ad0a1f] hover:bg-[#d7263d] text-white" onClick={handleConfirmSubmit}>
                    {isSubmitting ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : "Lihat Try Out Premium"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:block lg:w-[20%]">
            <NumberButtonsResponsive onSelectNumber={handleSelectNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}
