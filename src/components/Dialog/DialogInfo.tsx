import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { MessageCircleQuestion } from "lucide-react";

interface DialogInfoProps {
  triggerText: string;
  title: string;
  description: string;
  details: string[];
}

export function DialogInfo({ triggerText, title, description, details }: DialogInfoProps) {
  return (
    <Dialog>
      {/* Dialog Trigger */}
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="bg-[#f5f5f5] text-black flex justify-start">
          <MessageCircleQuestion />
          {triggerText}
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[625px] px-8">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Numbered List */}
        {details && details.length > 0 && (
          <ol className="list-decimal pl-6">
            {details.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        )}

        {/* Dialog Footer */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Tutup</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
