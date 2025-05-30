/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WebResponse } from "@/model/web-reponse.model";
import { QuestionResponse } from "@/model/question.model";

import QuestionPreview from "./PreviewQuestion";
import DeleteQuestionButton from "../Dialog/ModalHapusSoal";
import { useGetAllQuestionChoices } from "@/lib/api/questionChoice.api";
import QuestionChoicePreview from "./PreviewQuestionChoice";
import UpdateQuestionModal from "../Dialog/UpdateSoalModal";
import CreateQuestionChoiceModal from "../Dialog/ModalBuatPilihanJawaban";
import AnswerExplanationPreview from "./PreviewAnswerExplanation";
import { useGetAllAnswerExplanations } from "@/lib/api/answerExplanation.api";
import CreateAnswerExplanationModal from "../Dialog/ModalBuatPenjelasanPertanyaan";

type Props = {
  open: boolean;
  onClose: () => void;
  activeNumber: number | null;
  isLoading: boolean;
  error?: any;
  questionDetail?: WebResponse<QuestionResponse>;
  product_try_out_id: number;
  handleChangeQuestion?: () => void;
  handleRefetchQuestion?: () => void;
};

export default function PreviewQuestionDialog({ product_try_out_id, open, onClose, activeNumber, isLoading, error, questionDetail, handleChangeQuestion, handleRefetchQuestion }: Props) {
  const { data: questionChoiceData, isLoading: isLoadingChoices, refetch: handleRefetchQuestionChoice } = useGetAllQuestionChoices(product_try_out_id, questionDetail?.data?.id);
  const { data: answerExplanationData, isLoading: isAnswerExplanationLoading, refetch: handleRefetchAnswerExplanation } = useGetAllAnswerExplanations(product_try_out_id, questionDetail?.data?.id);
  const existingChoices = questionChoiceData?.data?.map((choice) => choice.question_choice_title) || [];

  const handleRefetchQuestionChoices = () => handleRefetchQuestionChoice().then(() => handleChangeQuestion?.());
  const handleRefecthAnswerExplanations = () => handleRefetchAnswerExplanation().then(() => handleChangeQuestion?.());
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md max-h-[80vh] overflow-auto px-4">
        <DialogHeader>
          <DialogTitle className="text-center">
            Nomor {activeNumber} - {questionDetail?.data?.category}
          </DialogTitle>
          {questionDetail?.data && (
            <div className="flex justify-center gap-2 mt-2">
              <CreateQuestionChoiceModal
                product_try_out_id={product_try_out_id}
                questionId={questionDetail.data.id}
                existingChoices={existingChoices}
                isLoadingChoices={isLoadingChoices}
                questionCategory={questionDetail.data.category}
                onCancel={onClose}
                onSuccess={handleRefetchQuestionChoices}
              />
              <CreateAnswerExplanationModal
                product_try_out_id={product_try_out_id}
                questionId={questionDetail.data.id}
                questionCategory={questionDetail.data.category}
                existingAnswerExplanation={answerExplanationData?.data}
                isLoadingAnswerExplanation={isAnswerExplanationLoading}
                onCreated={handleRefecthAnswerExplanations}
                onCancel={onClose}
              />
              <UpdateQuestionModal data={questionDetail.data} product_try_out_id={product_try_out_id} handleRefetchQuestion={handleRefetchQuestion} />
            </div>
          )}
          <div className="border-b border-gray-300 mb-2" />
        </DialogHeader>

        <>
          {isLoading || isLoadingChoices || isAnswerExplanationLoading ? (
            <p className="text-gray-500 text-sm">Loading data, mohon tunggu...</p>
          ) : questionDetail?.data ? (
            <>
              <QuestionPreview isLoading={false} error={error} data={questionDetail.data} />

              <QuestionChoicePreview isLoading={false} error={error} data={questionChoiceData?.data} questionCategory={questionDetail.data.category} handleRefecthQuestionChoice={handleRefetchQuestionChoices} />
              <AnswerExplanationPreview isLoading={false} error={error} data={answerExplanationData?.data} questionCategory={questionDetail.data.category} handleRefecthAnswerExplanation={handleRefecthAnswerExplanations} />
            </>
          ) : (
            <p className="text-gray-500 text-sm">Data soal tidak ditemukan.</p>
          )}
        </>

        <DialogFooter>
          <>
            <DeleteQuestionButton
              product_try_out_id={product_try_out_id}
              questionId={questionDetail?.data?.id || 0}
              onDeleted={() => {
                if (handleChangeQuestion) {
                  handleChangeQuestion();
                }
                onClose();
              }}
            />
          </>
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
