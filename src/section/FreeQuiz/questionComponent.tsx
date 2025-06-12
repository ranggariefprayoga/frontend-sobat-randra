"use client";

import LatexRenderer from "@/components/LatexRendered/LatexRendered";
import { Badge } from "@/components/ui/badge";
import { QuestionResponse } from "@/model/question.model";
import Image from "next/image";
import { useRef } from "react";

interface QuestionComponentProps {
  question: QuestionResponse | null | undefined;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question }) => {
  const mathRef = useRef<HTMLDivElement>(null);
  if (!question) return <p className="text-gray-500">Data soal tidak ditemukan.</p>;
  const mathContents = question?.question_text_math?.flatMap((item) => item) || [];

  return (
    <>
      <div key={question.id} className="rounded-md text-base mb-4 md:mb-8">
        <div className="flex items-center">
          <div className="flex items-start gap-1 sm:gap-2">
            <Badge variant="outline" className="text-base">
              {question.number_of_question}.
            </Badge>

            {/* Teks Pilihan */}
            {question.question_text && question.question_text.length > 0 && (
              <div className="space-y-1 text-base">
                {question.question_text.map((line, idx) => {
                  return <p key={idx}>{line}</p>;
                })}
              </div>
            )}

            {/* Math Pilihan */}
            {question.question_text_math && question.question_text_math.length > 0 && (
              <div ref={mathRef} className="text-base sm:text-base w-full">
                {mathContents.map((expression, index) => (
                  <div key={index} className="mb-2 text-base sm:text-base">
                    <LatexRenderer latexStrings={[expression]} />
                  </div>
                ))}
              </div>
            )}

            {/* Gambar Pilihan */}
            {question.question_images && question.question_images.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {question.question_images.map((src, idx) => (
                  <Image key={idx} src={src} alt={`Gambar soal ${idx + 1}`} className="w-full lg:w-[60%] rounded border" width={800} height={450} style={{ objectFit: "contain" }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionComponent;
