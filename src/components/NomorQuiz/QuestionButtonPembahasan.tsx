import React from "react";
import { LockKeyholeIcon } from "lucide-react";
import { Button } from "../ui/button";

interface QuestionButtonProps {
  numberOfQuestions: number | undefined;
  questionId: number | undefined;
  isCorrect: boolean | undefined; // Replaced isAnswered with isCorrect
  isCurrent: boolean;
  onClick: () => void;
}

const QuestionButtonPembahasan: React.FC<QuestionButtonProps> = ({ questionId, isCorrect, isCurrent, onClick, numberOfQuestions }) => {
  let baseClass = "text-xs sm:text-sm md:text-base w-full text-center py-1 rounded border transition-all";

  // Handle normal state, active, correct, wrong, and undefined (questionId === 0)
  if (questionId === 0) {
    // If the questionId is 0 (undefined), just display a normal button without a number
    baseClass += " bg-gray-300 text-gray-600 border-gray-400"; // Default styling for undefined question
  } else if (isCurrent) {
    // Active question
    baseClass += " border-[#081737] text-[#081737] font-semibold bg-white";
  } else if (isCorrect) {
    // Correct answer
    baseClass += " bg-green-500 text-white border-green-600 hover:bg-green-600 hover:text-white";
  } else {
    // Unanswered question
    baseClass += " bg-red-500 text-white border-red-600 hover:bg-red-600 hover:text-white";
  }

  return (
    <Button variant={"ghost"} onClick={onClick} className={baseClass}>
      {questionId === 0 || !questionId ? (
        <LockKeyholeIcon className="text-black" size={20} /> // Display Lock icon when questionId is 0
      ) : (
        numberOfQuestions // Display the question number
      )}
    </Button>
  );
};

export default QuestionButtonPembahasan;
