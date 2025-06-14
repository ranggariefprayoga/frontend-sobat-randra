"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetValidQuestionsUser } from "@/lib/api/question.api";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetQuizSessionQuestionDetailForUser } from "@/lib/api/quizHistory.api";
import QuestionComponentForPembahasan from "./QuestionComponentForPembahasan";
import QuestionChoiceComponentForPembahasan from "./QuestionChoiceComponentForPembahasan";
import { Badge } from "@/components/ui/badge";
import NomorQuizPembahasan from "@/components/NomorQuiz/NomorQuizPembahasan";
import { useAnsweredUserInASessionThatsTrue } from "@/lib/api/quizAnswer.api";
import AnswerExplanationForPembahasan from "./AnswerExplanationForPembahasan";

export default function PembahasanQuizSection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const s = searchParams?.get("sess");
  const p = searchParams?.get("ptid");
  const q = searchParams?.get("qid");

  const productTryOutId = Number(p);
  const questionId = Number(q);
  const sessionId = Number(s);

  const handleNullQuestion = () => {
    router.back();
  };

  const handleToHome = () => {
    router.push("/history-nilai");
  };

  const { data: detailQuizSession, isLoading: isLoadingSession, error } = useGetQuizSessionQuestionDetailForUser(sessionId, productTryOutId, questionId);
  const { data: validQuestions, isLoading: dataUserQuestionLoading } = useGetValidQuestionsUser(productTryOutId);
  const { data: checkTrueUserAnswerByQuestionId, isLoading: isLoadingCheckUserHasAnswered } = useAnsweredUserInASessionThatsTrue(productTryOutId, sessionId);

  if (isLoadingSession || dataUserQuestionLoading || isLoadingCheckUserHasAnswered) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingComponent color="#ad0a1f" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Try Out Gratis Hanya Bisa Mengakses 10 Soal Saja!</h2>
        <p className="text-gray-500 mb-6">Kembali ke soal sebelumnya.</p>
        <Button onClick={handleNullQuestion} className="bg-[#ad0a1f] hover:bg-[#d7263d] text-white px-6 py-3 rounded-full transition">
          Kembali ke soal sebelumnya
        </Button>
      </div>
    );
  }

  const question = detailQuizSession?.data?.details;
  const isFirst = detailQuizSession?.data?.details?.isFirst;
  const isLast = detailQuizSession?.data?.details?.isLast;
  const nextQuestionId = detailQuizSession?.data?.details?.nextQuestionId;
  const previousQuestionId = detailQuizSession?.data?.details?.previousQuestionId;
  const questionChoices = detailQuizSession?.data?.details?.question_choices;
  const correctAnswer = detailQuizSession?.data?.details?.correct_answer;
  const userAnswer = detailQuizSession?.data?.details?.user_answer;
  const totalUserAnswer = detailQuizSession?.data?.total_user_answers;
  const isCorrect = detailQuizSession?.data?.details?.correct_answer_title === detailQuizSession?.data?.details?.user_answer?.question_choice_title;
  const questionIdWasCorrect = checkTrueUserAnswerByQuestionId?.data;
  const answerExplanations = detailQuizSession?.data?.details?.answer_explanation;

  const handleSelectNumber = (newQuestionId: number) => {
    router.push(`/pembahasan-quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${newQuestionId}`);
  };

  const handlePreviousSoal = (previousQuestionId: number | null | undefined) => {
    if (previousQuestionId) {
      router.push(`/pembahasan-quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${previousQuestionId}`);
    }
  };
  const handleNextSoal = (nextQuestionId: number | null | undefined) => {
    if (nextQuestionId === null || nextQuestionId === undefined) {
      router.push(`/pembahasan-quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${0}`);
    }

    if (nextQuestionId) {
      router.push(`/pembahasan-quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${nextQuestionId}`);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1">
        {/* Countdown Timer */}
        {detailQuizSession?.data && (
          <div className="flex flex-col lg:flex-row gap-2 w-full items-start justify-between mb-8">
            <div className="flex flex-row lg:flex-col justify-evenly items-center  lg:items-start gap-2 w-full lg:w-auto">
              <Button variant="ghost" className="text-[#ad0a1f] flex items-center gap-2" onClick={handleToHome}>
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>
              {question && <div className="bg-[#ad0a1f] text-center text-white w-full px-4 py-2 font-bold text-lg rounded-md">No {question?.number_of_question}</div>}
              <div className="lg:hidden flex w-full justify-center items-center">
                <NomorQuizPembahasan currentQuestionId={questionId} questions={validQuestions?.data} isCorrect={questionIdWasCorrect} onSelectNumber={handleSelectNumber} />
              </div>
            </div>

            <div className="flex flex-row gap-2 items-start lg:items-center w-full lg:w-auto">
              {/* Total User Answer Badge */}
              {totalUserAnswer && (
                <Badge variant="outline" className={`text-sm bg-gray-200 border-gray-300 text-gray-800 ${totalUserAnswer ? "bg-green-100 border-green-300 text-green-800" : ""}`}>
                  {totalUserAnswer || "-"} Soal Dijawab
                </Badge>
              )}

              {/* User Answer Badge */}
              {
                <Badge variant="outline" className={`text-sm bg-gray-200 border-gray-300 text-gray-800 ${isCorrect ? "bg-green-100 border-green-300 text-green-800" : "bg-red-100 border-red-300 text-red-800"}`}>
                  Jawaban kamu: {userAnswer?.question_choice_title || "-"}
                </Badge>
              }

              {/* Correct Answer Badge */}
              {correctAnswer && (
                <Badge variant="outline" className={`text-sm bg-gray-200 border-gray-300 text-gray-800 ${correctAnswer ? "bg-green-100 border-green-300 text-green-800" : ""}`}>
                  Jawaban yang benar: {correctAnswer?.question_choice_title}
                </Badge>
              )}
            </div>

            {/* Number Button Section (for mobile) */}
          </div>
        )}

        {/* Question + Number Buttons */}
        <div className="flex w-full gap-8">
          <div className="w-full lg:w-[80%]">
            {question ? (
              <>
                <QuestionComponentForPembahasan question={question} />
                <QuestionChoiceComponentForPembahasan correctAnswer={correctAnswer} userAnswer={userAnswer} choices={questionChoices} />
                <AnswerExplanationForPembahasan answerExplanations={answerExplanations} />
                <div className="flex justify-between items-center mb-4 mt-6">
                  <Button onClick={() => handlePreviousSoal(previousQuestionId)} disabled={isFirst || !previousQuestionId} className="w-auto flex items-center space-x-2">
                    {/* Show icon and text for large screens, only icon for small screens */}
                    <span className="hidden sm:inline">Sebelumnya</span> {/* Text visible only on screen sizes larger than 'sm' */}
                    <ChevronLeft className="sm:hidden" /> {/* Icon visible only on small screens */}
                  </Button>

                  <Button onClick={() => handleNextSoal(nextQuestionId)} disabled={isLast || !nextQuestionId} className="w-auto flex items-center space-x-2">
                    {/* Show icon and text for large screens, only icon for small screens */}
                    <span className="hidden sm:inline">Selanjutnya</span>
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
            <NomorQuizPembahasan currentQuestionId={questionId} questions={validQuestions?.data} isCorrect={questionIdWasCorrect} onSelectNumber={handleSelectNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}
