"use client";

import LatexRenderer from "@/components/LatexRendered/LatexRendered";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface QuestionChoiceForFreeQuizResponse {
  id: number;
  question_choice_title: string;
  question_choice_text: string[] | undefined;
  question_choice_text_math?: string[] | undefined;
  question_choice_images?: string[] | undefined;
  question_choice_weighted?: string; // Assuming this is a string
}

interface ChoiceProps {
  choices: QuestionChoiceForFreeQuizResponse[];
  isSelected: boolean;
  onSelect: (choiceId: number) => void;
}

const QuestionChoiceComponentForFree = ({ choices, isSelected, onSelect }: ChoiceProps) => {
  if (!choices || choices.length === 0) return <p className="text-sm text-gray-400">Belum ada pilihan jawaban.</p>;
  console.log(onSelect);
  console.log(isSelected);

  const order = ["A", "B", "C", "D", "E"];

  // Sort the choices array based on the predefined order (A, B, C, D, E)
  const sortedChoices = choices.sort((a, b) => {
    return order.indexOf(a.question_choice_title) - order.indexOf(b.question_choice_title);
  });

  return (
    <div className="mb-4 space-y-4">
      {sortedChoices.map((choice) => (
        <div key={choice.id} className="border rounded-md p-4 bg-white shadow-sm space-y-3">
          <div className="flex items-center">
            <div className="flex items-start gap-2">
              <Badge variant="default" className="text-sm bg-[#ad0a1f]">
                {choice.question_choice_title}.
              </Badge>
              {/* Teks Pilihan */}
              {choice.question_choice_text && choice.question_choice_text.length > 0 && (
                <div className="space-y-1 text-sm">
                  {choice.question_choice_text.map((line, idx) => {
                    return <p key={idx}>{line}</p>;
                  })}
                </div>
              )}

              {/* Math Pilihan */}
              {choice.question_choice_text_math && choice.question_choice_text_math.length > 0 && (
                <div className="text-base sm:text-xl w-full">
                  {choice.question_choice_text_math.map((math, i) => (
                    <div key={i} className="mb-2 text-base sm:text-xl">
                      <LatexRenderer latexStrings={[math]} />
                    </div>
                  ))}
                </div>
              )}

              {/* Gambar Pilihan */}
              {choice.question_choice_images && choice.question_choice_images.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {choice.question_choice_images.map((src, idx) => (
                    <Image key={idx} src={src} alt={`Gambar soal ${idx + 1}`} className="w-full lg:w-auto rounded border" width={800} height={450} style={{ objectFit: "contain" }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionChoiceComponentForFree;
