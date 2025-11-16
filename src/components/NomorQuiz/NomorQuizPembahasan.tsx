"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import QuestionButtonPembahasan from "./QuestionButtonPembahasan";

interface QuestionInterface {
  id: number;
  number_of_question: number | undefined;
}

interface NumberButtonsResponsiveProps {
  onSelectNumber: (question_id: number) => void;
  questions: QuestionInterface[] | undefined | null; // `questions` can be undefined
  currentQuestionId: number; // Current active question id
  isCorrect: boolean; // Make sure isCorrect is typed as an array of numbers or undefined
}

export default function NumberButtonsResponsive({ onSelectNumber, questions, currentQuestionId, isCorrect }: NumberButtonsResponsiveProps) {
  const [isOpen, setIsOpen] = useState(false); // State to manage the dialog's open/close

  const handleDialogClose = () => {
    setIsOpen(false); // Close the dialog when "Tutup" button is clicked
  };

  // Generate 110 questions array (looping from 1 to 110)
  const numbers = Array.from({ length: 110 }, (_, i) => i + 1);

  return (
    <>
      {/* Mobile version: Open a dialog to select questions */}
      <div className="lg:hidden">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="bg-blue-100 text-blue-700 border-blue-500" asChild>
            <Button variant="outline">🔍 Lihat Soal</Button>
          </DialogTrigger>

          <DialogContent aria-describedby={undefined} className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Pilih Soal</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-5 gap-2">
              {numbers.map((num) => {
                const question = questions?.find((q) => q.number_of_question === num);
                const questionId = question?.id;

                // Only pass questionId if it is defined
                return (
                  questionId && (
                    <QuestionButtonPembahasan
                      key={num}
                      numberOfQuestions={question?.number_of_question}
                      questionId={questionId}
                      isCorrect={isCorrect}
                      isCurrent={questionId === currentQuestionId}
                      onClick={() => {
                        onSelectNumber(questionId); // Use question_id for navigation
                        setIsOpen(false); // Close modal after selecting a question
                      }}
                    />
                  )
                );
              })}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleDialogClose}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop version: Directly display questions in a grid */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-2">
        {numbers.map((num) => {
          const question = questions?.find((q) => q.number_of_question === num);
          const questionId = question?.id;

          // Only pass questionId if it is defined
          return (
            questionId && (
              <QuestionButtonPembahasan
                key={num}
                numberOfQuestions={question?.number_of_question}
                questionId={questionId}
                isCorrect={isCorrect}
                isCurrent={questionId === currentQuestionId}
                onClick={() => {
                  onSelectNumber(questionId); // Use question_id for navigation
                }}
              />
            )
          );
        })}
      </div>
    </>
  );
}
