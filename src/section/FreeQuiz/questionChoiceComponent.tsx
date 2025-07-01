import React from "react";
import LatexRenderer from "@/components/LatexRendered/LatexRendered";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface QuestionChoiceQuizResponse {
  id: number;
  question_choice_title: string;
  question_choice_text: string[] | [];
  question_choice_text_math?: string[] | [];
  question_choice_images?: string[] | [];
  question_choice_weighted?: string; // Diasumsikan ini adalah string
}

interface ChoiceProps {
  choices: QuestionChoiceQuizResponse[];
  question_id: number | undefined;
  isSelected: number | undefined;
  onSelect: (question_choice_id: number) => Promise<void>;
}

// Wrap your component with React.memo and assign displayName
const QuestionChoiceComponent = React.memo(({ choices, isSelected, onSelect }: ChoiceProps) => {
  if (!choices || choices.length === 0) return <p className="text-sm text-gray-400">Belum ada pilihan jawaban.</p>;

  const order = ["A", "B", "C", "D", "E"];

  // Urutkan pilihan berdasarkan urutan yang sudah ditentukan (A, B, C, D, E)
  const sortedChoices = choices.sort((a, b) => {
    return order.indexOf(a.question_choice_title) - order.indexOf(b.question_choice_title);
  });

  return (
    <div className="mb-4 space-y-4 flex flex-col justify-start w-full">
      {sortedChoices.map((choice) => {
        const isChoiceSelected = choice.id === isSelected;

        return (
          <Button
            key={choice.id}
            variant="outline"
            className={`border rounded-md px-2 py-4 space-y-2 w-full h-auto ${isChoiceSelected ? "bg-blue-100 border-blue-500 hover:bg-blue-100 text-blue-700 cursor-not-allowed" : "bg-transparent border-gray-300 text-black"}`}
            onClick={() => onSelect(choice.id)} // Handle selection
          >
            <div className="flex flex-col items-start gap-2 w-full h-auto">
              <div className="flex gap-2 justify-start items-start">
                <Badge
                  variant={isChoiceSelected ? "secondary" : "outline"}
                  className={`text-sm font-semibold ${isChoiceSelected ? "bg-blue-100 border-blue-500 hover:bg-blue-100 text-blue-700 cursor-not-allowed" : "bg-transparent border-gray-300 text-black"}`}
                >
                  {choice.question_choice_title}
                </Badge>

                {/* Display math choice */}
                {choice.question_choice_text_math && choice.question_choice_text_math.length > 0 && (
                  <div className="text-sm sm:text-base w-full">
                    {choice.question_choice_text_math.map((math, i) => (
                      <div key={i} className="mb-2 text-sm  text-start whitespace-pre-wrap">
                        <LatexRenderer latexStrings={[math]} />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  {/* Display choice text */}
                  {choice.question_choice_text && choice.question_choice_text.length > 0 && (
                    <div className="space-y-1 text-sm sm:text-base">
                      {choice.question_choice_text.map((line, idx) => (
                        <p className="text-start text-sm sm:text-base font-semibold whitespace-pre-wrap" key={idx}>
                          {line}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Display choice images */}
                  {choice.question_choice_images && choice.question_choice_images.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {choice.question_choice_images.map((src, idx) => (
                        <Image key={idx} src={src} alt={`Gambar soal ${idx + 1}`} className="w-full lg:w-[60%] rounded border" width={800} height={450} style={{ objectFit: "contain" }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
});

// Setting the displayName property for the component
QuestionChoiceComponent.displayName = "QuestionChoiceComponent";

export default QuestionChoiceComponent;
