"use client";

import { useState } from "react";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/select"; // Correct import for SelectContent

interface LeaderboardSelectProps {
  onProductSelect: (productId: number) => void; // Function to handle product selection
  productTryOuts: { id: number; name: string }[] | undefined; // Array of products with id and name
}

// The LeaderboardSelect component receives props from the parent
const LeaderboardSelect = ({ onProductSelect, productTryOuts }: LeaderboardSelectProps) => {
  const [selectedTryOut, setSelectedTryOut] = useState<string>("Silakan Pilih Try Out Terlebih Dahulu");
  const handleProductChange = (value: string) => {
    // Convert the value to a number before passing it to the parent
    onProductSelect(Number(value));

    if (value) {
      setSelectedTryOut(productTryOuts?.find((product) => product.id === Number(value))?.name || "Silakan Pilih Try Out Terlebih Dahulu");
    }
  };

  return (
    <div className="mb-4">
      {/* Select Product */}
      <Select onValueChange={handleProductChange}>
        <SelectTrigger className="w-1/2">
          {/* Set default value as placeholder */}
          <SelectValue placeholder={selectedTryOut} />
        </SelectTrigger>
        <SelectContent>
          {/* Placeholder item */}
          <SelectItem value="Silakan Pilih Try Out Terlebih Dahulu">Silakan pilih Try Out</SelectItem>
          {/* Loop through the products and create SelectItems */}
          {productTryOuts?.map((product) => (
            <SelectItem key={product.id} value={String(product.id)}>
              {product.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LeaderboardSelect;
