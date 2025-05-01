import { Info } from "lucide-react";

interface InfoComponentProps {
  message: string;
  color?: string;
}

const InfoComponent = ({ message, color = "text-gray-500" }: InfoComponentProps) => {
  return (
    <div className={`px-8 md:px-24 py-14 lg:py-20 flex flex-col items-center justify-center text-center ${color} font-bold gap-2`}>
      {/* Ikon */}
      <Info className={`h-8 w-8 ${color} `} />
      <span className="text-base">{message}</span>
    </div>
  );
};

export default InfoComponent;
