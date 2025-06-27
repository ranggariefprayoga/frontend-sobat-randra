import { ReactNode } from "react";

type LayoutHeroSectionProps = {
  children: ReactNode;
};

export const LayoutHeroSection = ({ children }: LayoutHeroSectionProps) => {
  return (
    <div className="text-black -mt-8 md:-mb-16">
      <div className="max-w-[1420px] mx-auto bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/background/3.png")' }}>
        {children}
      </div>
    </div>
  );
};
