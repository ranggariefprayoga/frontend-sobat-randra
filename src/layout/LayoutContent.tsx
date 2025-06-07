import { ReactNode } from "react";

type LayoutContentProps = {
  children: ReactNode;
};

export default function LayoutContent({ children }: LayoutContentProps) {
  return (
    <>
      <div className="w-full px-4 md:px-24 mt-8">{children}</div>
    </>
  );
}
