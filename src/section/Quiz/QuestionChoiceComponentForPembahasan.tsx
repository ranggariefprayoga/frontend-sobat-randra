import React from "react";
import LatexRenderer from "@/components/LatexRendered/LatexRendered";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface QuestionChoiceQuizResponseForPembahasan {
  id: number;
  question_choice_title: string;
  question_choice_text: string[];
  question_choice_text_math: string[];
  question_choice_images: string[];
}

interface Answer {
  question_choice_title: string;
  question_choice_text: string[];
  question_choice_text_math: string[];
  question_choice_images: string[];
}

interface ChoiceProps {
  choices: QuestionChoiceQuizResponseForPembahasan[] | undefined | null;
  correctAnswer: Answer | null | undefined;
  userAnswer: Answer | null | undefined;
}

// Wrap your component with React.memo and assign displayName
const QuestionChoiceComponentForPembahasan = React.memo(({ choices, correctAnswer, userAnswer }: ChoiceProps) => {
  if (!choices || choices.length === 0) return <p className="text-sm text-gray-400">Belum ada pilihan jawaban.</p>;

  const order = ["A", "B", "C", "D", "E"];

  // Urutkan pilihan berdasarkan urutan yang sudah ditentukan (A, B, C, D, E)
  const sortedChoices = choices.sort((a, b) => {
    return order.indexOf(a.question_choice_title) - order.indexOf(b.question_choice_title);
  });

  return (
    <div className="mb-4 space-y-4 flex flex-col justify-start w-full">
      {sortedChoices.map((choice) => {
        const isCorrect = correctAnswer?.question_choice_title === choice.question_choice_title;
        const isUserSelected = userAnswer?.question_choice_title === choice.question_choice_title;
        const isWrongAnswer = isUserSelected && !isCorrect;

        return (
          <Button
            key={choice.id}
            variant="outline"
            className={`border rounded-md p-4 space-y-3 w-full h-auto 
              ${isCorrect ? "bg-green-200 border-green-400 text-green-700" : ""}
              ${isWrongAnswer ? "bg-red-200 border-red-400 text-red-700" : ""}
              ${!isCorrect && !isWrongAnswer ? "bg-transparent border-gray-300 text-gray-700" : ""}
            `}
          >
            <div className="flex flex-col items-start gap-2 w-full h-auto">
              <div className="flex gap-2 justify-start items-start">
                <Badge variant={isCorrect || isWrongAnswer ? "secondary" : "outline"} className="text-sm">
                  {choice.question_choice_title}
                </Badge>

                {/* Display math choice */}
                {choice.question_choice_text_math && choice.question_choice_text_math.length > 0 && (
                  <div className="text-base sm:text-xl w-full">
                    {choice.question_choice_text_math.map((math, i) => (
                      <div key={i} className="mb-2 text-base text-start whitespace-pre-wrap">
                        <LatexRenderer latexStrings={[math]} />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  {/* Display choice text */}
                  {choice.question_choice_text && choice.question_choice_text.length > 0 && (
                    <div className="space-y-1 text-sm">
                      {choice.question_choice_text.map((line, idx) => (
                        <p className="text-start whitespace-pre-wrap" key={idx}>
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
QuestionChoiceComponentForPembahasan.displayName = "QuestionChoiceComponentForPembahasan ";

export default QuestionChoiceComponentForPembahasan;
