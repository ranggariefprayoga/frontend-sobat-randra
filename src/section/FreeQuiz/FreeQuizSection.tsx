"use client";

import CountDown from "@/components/Countdown/CountdownTimer";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NumberButtonsResponsive from "@/components/NomorQuiz/NomorQuiz";
import { Button } from "@/components/ui/button";
import { useGetFreeQuestion } from "@/lib/api/soalFree.api";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuizToken } from "@/lib/api/quisSession.api";
import QuestionComponent from "@/section/FreeQuiz/questionComponent";
import QuestionChoiceComponentForFree from "@/section/FreeQuiz/questionChoiceComponent";
import { useSubmitFreeTryOut } from "@/lib/api/quisSession.api"; // Import the hook
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Import Dialog
import { useState } from "react";

export default function FreeQuizSection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productTryOutId = searchParams?.get("product_try_out_id");
  const numberOfQuestion = searchParams?.get("number_of_question");

  const { data, isLoading } = useGetFreeQuestion(Number(productTryOutId), Number(numberOfQuestion));
  const { data: quizSessionData, isLoading: isLoadingSession } = useQuizToken();
  const { isPending: isSubmitting } = useSubmitFreeTryOut();

  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal

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
      router.push(`/free-quiz?product_try_out_id=${productTryOutId}&number_of_question=${newQuestion}`);
    }
  };

  const handleSelectNumber = (num: number) => {
    router.push(`/free-quiz?product_try_out_id=${productTryOutId}&number_of_question=${num}`);
  };

  const handleSubmit = () => {
    setIsModalOpen(true); // Open the modal when submit button is clicked
  };

  const handleConfirmSubmit = () => {
    console.log("submit berhasil yeay");
    setIsModalOpen(false); // Close the modal after submission
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal without submitting
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
            {data?.data?.question && <QuestionComponent question={data?.data?.question} />}
            {data?.data?.question?.question_choices && <QuestionChoiceComponentForFree choices={data?.data?.question?.question_choices} isSelected={false} onSelect={() => {}} />}

            <div className="flex justify-between items-center mb-4 mt-6">
              <Button onClick={() => handleNavigation("prev")} disabled={numberOfQuestion === "1"} className="w-auto">
                Sebelumnya
              </Button>
              <Button
                onClick={numberOfQuestion === "110" ? handleSubmit : () => handleNavigation("next")} // Show modal if it's question 110
                className="w-auto"
              >
                {numberOfQuestion === "110" ? "Selesikan" : "Selanjutnya"}
              </Button>
            </div>
          </div>
          <div className="hidden lg:block lg:w-[20%]">
            <NumberButtonsResponsive onSelectNumber={handleSelectNumber} />
          </div>
        </div>
      </div>

      {/* Modal Confirmation for Submit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full max-w-md p-6 border border-gray-300 bg-white shadow-md rounded-lg">
          <DialogHeader>
            <DialogTitle>Konfirmasi Penyelesaian Quiz</DialogTitle>
            <DialogDescription>Apakah Anda yakin ingin menyelesaikan quiz? Pastikan Anda telah menjawab semua soal sebelum melanjutkan.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="space-x-2">
            <Button variant="outline" onClick={handleCloseModal} className="border-gray-400 hover:bg-gray-100">
              Tutup
            </Button>
            <Button variant="default" disabled={isSubmitting} onClick={handleConfirmSubmit} className="bg-[#ad0a1f] text-white hover:bg-[#d7263d]">
              Selesaikan Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
