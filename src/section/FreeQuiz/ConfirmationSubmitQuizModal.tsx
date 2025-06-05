"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SubmitConfirmationModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal handler
  const closeModal = () => setIsOpen(false);

  // Submit quiz handler
  const handleSubmitQuiz = () => {
    console.log("Quiz Submitted");
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Selesaikan Quiz</Button> {/* This button triggers the modal */}
        </DialogTrigger>

        <DialogContent className="w-full max-w-md p-6 bg-gradient-to-r from-teal-400 via-sky-500 to-blue-600 text-white shadow-xl rounded-lg">
          <DialogHeader>
            <DialogTitle>Konfirmasi Penyelesaian</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-lg">Apakah Anda yakin ingin menyelesaikan quiz? Pastikan Anda telah menjawab semua soal sebelum melanjutkan.</p>
          </div>

          <DialogFooter className="space-x-4">
            <Button variant="outline" onClick={closeModal}>
              Tutup
            </Button>
            <Button variant="default" onClick={handleSubmitQuiz} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Selesaikan Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
