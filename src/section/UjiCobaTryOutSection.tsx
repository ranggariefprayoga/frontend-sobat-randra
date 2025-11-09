"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import { useGetQuizSessionsFreeForUser } from "@/lib/api/quizHistory.api";
import { Flag, ClockIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"; // Import komponen Card dari ShadCN
import { Button } from "@/components/ui/button";
import { getAllQuizSessionByUser } from "@/model/quiz-history.model";
import { Badge } from "@/components/ui/badge";
import NullComponent from "@/components/NullComponent/NullComponent";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const categoryThresholds = {
  TWK: 60,
  TIU: 80,
  TKP: 166,
} as const;

const categoryMap: Record<string, string> = {
  TWK: "Tes Wawasan Kebangsaan",
  TIU: "Tes Intelegensi Umum",
  TKP: "Tes Karakteristik Pribadi",
};

type Category = keyof typeof categoryThresholds;

export default function UjiCobaTryOutSection() {
  const router = useRouter();
  const { data: allQuizSesion, isLoading: isLoadingQuizSession } = useGetQuizSessionsFreeForUser();

  if (isLoadingQuizSession) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingComponent color="#ad0a1f" />
      </div>
    );
  }

  const freeSessionQuiz = allQuizSesion?.data?.filter((session: getAllQuizSessionByUser) => session.is_trial);

  // Jika allQuizSesion kosong atau tidak ada data, tampilkan NullComponent
  if (!freeSessionQuiz || freeSessionQuiz?.length === 0) {
    return (
      <LayoutBackgroundWhite>
        <NullComponent message="Kamu Belum Memiliki Riwayat Pengerjaan Uji Coba TryOut!" />
        <div className="px-4 md:px-24 flex justify-center w-full -mt-12">
          <Button variant="outline" className="bg-[#ad0a1f] text-white" onClick={() => router.push("/pilihan-paket/tryout")}>
            Cobain Sekarang!
          </Button>
        </div>
      </LayoutBackgroundWhite>
    );
  }

  const handleToPembahasanQuiz = (sessionId: number, productTryOutId: number, questionId: number) => {
    router.push(`/pembahasan-quiz?sess=${sessionId}&ptid=${productTryOutId}&qid=${questionId}`);
  };

  return (
    <LayoutBackgroundWhite>
      <TitleComponent title="Nilai Uji Coba TryOut Kamu" subTitle="Kamu hanya memiliki 1x kesempatan pengerjaan!" />

      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 md:px-24 mt-8 md:mt-16">
          {freeSessionQuiz?.map((session: getAllQuizSessionByUser) => {
            const isPassed = session.category_scores.every((category) => category.score >= categoryThresholds[category.category as Category]);

            return (
              <Card key={session.try_out_session_id} className="shadow-lg">
                <CardHeader>
                  <div className="flex gap-2">
                    <CardTitle className="text-lg font-semibold w-[60%] md:w-[70%]">{session.product_name}</CardTitle>
                    <CardDescription
                      className={`flex flex-col justify-center items-center text-[#f5f5f5] p-2 rounded-md w-[40%] md:w-[30%] 
    ${isPassed ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                    >
                      <span>Nilai kamu</span>
                      <span className="text-xl font-extrabold">{session.total_score}</span>
                    </CardDescription>
                  </div>
                  <Badge className={`${isPassed ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{isPassed ? "Anda Lulus" : "Anda Tidak Lulus"}</Badge>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="space-y-2">
                    {session.category_scores.map((category, idx) => {
                      const categoryName = categoryMap[category.category];
                      const threshold = categoryThresholds[category.category as Category];

                      const categoryQuestions = {
                        TWK: 30, // Tes Wawasan Kebangsaan (TWK)
                        TIU: 35, // Tes Intelegensia Umum (TIU)
                        TKP: 45, // Tes Karakteristik Pribadi (TKP)
                      };

                      // Get the number of questions for the current category
                      const totalQuestions = categoryQuestions[category.category as keyof typeof categoryQuestions];

                      // Calculate the number of wrong answers
                      const wrongAnswers = totalQuestions - category.correctAnswers;

                      // Conditional rendering based on the score and threshold
                      const isScoreAboveThreshold = category.score >= threshold;

                      return (
                        <div key={idx}>
                          <div className="flex justify-between items-center space-x-2 text-xs capitalize">
                            <div>
                              <span className="font-medium text-sm sm:text-base">{categoryName}</span>
                              <div className="flex justify-between items-center md:space-x-2 space-x-1 font-light text-xs">
                                <span>Pertanyaan: {totalQuestions}</span> {/* Display total questions */}
                                <span>Benar: {category.correctAnswers}</span> {/* Display correct answers */}
                                <span>Salah: {wrongAnswers}</span> {/* Display wrong answers */}
                              </div>
                            </div>
                            {/* Score / Threshold */}
                            <span className={`font-medium text-base ${isScoreAboveThreshold ? "text-green-500" : "text-red-500"}`}>
                              {category.score} / {threshold}
                            </span>
                          </div>
                          <hr className="my-2" />
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-5 w-5 text-yellow-500" />
                    <p className="text-xs text-gray-600">
                      {new Date(session.expired_at).toLocaleString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex w-full">
                  <Button onClick={() => handleToPembahasanQuiz(session.try_out_session_id, session.product_try_out_id, session.question_id)} variant="outline" size="sm" className="text-blue-800 bg-blue-200">
                    <Flag className="mr-2 h-4 w-4" /> Lihat Pembahasan
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </>
      <div className="mt-8 md:mt-16">
        <TitleComponent title="Grafik Pengerjaan TryOut Premium Kamu" subTitle="Menampilkan Grafik 10 TryOut Premium yang Kamu Kerjakan!" />
      </div>
      <div className="my-8 px-4 md:px-24">
        <Alert variant="destructive" className="w-full md:w-1/2 mx-auto flex flex-col items-start md:items-center gap-3 bg-red-50 border-l-4 border-red-500 shadow-sm">
          <div className="flex items-center gap-2 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-10a1 1 0 10-2 0v4a1 1 0 102 0V8zm-1 6a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd" />
            </svg>
            <AlertTitle className="text-sm font-semibold whitespace-normal">Akses Tidak Tersedia</AlertTitle>
          </div>
          <AlertDescription className="text-sm text-gray-700 md:ml-2">Grafik Pengerjaan TryOut Hanya Tersedia Untuk TryOut Premium.</AlertDescription>
        </Alert>
      </div>
    </LayoutBackgroundWhite>
  );
}
