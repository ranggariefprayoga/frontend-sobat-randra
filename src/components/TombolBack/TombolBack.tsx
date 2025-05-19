"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface ButtonWithIconProps {
  icon: LucideIcon;
  label: string;
  color?: string; // Jadikan optional
}

const ButtonWithIcon = ({
  icon: Icon,
  label,
  color = "text-[#ad0a1f]", // Nilai default
}: ButtonWithIconProps) => {
  const router = useRouter();

  const handleToHome = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <div className="w-1/4 px-8 md:px-24 mb-4">
      <Button variant="ghost" className={`${color}`} onClick={handleToHome}>
        <Icon className="h-4 w-4 mr-2" />
        {label}
      </Button>
    </div>
  );
};

export default ButtonWithIcon;
