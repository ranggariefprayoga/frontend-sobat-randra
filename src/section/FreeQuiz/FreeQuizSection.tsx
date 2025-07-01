"use client";

import { useGetUserAnswerByProductAndQuestionId, useSaveUserAnswer, useCheckUserHasAnsweredOrNot } from "@/lib/api/quizAnswer.api";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import NumberButtonsResponsive from "@/components/NomorQuiz/NomorQuiz";
import QuestionComponent from "./questionComponent";
import QuestionChoiceComponent from "./questionChoiceComponent";
import { useGetSessionsByProductIdAndSessionId, useSubmitTryOutSession } from "@/lib/api/quisSession.api";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { toast } from "sonner";
import { useUser } from "@/lib/api/user.api";
import CountdownTimer from "@/components/Countdown/CountdownTimer";
import { useGetValidQuestionsUser } from "@/lib/api/question.api";
import { useGetQuestionForQuiz } from "@/lib/api/soal.api";
import { useEffect, useState } from "react";
import { PaginationTryOut } from "@/components/PaginationSoal/PaginationTryOut";

export default function FreeQuizSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [localSelectedChoiceId, setLocalSelectedChoiceId] = useState<number | null>(null);

  const s = searchParams?.get("sess");
  const p = searchParams?.get("ptid");
  const q = searchParams?.get("qid");

  const productTryOutId = Number(p);
  const questionId = Number(q);
  const sessionId = Number(s);

  const handleNullQuestion = () => {
    router.back();
  };

  const { data: quizSessionData, isLoading: isLoadingSession, error } = useGetSessionsByProductIdAndSessionId(productTryOutId, sessionId);
  const { data: dataUser, isLoading: dataUserLoading, error: errorUser } = useUser();
  const { data: validQuestions, isLoading: dataUserQuestionLoading, error: errorValidQuestion } = useGetValidQuestionsUser(productTryOutId);

  const { data, isLoading, error: errorGetSoal } = useGetQuestionForQuiz(productTryOutId, questionId);

  const submitQuizMutation = useSubmitTryOutSession();
  const saveUserAnswer = useSaveUserAnswer();

  const { data: userAnswer, refetch, isLoading: isLoadingUserAnswer, error: errorUserAnswer } = useGetUserAnswerByProductAndQuestionId(productTryOutId, sessionId, questionId);
  const { data: checkUserHasAnswered, isLoading: isLoadingCheckUserHasAnswered, refetch: refetchCheckUserHasAnswered, error: errorAnsweredUser } = useCheckUserHasAnsweredOrNot(productTryOutId, sessionId);

  const selectedChoiceId = localSelectedChoiceId ?? userAnswer?.data?.question_choice_id;

  useEffect(() => {
    setLocalSelectedChoiceId(null);
  }, [questionId]);

  if (isLoading || isLoadingSession || isLoadingUserAnswer || isLoadingCheckUserHasAnswered || dataUserLoading || dataUserQuestionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingComponent color="#ad0a1f" />
      </div>
    );
  }

  if (error || errorGetSoal || errorUser || errorValidQuestion || errorUserAnswer || errorAnsweredUser) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Terjadi kesalahan!</h2>
        <p className="text-gray-500 mb-6">Kembali ke soal sebelumnya.</p>
        <Button onClick={handleNullQuestion} className="bg-[#ad0a1f] hover:bg-[#d7263d] text-white px-6 py-3 rounded-full transition">
          Kembali ke soal sebelumnya
        </Button>
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
    router.push(`/free-quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${newQuestionId}`);
    refetchCheckUserHasAnswered();
  };

  const handleNavigation = (newQuestionId: number | null | undefined) => {
    if (newQuestionId === null || newQuestionId === undefined) {
      router.push(`/free-quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${0}`);
    }
    refetchCheckUserHasAnswered();

    if (newQuestionId) {
      router.push(`/free-quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${newQuestionId}`);
    }
    refetchCheckUserHasAnswered();
  };

  // Optimistic UI Update: immediately update the UI before API call
  const handleUserAnswer = async (question_choice_id: number): Promise<void> => {
    setLocalSelectedChoiceId(question_choice_id); // Langsung update UI
    try {
      await saveUserAnswer.mutateAsync({ product_try_out_id: productTryOutId, question_id: questionId, question_choice_id });
      refetch();
    } catch (error) {
      // If the API fails, revert the UI change
      setLocalSelectedChoiceId(null);
      toast.error("Gagal memilih jawaban, coba lagi...");
      throw error; // Rethrow the error to allow catch in handleSelectChoice
    }
  };

  // Optimistic answer handling

  const handleConfirmSubmit = async () => {
    try {
      await submitQuizMutation.mutateAsync();
      toast.success("Berhasil di submit, tunggu sebentar...");
      router.push("/history-nilai");
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

            <div className="flex justify-between items-center w-full mb-8 md:mb-12 bg-gray-100 text-gray-700 px-2 py-4 rounded-md border border-gray-500">
              {question && <div className="bg-blue-100 text-blue-700 p-2 font-bold text-base rounded-md">{question?.number_of_question}</div>}
              <div className="lg:hidden block items-center mt-2 md:mt-0">
                <NumberButtonsResponsive currentQuestionId={questionId} questions={validQuestions?.data} questionHasAswered={numberHasAswered} onSelectNumber={handleSelectNumber} />
              </div>
              <CountdownTimer expiredAt={expired_at} productId={productTryOutId} sessionId={sessionId} userEmail={userEmail} />
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
                    question_id={question.id}
                    choices={questionChoices}
                    isSelected={selectedChoiceId} // Pass the selected choice here
                    onSelect={handleUserAnswer} // Handle immediate UI update
                    // Passing the revert function
                  />
                )}
                <PaginationTryOut handleNextSoal={handleNavigation} handlePreviousSoal={handleNavigation} previousQuestionId={previousQuestionId} nextQuestionId={nextQuestionId} isFirst={isFirst} isLast={isLast} />
              </>
            ) : (
              <div className="text-center p-6 bg-gray-100 border border-gray-300 rounded-md shadow-md">
                <div className="max-w-md mx-auto">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Uji Coba Try Out Gratis hanya menyediakan {validQuestions?.data?.length} soal saja.</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Untuk mendapatkan fitur lengkap, soal terbaru, dan rangking nasional Try Out, beli paket <strong>Try Out Premium</strong> kami
                  </p>
                  <Button disabled={submitQuizMutation.isPending} variant="default" className="w-auto bg-[#ad0a1f] hover:bg-[#d7263d] text-white" onClick={handleConfirmSubmit}>
                    {submitQuizMutation.isPending ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : "Lihat Nilai Kamu di Try Out ini"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:block lg:w-[20%]">
            <NumberButtonsResponsive currentQuestionId={questionId} questions={validQuestions?.data} questionHasAswered={numberHasAswered} onSelectNumber={handleSelectNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}
