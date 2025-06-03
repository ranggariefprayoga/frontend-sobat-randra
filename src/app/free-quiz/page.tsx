"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useGetFreeQuestion } from "@/lib/api/soalFree.api";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { Button } from "@/components/ui/button";
import { useGetValidQuestionsUser } from "@/lib/api/question.api";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";

export default function FreeQuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productTryOutId = searchParams?.get("product_try_out_id");
  const numberOfQuestion = searchParams?.get("number_of_question");

  const { data, isLoading } = useGetFreeQuestion(Number(productTryOutId), Number(numberOfQuestion));
  const { data: validQuestions, isLoading: validQuestionsLoading } = useGetValidQuestionsUser(Number(productTryOutId));

  if (isLoading || validQuestionsLoading) {
    return (
      <div className="px-8 md:px-24 flex justify-center w-full">
        <LoadingComponent />
      </div>
    );
  }
  const handleNavigation = (direction: "next" | "prev") => {
    const newQuestion = direction === "next" ? data?.data?.nextQuestionNumber : data?.data?.previousQuestionNumber;
    if (newQuestion) {
      router.push(`/free-quiz?product_try_out_id=${productTryOutId}&number_of_question=${newQuestion}`);
    }
  };

  console.log(data);
  console.log(validQuestions, "valid question");

  return (
    <LayoutBackgroundWhite>
      <div className="w-full px-8 md:px-24 mt-4">
        <h1>hai</h1>
        <Button onClick={() => handleNavigation("next")}>Selanjutnya</Button>
        <Button onClick={() => handleNavigation("prev")}>Selanjutnya</Button>
      </div>
    </LayoutBackgroundWhite>
  );
}
