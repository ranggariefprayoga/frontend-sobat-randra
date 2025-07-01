"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react"; // Import useState for managing dialog open/close state
import QuestionButton from "./QuestionButton"; // Import the new QuestionButton component

interface QuestionInterface {
  id: number;
  number_of_question: number | undefined;
}

interface NumberButtonsResponsiveProps {
  onSelectNumber: (question_id: number) => void;
  questions: QuestionInterface[] | undefined | null; // `questions` can be undefined
  questionHasAswered: number[]; // Array of answered question numbers
  currentQuestionId: number; // Current active question id
}

export default function NumberButtonsResponsive({ onSelectNumber, questions, questionHasAswered, currentQuestionId }: NumberButtonsResponsiveProps) {
  const [isOpen, setIsOpen] = useState(false); // State to manage the dialog's open/close

  const handleDialogClose = () => {
    setIsOpen(false); // Close the dialog when "Tutup" button is clicked
  };

  // Generate 110 questions array (looping from 1 to 110)
  const numbers = Array.from({ length: 110 }, (_, i) => i + 1);

  return (
    <>
      {/* Tombol buka modal hanya tampil di mobile (sm:hidden) */}
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
                // Find the question based on number
                const question = questions?.find((q) => q.number_of_question === num);
                const questionId = question?.id; // Get the question_id directly

                return (
                  <QuestionButton
                    key={num}
                    numberOfQuestions={question?.number_of_question}
                    questionId={questionId} // Pass question_id for navigation
                    isAnswered={questionHasAswered.includes(questionId ?? 0)} // Check if this question has been answered
                    isCurrent={questionId === currentQuestionId} // Check if this is the current question
                    onClick={() => {
                      if (questionId) {
                        onSelectNumber(questionId); // Use question_id for navigation
                        setIsOpen(false); // Close modal after selecting a question
                      }
                    }}
                  />
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

      {/* Grid tombol langsung tampil di desktop/tablet (hidden di mobile) */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-2">
        {numbers.map((num: number) => {
          // Find the question based on number
          const question = questions?.find((q) => q.number_of_question === num);
          const questionId = question?.id; // Get the question_id directly

          return (
            <QuestionButton
              key={num}
              numberOfQuestions={question?.number_of_question}
              questionId={questionId} // Pass question_id for navigation
              isAnswered={questionHasAswered.includes(questionId ?? 0)} // Check if this question has been answered
              isCurrent={questionId === currentQuestionId} // Check if this is the current question
              onClick={() => {
                if (!questionId) {
                  onSelectNumber(0);
                  setIsOpen(false);
                }

                if (questionId) {
                  onSelectNumber(questionId); // Use question_id for navigation
                  setIsOpen(false); // Close modal after selecting a question
                }
              }}
            />
          );
        })}
      </div>
    </>
  );
}
