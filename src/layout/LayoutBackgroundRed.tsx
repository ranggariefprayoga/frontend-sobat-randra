import { ReactNode } from "react";

type LayoutSectionProps = {
  children: ReactNode;
};

export default function LayoutBackgroundRed({ children }: LayoutSectionProps) {
  return (
    <div className="bg-[#ad0a1f] text-white py-8 md:py-14">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
