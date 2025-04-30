import { ReactNode } from "react";

type LayoutBackgroundImageProps = {
  children: ReactNode;
};

export const LayoutBackgroundImage = ({ children }: LayoutBackgroundImageProps) => {
  return (
    <div className="mx-auto  text-white">
      <div className="w-full bg-cover bg-center bg-no-repeat py-8 md:py-14" style={{ backgroundImage: 'url("/background/1.png")' }}>
        {children}
      </div>
    </div>
  );
};
