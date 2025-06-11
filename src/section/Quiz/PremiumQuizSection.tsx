"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NumberButtonsResponsive from "@/components/NomorQuiz/NomorQuiz";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import QuestionComponent from "@/section/FreeQuiz/questionComponent";
import QuestionChoiceComponent from "@/section/FreeQuiz/questionChoiceComponent";
import { toast } from "sonner";
import { useGetPremiumQuestion } from "@/lib/api/soalPremium.api";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import NumberButtonsResponsiveForPremiumQuiz from "@/components/NomorQuiz/NomorQuizPremium";
import CountDownTimerForPremium from "@/components/Countdown/CountdownTimerForPremium";
import { useGetQuizToken, useSubmitTryOutSession } from "@/lib/api/quisSession.api";
import { useCheckUserHasAnsweredOrNot, useGetUserAnswerByProductAndQuestionId, useSaveUserAnswer } from "@/lib/api/quizAnswer.api";

export default function PremiumQuizSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const numberOfQuestion = searchParams?.get("number_of_question");

  const { data: quizSessionData, isLoading: isLoadingSession } = useGetQuizToken();
  const productTryOutId = quizSessionData?.data?.product_try_out_id;
  const { data, isLoading } = useGetPremiumQuestion(Number(productTryOutId), Number(numberOfQuestion));
  const { isPending: isSubmitting, mutate } = useSubmitTryOutSession();
  const saveUserAnswer = useSaveUserAnswer();
  const { data: userAnswer, refetch: refetchUserAnswer } = useGetUserAnswerByProductAndQuestionId();
  const { data: checkUserHasAnswered, refetch: refetchCheckUserHasAnswered } = useCheckUserHasAnsweredOrNot();

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
    if (currentQuestion === 110) {
      setIsSubmitDialogOpen(true);
    }
    const newQuestion = direction === "next" ? currentQuestion + 1 : currentQuestion - 1;
    if (newQuestion >= 1 && newQuestion <= 110) {
      router.push(`/quiz?&number_of_question=${newQuestion}`);
    }
  };

  const handleSelectNumber = (num: number) => {
    router.push(`/quiz?&number_of_question=${num}`);
    refetchCheckUserHasAnswered();
  };

  const handleUserAnswer = (question_id: number, question_choice_id: number) => {
    try {
      saveUserAnswer.mutate({ product_try_out_id: Number(productTryOutId), question_id, question_choice_id });
      refetchUserAnswer();
      toast.error("Pilihan Jawaban Berhasil Disimpan!");
    } catch {
      toast.error("Gagal memilih jawaban, coba lagi...");
    }
  };

  const handleConfirmSubmit = async () => {
    try {
      mutate();
      toast.success("Tunggu sebentar...");
      router.push("/history-nilai");
    } catch {
      toast.success("Submit gagal, coba refresh dulu...");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1">
        {/* Countdown Timer */}
        {quizSessionData?.data && (
          <div className="flex flex-row gap-2 w-full items-center justify-between lg:justify-end mb-4 md:mb-8">
            <CountDownTimerForPremium quiz_session_data={quizSessionData.data} />
            <div className="lg:hidden block">
              <NumberButtonsResponsiveForPremiumQuiz onSelectNumber={handleSelectNumber} questionAnswered={checkUserHasAnswered?.data} />
            </div>
          </div>
        )}

        {/* Question + Number Buttons */}
        <div className="flex w-full gap-2">
          <div className="w-full lg:w-[80%]">
            {data?.data?.question ? (
              <>
                <QuestionComponent question={data?.data?.question} />
                {data?.data?.question?.question_choices && (
                  <QuestionChoiceComponent question_id={data?.data?.question?.id} choices={data?.data?.question?.question_choices} isSelected={userAnswer?.data?.question_choice_id} onSelect={handleUserAnswer} />
                )}
                <div className="flex justify-between items-center mb-4 mt-6">
                  <Button onClick={() => handleNavigation("prev")} disabled={numberOfQuestion === "1"} className="w-auto">
                    Sebelumnya
                  </Button>
                  <Button
                    onClick={() => handleNavigation("next")} // Show modal if it's question 110
                    className="w-auto"
                  >
                    {numberOfQuestion === "110" ? "Selesaikan Try Out" : "Selanjutnya"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center p-6 bg-gray-100 border border-gray-300 rounded-md shadow-md">
                <div className="max-w-md mx-auto">
                  <p className="text-sm text-gray-600 mb-4">Soal Belum Tersedia.</p>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:block lg:w-[20%]">
            <NumberButtonsResponsive onSelectNumber={handleSelectNumber} questionAnswered={checkUserHasAnswered?.data} />
          </div>
        </div>
      </div>
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Yakin Ingin Menyelesaikan Try Out?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                Tutup
              </Button>
            </DialogClose>

            <Button variant="default" className="bg-[#ad0a1f] hover:bg-[#d7263d]" disabled={isSubmitting} onClick={handleConfirmSubmit}>
              {isSubmitting ? "Tunggu sebentar..." : "Selesaikan Try Out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
