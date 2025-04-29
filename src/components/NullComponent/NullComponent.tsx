import { Frown } from "lucide-react";

interface NullComponentProps {
  message: string;
  color?: string;
}

const NullComponent = ({ message, color = "text-gray-500" }: NullComponentProps) => {
  return (
    <div className={`flex items-center justify-center text-center ${color} mt-8 font-bold`}>
      {/* Ikon */}
      <Frown className={`h-12 w-12 ${color}  mr-4`} />
      <span className="text-lg sm:text-xl">{message}</span>
    </div>
  );
};

export default NullComponent;
