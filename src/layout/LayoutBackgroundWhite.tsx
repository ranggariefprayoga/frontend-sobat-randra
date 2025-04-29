import { ReactNode } from "react";

type LayoutSectionProps = {
  children: ReactNode;
};

export default function LayoutBackgroundWhite({ children }: LayoutSectionProps) {
  return (
    <div className="bg-white text-black py-8 md:py-14">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
