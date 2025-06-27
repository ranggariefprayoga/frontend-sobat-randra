import { ReactNode } from "react";

type LayoutContentProps = {
  children: ReactNode;
};

export default function LayoutContent({ children }: LayoutContentProps) {
  return (
    <>
      <div className="w-full px-4 md:px-24 mt-8 md:mt-16 mb-8 md:mb-16">{children}</div>
    </>
  );
}
