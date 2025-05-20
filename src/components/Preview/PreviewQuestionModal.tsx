/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WebResponse } from "@/model/web-reponse.model";
import { QuestionResponse } from "@/model/question.model";

import QuestionPreview from "./PreviewQuestion";
import DeleteQuestionButton from "../Dialog/ModalHapusSoal";

type Props = {
  open: boolean;
  onClose: () => void;
  activeNumber: number | null;
  isLoading: boolean;
  error?: any;
  questionDetail?: WebResponse<QuestionResponse>;
  product_try_out_id: number;
  handleChangeQuestion?: () => void;
};

export default function PreviewQuestionDialog({ product_try_out_id, open, onClose, activeNumber, isLoading, error, questionDetail, handleChangeQuestion }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="max-w-7xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Soal Nomor {activeNumber}</DialogTitle>
          <div className="border-b border-gray-300 mb-2" />
        </DialogHeader>

        <>
          <QuestionPreview isLoading={isLoading} error={error} data={questionDetail?.data} />
        </>

        <DialogFooter>
          <>
            <DeleteQuestionButton
              productId={product_try_out_id}
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
