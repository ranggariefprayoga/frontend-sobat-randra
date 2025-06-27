import { ReactNode } from "react";

type LayoutBackgroundImageProps = {
  children: ReactNode;
};

export const LayoutBackgroundImage = ({ children }: LayoutBackgroundImageProps) => {
  return (
    <div className="mx-auto text-white mt-8 md:mt-16 mb-8 md:mb-16">
      <div className="w-full bg-cover bg-center bg-no-repeat py-8 md:py-16 lg:py-24" style={{ backgroundImage: 'url("/background/2.png")' }}>
        {children}
      </div>
    </div>
  );
};
