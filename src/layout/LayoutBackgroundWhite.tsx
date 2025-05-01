import { ReactNode } from "react";

type LayoutSectionProps = {
  children: ReactNode;
};

export default function LayoutBackgroundWhite({ children }: LayoutSectionProps) {
  return (
    <div className="bg-white text-black py-8">
      <div className="max-w-[1420px] mx-auto">{children}</div>
    </div>
  );
}
