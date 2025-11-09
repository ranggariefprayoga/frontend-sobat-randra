"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useCreateFeedback } from "@/lib/api/feedback.api";
import NumberButtonsResponsive from "@/components/NomorQuiz/NomorQuiz";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import QuestionComponent from "@/section/FreeQuiz/questionComponent";
import QuestionChoiceComponent from "@/section/FreeQuiz/questionChoiceComponent";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useGetSessionsByProductIdAndSessionId, useSubmitTryOutSession } from "@/lib/api/quisSession.api";
import { useCheckUserHasAnsweredOrNot, useGetUserAnswerByProductAndQuestionId, useSaveUserAnswer } from "@/lib/api/quizAnswer.api";
import CountdownTimer from "@/components/Countdown/CountdownTimer";
import { useUser } from "@/lib/api/user.api";
import { useGetValidQuestionsUser } from "@/lib/api/question.api";
import { useGetQuestionForQuiz } from "@/lib/api/soal.api";
import { PaginationTryOut } from "@/components/PaginationSoal/PaginationTryOut";

export default function PremiumQuizSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [localSelectedChoiceId, setLocalSelectedChoiceId] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const createFeedback = useCreateFeedback();

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
  const { data, isLoading, error: errorGetSoal } = useGetQuestionForQuiz(productTryOutId, questionId);
  const { data: validQuestions, isLoading: dataUserQuestionLoading, error: errorGetSoalValid } = useGetValidQuestionsUser(productTryOutId);

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

  if (error || errorGetSoal || errorUser || errorGetSoalValid || errorUserAnswer || errorAnsweredUser) {
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
    router.push(`/quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${newQuestionId}`);
    refetchCheckUserHasAnswered();
  };

  const handlePreviousSoal = (previousQuestionId: number | null | undefined) => {
    if (previousQuestionId) {
      router.push(`/quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${previousQuestionId}`);
    }
    refetchCheckUserHasAnswered();
  };
  const handleNextSoal = (nextQuestionId: number | null | undefined) => {
    if (isLast) {
      setIsSubmitDialogOpen(true);
      return;
    }

    if (nextQuestionId === null || nextQuestionId === undefined) {
      router.push(`/quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${0}`);
    }

    if (nextQuestionId) {
      router.push(`/quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${nextQuestionId}`);
    }
    refetchCheckUserHasAnswered();
  };

  const handleUserAnswer = async (question_choice_id: number): Promise<void> => {
    setLocalSelectedChoiceId(question_choice_id); // Langsung update UI
    try {
      await saveUserAnswer.mutateAsync({ product_try_out_id: productTryOutId, question_id: questionId, question_choice_id });
      refetch();
    } catch (error) {
      setLocalSelectedChoiceId(null);
      toast.error("Gagal memilih jawaban, coba lagi...");
      throw error;
    }
  };

  // Optimistic answer handlin

  const handleConfirmSubmit = async () => {
    if (rating < 1) {
      toast.warning("Pilih minimal 1 bintang ya!");
      return;
    }

    try {
      await createFeedback.mutateAsync({
        rating: rating || 5,
        message: message.trim() || "Tidak ada deskripsi",
      });

      await submitQuizMutation.mutateAsync();
      toast.success("Mengakhiri TryOut, tunggu sebentar...");
      router.push("/history-nilai");
      setIsSubmitDialogOpen(false);
    } catch {
      toast.error("Gagal submit TryOut. Coba lagi...");
    }
  };

  return (
    <div className="flex flex-col mt-4 md:mt-8">
      <div className="grid grid-cols-1">
        {/* Countdown Timer */}
        {quizSessionData?.data && (
          <div className="flex flex-row gap-2 w-full items-center justify-between lg:justify-start mb-4">
            {/* Soal Nomor UI */}

            <div className="flex justify-between items-center w-full mb-8 md:mb-12 bg-gray-100 text-gray-700 px-2 py-4 rounded-md border border-gray-500">
              {question && <div className="bg-blue-100 text-blue-700 p-2 font-bold text-base rounded-md">{question?.number_of_question}</div>}
              <div className="lg:hidden block items-center">
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
                    question_id={data?.data?.question?.id}
                    choices={questionChoices}
                    isSelected={selectedChoiceId} // Pass the selected choice here
                    onSelect={handleUserAnswer} // Handle immediate UI update// Passing the revert function
                  />
                )}
                <PaginationTryOut nextQuestionId={nextQuestionId} previousQuestionId={previousQuestionId} handleNextSoal={handleNextSoal} handlePreviousSoal={handlePreviousSoal} isFirst={isFirst} isLast={isLast} />
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
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Yakin ingin menyelesaikan TryOut?</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">Sebelum menyelesaikan, beri kami sedikit masukan ya!</p>
          </DialogHeader>

          {/* Rating */}
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

          {/* Textarea */}
          <Textarea placeholder="Tulis kesan atau pesan kamu di sini (opsional)..." value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[100px]" />

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                Batal
              </Button>
            </DialogClose>

            <Button onClick={handleConfirmSubmit} disabled={submitQuizMutation.isPending || createFeedback.isPending} className="bg-[#ad0a1f] hover:bg-[#d7263d] text-white">
              {submitQuizMutation.isPending || createFeedback.isPending ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : "Selesaikan TryOut"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
