"use client";

import LatexRenderer from "@/components/LatexRendered/LatexRendered";

import { getHistorySessionDetailByUser } from "@/model/quiz-history.model";
import { useRef } from "react";

interface QuestionComponentProps {
  question: getHistorySessionDetailByUser | null | undefined;
}

const QuestionComponentForPembahasan: React.FC<QuestionComponentProps> = ({ question }) => {
  const mathRef = useRef<HTMLDivElement>(null);
  if (!question) return <p className="text-gray-500">Data soal tidak ditemukan.</p>;
  const mathContents = question?.question_text_math?.flatMap((item) => item) || [];

  return (
    <>
      <div key={question.question_id} className="rounded-md text-base mb-4 md:mb-8">
        <div className="flex items-center">
          <div className="flex items-start gap-1 sm:gap-2">
            {/* Math Pilihan */}
            {question.question_text_math && question.question_text_math.length > 0 && (
              <div ref={mathRef} className="text-base  w-full">
                {mathContents.map((expression, index) => (
                  <div key={index} className="mb-2 text-base text-start whitespace-pre-wrap">
                    <LatexRenderer latexStrings={[expression]} />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-2">
              {/* Teks Pilihan */}
              {question.question_text && question.question_text.length > 0 && (
                <div className="space-y-1 text-base">
                  {question.question_text.map((line, idx) => {
                    return (
                      <p className="text-start whitespace-pre-wrap text-base md:text-lg font-medium" key={idx}>
                        {line}
                      </p>
                    );
                  })}
                </div>
              )}
              {/* Gambar Pilihan */}
              {question.question_images && question.question_images.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {question.question_images.map((src, idx) => (
                    <img key={idx} src={src} alt={`Gambar soal ${idx + 1}`} className="w-full lg:w-[60%] rounded border object-contain max-h-[450px]" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionComponentForPembahasan;
