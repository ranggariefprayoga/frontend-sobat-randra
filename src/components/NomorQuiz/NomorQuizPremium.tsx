"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react"; // Import useState for managing dialog open/close state

interface NumberButtonsResponsiveProps {
  onSelectNumber: (num: number) => void;
  questionAnswered: boolean | undefined;
}

export default function NumberButtonsResponsiveForPremiumQuiz({ onSelectNumber, questionAnswered }: NumberButtonsResponsiveProps) {
  const [isOpen, setIsOpen] = useState(false);
  const numbers = Array.from({ length: 110 }, (_, i) => i + 1);

  const handleDialogClose = () => {
    setIsOpen(false); // Close the dialog when "Tutup" button is clicked
  };

  return (
    <>
      {/* Tombol buka modal hanya tampil di mobile (sm:hidden) */}
      <div className="lg:hidden mb-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">📘 Lihat Soal</Button>
          </DialogTrigger>

          <DialogContent aria-describedby={undefined} className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Pilih Soal</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-5 gap-2">
              {numbers.map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectNumber(num)}
                  className={`${num <= 10 ? "border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-500" : "border-gray-400 text-gray-500 bg-gray-200"} 
    ${questionAnswered ? "bg-green-500 text-white" : ""} 
    rounded-md transition-colors duration-200`}
                >
                  {num}
                </Button>
              ))}
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
        {numbers.map((num) => (
          <Button
            key={num}
            variant="outline"
            size="sm"
            onClick={() => onSelectNumber(num)}
            className={`${num <= 10 ? "border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-500" : "border-gray-400 text-gray-500 bg-gray-200"} 
    ${questionAnswered ? "bg-green-500 text-white" : ""} 
    rounded-md transition-colors duration-200`}
          >
            {num}
          </Button>
        ))}
      </div>
    </>
  );
}
