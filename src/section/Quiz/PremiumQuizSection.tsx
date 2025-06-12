"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import NumberButtonsResponsive from "@/components/NomorQuiz/NomorQuiz";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import QuestionComponent from "@/section/FreeQuiz/questionComponent";
import QuestionChoiceComponent from "@/section/FreeQuiz/questionChoiceComponent";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useGetSessionsByProductIdAndSessionId, useSubmitTryOutSession } from "@/lib/api/quisSession.api";
import { useCheckUserHasAnsweredOrNot, useGetUserAnswerByProductAndQuestionId, useSaveUserAnswer } from "@/lib/api/quizAnswer.api";
import CountdownTimer from "@/components/Countdown/CountdownTimer";
import { useUser } from "@/lib/api/user.api";
import { useGetValidQuestionsUser } from "@/lib/api/question.api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetQuestionForQuiz } from "@/lib/api/soal.api";
import Link from "next/link";

export default function PremiumQuizSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  const s = searchParams?.get("sess");
  const p = searchParams?.get("ptid");
  const q = searchParams?.get("qid");

  const productTryOutId = Number(p);
  const questionId = Number(q);
  const sessionId = Number(s);

  const { data: quizSessionData, isLoading: isLoadingSession, error } = useGetSessionsByProductIdAndSessionId(productTryOutId, sessionId);
  const { data: dataUser, isLoading: dataUserLoading } = useUser();
  const { data, isLoading } = useGetQuestionForQuiz(productTryOutId, questionId);
  const { data: validQuestions, isLoading: dataUserQuestionLoading } = useGetValidQuestionsUser(productTryOutId);

  const submitQuizMutation = useSubmitTryOutSession();
  const saveUserAnswer = useSaveUserAnswer();

  const { data: userAnswer, refetch, isLoading: isLoadingUserAnswer } = useGetUserAnswerByProductAndQuestionId(productTryOutId, sessionId, questionId);
  const { data: checkUserHasAnswered, isLoading: isLoadingCheckUserHasAnswered, refetch: refetchCheckUserHasAnswered } = useCheckUserHasAnsweredOrNot(productTryOutId, sessionId);

  if (isLoading || isLoadingSession || isLoadingUserAnswer || isLoadingCheckUserHasAnswered || dataUserLoading || dataUserQuestionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingComponent color="#ad0a1f" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6 text-center">
        <h1 className="text-6xl font-bold text-[#ad0a1f] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Terjadi Kesalahan</h2>
        <p className="text-gray-500 mb-6">Coba kembali ke beranda.</p>
        <Link href="/" className="bg-[#ad0a1f] hover:bg-[#d7263d] text-white px-6 py-3 rounded-full transition">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const user = dataUser?.data ?? null;

  const question = data?.data?.question;
  const userEmail = user?.email;
  const isFirst = data?.data?.isFirst;
  const isLast = data?.data?.isLast;
  const nextQuestionId = data?.data?.nextQuestionId;
  const previousQuestionId = data?.data?.previousQuestionId;
  const questionChoices = question?.question_choices || [];
  const expired_at = quizSessionData?.data?.expired_at;
  const numberHasAswered = checkUserHasAnswered?.data || [];

  const handleSelectNumber = (newQuestionId: number) => {
    router.push(`/quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${newQuestionId}`);
    refetchCheckUserHasAnswered();
  };

  const handlePreviousSoal = (previousQuestionId: number | null | undefined) => {
    if (previousQuestionId) {
      router.push(`/quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${previousQuestionId}`);
    }
  };
  const handleNextSoal = (nextQuestionId: number | null | undefined) => {
    console.log(nextQuestionId);

    if (nextQuestionId === null || nextQuestionId === undefined) {
      router.push(`/free-quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${0}`);
    }

    if (isLast) {
      setIsSubmitDialogOpen(true);
      return;
    }

    if (nextQuestionId) {
      router.push(`/quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${nextQuestionId}`);
    }
  };

  const handleUserAnswer = async (question_choice_id: number): Promise<void> => {
    try {
      await saveUserAnswer.mutateAsync({ product_try_out_id: productTryOutId, question_id: questionId, question_choice_id });
      refetch();
    } catch (error) {
      // If the API fails, revert the UI change

      toast.error("Gagal memilih jawaban, coba lagi...");
      throw error; // Rethrow the error to allow catch in handleSelectChoice
    }
  };

  // Optimistic answer handlin

  const handleConfirmSubmit = async () => {
    try {
      await submitQuizMutation.mutateAsync();
      toast.success("Tunggu sebentar...");
      router.push("/pilihan-paket");
    } catch {
      toast.error("Gagal submit Quiz, Coba lagi...");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1">
        {/* Countdown Timer */}
        {quizSessionData?.data && (
          <div className="flex flex-row gap-2 w-full items-center justify-between lg:justify-start mb-4">
            {/* Soal Nomor UI */}

            <div className="flex justify-between items-center w-full">
              {question && <div className="bg-[#ad0a1f] text-white px-4 py-2 font-bold text-lg rounded-md">No {question?.number_of_question}</div>}
              <CountdownTimer expiredAt={expired_at} productId={productTryOutId} sessionId={sessionId} userEmail={userEmail} />
            </div>

            <div className="lg:hidden block items-center">
              <NumberButtonsResponsive currentQuestionId={questionId} questions={validQuestions?.data} questionHasAswered={numberHasAswered} onSelectNumber={handleSelectNumber} />
            </div>
          </div>
        )}

        {/* Question + Number Buttons */}
        <div className="flex w-full gap-8">
          <div className="w-full lg:w-[80%]">
            {question ? (
              <>
                <QuestionComponent question={question} />
                {questionChoices && (
                  <QuestionChoiceComponent
                    question_id={data?.data?.question?.id}
                    choices={questionChoices}
                    isSelected={userAnswer?.data?.question_choice_id} // Pass the selected choice here
                    onSelect={handleUserAnswer} // Handle immediate UI update// Passing the revert function
                  />
                )}
                <div className="flex justify-between items-center mb-4 mt-6">
                  <Button onClick={() => handlePreviousSoal(previousQuestionId)} disabled={isFirst || !previousQuestionId} className="w-auto flex items-center space-x-2">
                    {/* Show icon and text for large screens, only icon for small screens */}
                    <span className="hidden sm:inline">Sebelumnya</span> {/* Text visible only on screen sizes larger than 'sm' */}
                    <ChevronLeft className="sm:hidden" /> {/* Icon visible only on small screens */}
                  </Button>

                  <Button onClick={() => handleNextSoal(nextQuestionId)} className="w-auto flex items-center space-x-2">
                    {/* Show icon and text for large screens, only icon for small screens */}
                    <span className="hidden sm:inline">{isLast ? "Selesaikan Try Out" : "Selanjutnya"}</span>
                    <ChevronRight className="sm:hidden" /> {/* Icon visible only on small screens */}
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
            <NumberButtonsResponsive currentQuestionId={questionId} questions={validQuestions?.data} questionHasAswered={numberHasAswered} onSelectNumber={handleSelectNumber} />
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

            <Button disabled={submitQuizMutation.isPending} variant="default" className="w-auto bg-[#ad0a1f] hover:bg-[#d7263d] text-white" onClick={handleConfirmSubmit}>
              {submitQuizMutation.isPending ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : "Selesaikan Try Out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
