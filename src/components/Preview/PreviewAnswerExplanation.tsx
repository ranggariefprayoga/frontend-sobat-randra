/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import LatexRenderer from "../LatexRendered/LatexRendered";
import Image from "next/image";
import { AnswerExplanationResponse } from "@/model/answerExplanation.model";
import DeleteAnswerExplanationModal from "../Dialog/ModalHapusPenjelasanJawaban";
import UpdateAnswerExplanationModal from "../Dialog/ModalUpdatePenjelasanPertanyaan";

type AnswerExplanationPreviewProps = {
  isLoading: boolean;
  error?: any;
  data?: AnswerExplanationResponse[];
  questionCategory: string;
  handleRefecthAnswerExplanation: () => void;
};

const AnswerExplanationPreview: React.FC<AnswerExplanationPreviewProps> = ({ isLoading, error, data, handleRefecthAnswerExplanation, questionCategory }) => {
  return (
    <div className="mb-4">
      {isLoading && <p>Loading penjelasan jawaban...</p>}

      {!isLoading && error && <p className="text-red-600">Gagal memuat penjelasan jawaban.</p>}

      {!isLoading && (!data || data.length === 0) && <p className="text-gray-400 text-sm">Belum ada penjelasan jawaban.</p>}

      {!isLoading && data && data.length > 0 && (
        <div className="space-y-6">
          {data.map((item, idx) => (
            <div key={idx} className="space-y-4 border p-4 rounded-md bg-gray-50">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2 gap-2 font-semibold">
                <h1 className="text-base font-bold text-gray-800 mb-4">📘 Pembahasan:</h1>

                <div className="flex items-center gap-2">
                  <UpdateAnswerExplanationModal
                    answerExplanationId={item.id}
                    product_try_out_id={item.product_try_out_id}
                    questionId={item.question_id}
                    questionCategory={questionCategory}
                    onSuccess={() => handleRefecthAnswerExplanation()}
                  />
                  <DeleteAnswerExplanationModal product_try_out_id={item.product_try_out_id} questionId={item.question_id} answerExplanationId={item.id} onDeleted={() => handleRefecthAnswerExplanation()} />
                </div>
              </div>

              {/* Teks Penjelasan */}
              {Array.isArray(item.answer_explanation_text) && item.answer_explanation_text.length > 0 && (
                <div className="space-y-2">
                  {item.answer_explanation_text.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}

              {/* Math Penjelasan */}
              {Array.isArray(item.answer_explanation_text_math) && item.answer_explanation_text_math.length > 0 && (
                <div className="space-y-2 text-base sm:text-xl">
                  {item.answer_explanation_text_math.map((math, i) => (
                    <LatexRenderer key={i} latexStrings={[math]} />
                  ))}
                </div>
              )}

              {/* Gambar Penjelasan */}
              {Array.isArray(item.answer_explanation_images) && item.answer_explanation_images.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {item.answer_explanation_images.map((src, i) => (
                    <Image key={i} src={src} alt={`Gambar penjelasan ${i + 1}`} className="w-full rounded" width={800} height={450} style={{ objectFit: "contain" }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerExplanationPreview;
