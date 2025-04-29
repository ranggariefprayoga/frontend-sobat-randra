import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode } from "react";

interface AlertBoxProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const PenjelasanProdukComponent = ({ icon, title, description }: AlertBoxProps) => {
  return (
    <Alert className="flex items-center gap-3">
      <div>{icon}</div>
      <div>
        <AlertTitle className="text-[#ad0a1f] text-base sm:text-lg md:text-xl font-semibold">{title}</AlertTitle>
        <AlertDescription className="text-sm sm:text-base">{description}</AlertDescription>
      </div>
    </Alert>
  );
};

export default PenjelasanProdukComponent;
