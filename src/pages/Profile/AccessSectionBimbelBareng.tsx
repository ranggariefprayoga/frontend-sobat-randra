"use client";

import { BimbelBarengAccessResponse } from "@/model/productBimbelBarengAccess";
import { AccessProductBimbelBarengCard } from "./AccessBimbelBarengCard";

interface AccessSectionCardBimbelBarengViewProps {
  title: string;
  items: BimbelBarengAccessResponse[];
}

export const AccessSectionCardBimbelBarengView: React.FC<AccessSectionCardBimbelBarengViewProps> = ({ title, items }) => {
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
            <AccessProductBimbelBarengCard key={item.id} access={item} />
          ))}
        </div>
      )}
    </div>
  );
};
