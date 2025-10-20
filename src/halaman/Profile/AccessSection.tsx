"use client";

import { ProductAccessTryOutResponse } from "@/model/productAccess.model";
import AccessProductTryOutCard from "./AccessProductTryOutCard";

interface AccessSectionCardViewProps {
  title: string;
  items: ProductAccessTryOutResponse[];
}

const AccessSectionCardView: React.FC<AccessSectionCardViewProps> = ({ title, items }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-start mb-4 border-b border-gray-300 pb-2">
        <h3 className="font-semibold text-base md:text-lg">{title}</h3>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">Kamu belum memiliki satupun akses</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <AccessProductTryOutCard key={item.id} access={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccessSectionCardView;
