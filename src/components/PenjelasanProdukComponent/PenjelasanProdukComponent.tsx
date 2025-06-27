import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode } from "react";

interface AlertBoxProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const PenjelasanProdukComponent = ({ icon, title, description }: AlertBoxProps) => {
  return (
    <Alert className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm">
      {/* Icon in circle */}
      <div className="flex-shrink-0 bg-red-200/50 p-2 rounded-full">{icon}</div>

      {/* Text content */}
      <div className="space-y-1">
        <AlertTitle className="text-base md:text-lg font-semibold text-black">{title}</AlertTitle>
        <AlertDescription className="text-sm md:text-base text-gray-700">{description}</AlertDescription>
      </div>
    </Alert>
  );
};

export default PenjelasanProdukComponent;
