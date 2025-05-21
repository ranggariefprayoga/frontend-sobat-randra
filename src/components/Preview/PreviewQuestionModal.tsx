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
  const existingChoices = questionChoiceData?.data?.map((choice) => choice.question_choice_title) || [];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="max-w-7xl max-h-[80vh] overflow-auto">
        <DialogHeader aria-describedby={undefined}>
          <DialogTitle className="text-center">
            Nomor {activeNumber} - {questionDetail?.data?.category}
          </DialogTitle>
          <div className="flex justify-center gap-2 mt-2">
            {questionDetail?.data && (
              <CreateQuestionChoiceModal
                product_try_out_id={product_try_out_id}
                questionId={questionDetail.data.id}
                existingChoices={existingChoices}
                isLoadingChoices={isLoadingChoices}
                questionCategory={questionDetail.data.category}
                onCancel={onClose}
                onSuccess={() => handleRefetchQuestionChoice()}
              />
            )}
          </div>
          <div className="border-b border-gray-300 mb-2" />
        </DialogHeader>

        <>
          {questionDetail?.data ? (
            <>
              <div className="flex justify-between gap-2">
                <QuestionPreview isLoading={isLoading} error={error} data={questionDetail.data} />
                <UpdateQuestionModal data={questionDetail.data} product_try_out_id={product_try_out_id} handleRefetchQuestion={handleRefetchQuestion} />
              </div>
              <QuestionChoicePreview isLoading={isLoadingChoices} error={error} data={questionChoiceData?.data} questionCategory={questionDetail.data.category} handleRefecthQuestionChoice={handleRefetchQuestionChoice} />
            </>
          ) : (
            <p className="text-gray-500 text-sm">Lagi Loading soal...</p>
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
