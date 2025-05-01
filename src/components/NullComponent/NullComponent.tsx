import { Frown } from "lucide-react";

interface NullComponentProps {
  message: string;
  color?: string;
}

const NullComponent = ({ message, color = "text-gray-500" }: NullComponentProps) => {
  return (
    <div className={`px-8 md:px-24 py-14 lg:py-20 flex items-center justify-center text-center ${color} mt-8 font-bold gap-2`}>
      {/* Ikon */}
      <Frown className={`h-8 w-8 ${color} `} />
      <span className="text-base">{message}</span>
    </div>
  );
};

export default NullComponent;
