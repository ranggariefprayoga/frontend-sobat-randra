"use client";

import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";

import { ArrowLeft } from "lucide-react";
import { use, useState } from "react";
import TitleComponent from "../TitleComponent/TitleComponent";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { QuestionResponse } from "@/model/question.model";
import { useGetValidQuestionsAdmin, useGetQuestionByNumber } from "@/lib/api/question.api";
import CreateQuestionModal from "./ModalBuatSoal";
import PreviewQuestionDialog from "../Preview/PreviewQuestionModal";

export default function BuatSoalTryOutDetail({ params }: { params: Promise<{ product_try_out_id: string }> }) {
  const { product_try_out_id: id } = use(params);
  const [activeCategory, setActiveCategory] = useState<"TWK" | "TIU" | "TKP">("TWK");
  const [activeNumber, setActiveNumber] = useState<number | null>(null);
  const [openPreview, setOpenPreview] = useState(false);

  const questionRanges = {
    TWK: { start: 1, end: 30 },
    TIU: { start: 31, end: 65 },
    TKP: { start: 66, end: 110 },
  };

  // Panggil API valid questions untuk admin
  const { data: questionsData, isLoading, refetch } = useGetValidQuestionsAdmin(id);
  const handleChangeQuestion = () => {
    refetch(); // refresh data valid questions
  };

  // Buat set nomor soal yang valid
  const validNumbers = new Set<number>();
  if (questionsData?.data) {
    questionsData.data.forEach((q: QuestionResponse) => {
      validNumbers.add(q.number_of_question);
    });
  }

  // Filter tombol nomor soal sesuai kategori dan cek apakah valid
  const questionNumbers = Array.from({ length: questionRanges[activeCategory].end - questionRanges[activeCategory].start + 1 }, (_, idx) => questionRanges[activeCategory].start + idx);

  // Ambil detail soal berdasarkan activeNumber dan id
  const { data: questionDetail, isLoading: isLoadingQuestion, error } = useGetQuestionByNumber(Number(id), activeNumber ?? undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#ad0a1f] border-opacity-70"></div>
      </div>
    );
  }

  const openQuestionPreview = (number: number) => {
    setActiveNumber(number);
    setOpenPreview(true);
  };

  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Buat Soal Try Out" />

      <div className="px-8 md:px-24 my-4">
        <CreateQuestionModal onQuestionAdded={handleChangeQuestion} product_try_out_id={Number(id)} category={activeCategory} validQuestions={Array.from(validNumbers)} questionRanges={questionRanges[activeCategory]} />
      </div>

      <Tabs value={activeCategory} onValueChange={(val: string) => setActiveCategory(val as "TWK" | "TIU" | "TKP")} className="w-full mb-6 px-4 md:px-24 mt-4">
        <TabsList className="flex justify-center space-x-6 rounded-lg bg-gray-100 p-1 shadow-inner max-w-md mx-auto">
          <TabsTrigger
            value="TWK"
            className="flex-1 text-center py-2 rounded-lg font-semibold transition-colors duration-300
                 data-[state=active]:bg-[#081737] data-[state=active]:text-white
                 hover:bg-[#081737] hover:text-white cursor-pointer"
          >
            TWK
          </TabsTrigger>
          <TabsTrigger
            value="TIU"
            className="flex-1 text-center py-2 rounded-lg font-semibold transition-colors duration-300
                 data-[state=active]:bg-[#081737] data-[state=active]:text-white
                 hover:bg-[#081737] hover:text-white cursor-pointer"
          >
            TIU
          </TabsTrigger>
          <TabsTrigger
            value="TKP"
            className="flex-1 text-center py-2 rounded-lg font-semibold transition-colors duration-300
                 data-[state=active]:bg-[#081737] data-[state=active]:text-white
                 hover:bg-[#081737] hover:text-white cursor-pointer"
          >
            TKP
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 px-8 md:px-24 mb-8">
        {questionNumbers.map((number) => {
          const isValid = validNumbers.has(number);
          return (
            <Button
              key={number}
              variant="outline"
              onClick={() => isValid && openQuestionPreview(number)}
              disabled={!isValid}
              className="h-9 px-3 bg-[#ad0a1f] text-sm text-white"
              title={isValid ? `Nomor Soal ${number}` : `Soal ${number} tidak tersedia`}
            >
              {number}
            </Button>
          );
        })}
      </div>

      {/* Modal Preview Soal */}
      <>
        <PreviewQuestionDialog
          handleChangeQuestion={handleChangeQuestion}
          product_try_out_id={Number(id)}
          open={openPreview}
          onClose={() => setOpenPreview(false)}
          activeNumber={activeNumber}
          isLoading={isLoadingQuestion}
          error={error}
          questionDetail={questionDetail}
        />
      </>
    </LayoutBackgroundWhite>
  );
}
