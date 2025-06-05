import FreeQuizSection from "@/section/FreeQuiz/FreeQuizSection";
export default function FreeQuizPage() {
  return (
    <div className="bg-white text-black py-4">
      <div className="max-w-[1420px] mx-auto">
        <div className="w-full px-4 md:px-24">
          <FreeQuizSection />
        </div>
      </div>
    </div>
  );
}
