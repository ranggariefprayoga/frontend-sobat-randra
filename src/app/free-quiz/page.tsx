import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import FreeQuizSection from "@/section/FreeQuiz/FreeQuizSection";
export default function FreeQuizPage() {
  return (
    <LayoutBackgroundWhite>
      <div className="w-full px-8 md:px-24">
        <FreeQuizSection />
      </div>
    </LayoutBackgroundWhite>
  );
}
