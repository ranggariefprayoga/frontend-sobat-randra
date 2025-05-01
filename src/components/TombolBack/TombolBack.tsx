"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface ButtonWithIconProps {
  icon: LucideIcon;
  label: string;
}

const ButtonWithIcon = ({ icon: Icon, label }: ButtonWithIconProps) => {
  const router = useRouter();

  const handleToHome = () => {
    router.push("/");
  };

  return (
    <div className={`w-1/4 px-8 md:px-24 mb-4`}>
      <Button variant="ghost" className="bg-[#ad0a1f] text-white hover:bg-[#ad0a1f] hover:text-white" onClick={handleToHome}>
        <Icon className="h-4 w-4" />
        {label}
      </Button>
    </div>
  );
};

export default ButtonWithIcon;
