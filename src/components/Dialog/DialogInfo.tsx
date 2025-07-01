import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

export interface DialogInfoProps {
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
        <Button size="sm" variant="outline" className="w-auto">
          ❓{triggerText}
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
              <li className="text-xs" key={index}>
                {item}
              </li>
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
