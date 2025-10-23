"use client";

import { useState } from "react";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/select";

interface LeaderboardSelectProps {
  onProductSelect: (productId: number) => void;
  productTryOuts: { id: number; name: string }[] | undefined;
}

const LeaderboardSelect = ({ onProductSelect, productTryOuts }: LeaderboardSelectProps) => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleProductChange = (value: string) => {
    const productId = Number(value);
    setSelectedProductId(productId);
    onProductSelect(productId);
  };

  return (
    <div className="w-full lg:w-1/2">
      <Select value={selectedProductId ? String(selectedProductId) : "Silakan Pilih TryOut Terlebih Dahulu"} onValueChange={handleProductChange}>
        <SelectTrigger className="w-full border rounded-lg shadow-sm px-4 py-2   ring-[#ad0a1f] border-[#ad0a1f] transition text-gray-800 bg-white">
          <SelectValue placeholder="Silakan pilih TryOut" />
        </SelectTrigger>
        <SelectContent className="rounded-lg shadow-md border border-gray-200 bg-white">
          <SelectItem disabled value="Silakan Pilih TryOut Terlebih Dahulu" className="text-gray-400 cursor-default">
            Silakan pilih TryOut
          </SelectItem>
          {productTryOuts?.map((product) => (
            <SelectItem key={product.id} value={String(product.id)} className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm">
              {product.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LeaderboardSelect;
